import React, { useEffect, useState } from 'react';
import { useAccess, useRequest, history, useModel } from 'umi';
import { Form, Input, Button, message, Checkbox } from 'antd';
import css from './index.less';
import { Md5 } from 'ts-md5/dist/md5';
import axios from 'axios';
import global from 'GGGLOBAL';
import { ReqPost, ReqGet } from 'GGService';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = (props: any) => {
  const [form] = Form.useForm();
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
  const access = useAccess(); // access 的成员: canReadFoo, canUpdateFoo, canDeleteFoo
  const [state, setState] = useState({
    loginBtnLoad: false,
  });

  const [autoLogin, setAutoLogin] = useState(false);

  useEffect(() => {
    global.userInfor = {};
    global.appInfor = {};
    const autoLoginFlg = localStorage.getItem('GGMO.autoLogin');
    if (autoLoginFlg === 'Y') {
      setAutoLogin(true);
    }

    return () => {};
  }, []);

  const userLogin = (data: any, sCallBack: Function) => {
    ReqPost(
      '/user_loginAndInfor',
      {
        account: data.userId,
        password: data.userPwd,
      },
      (data: any) => {
        const resLoginResult = data.data.login_result;
        if (resLoginResult) {
          global.userInfor = {
            userId: data.userId,
            userPwd: data.userPwd,
            userRole: 'R',
            userName: data.data.infor.name,
            infor: data.data.infor,
          };
          console.log(global.userInfor);

          if (sCallBack) sCallBack(data);
        } else {
          message.error(`登录失败`);
        }
      },
      (err: any) => {
        // form.resetFields();
        message.error(`登录失败 ${err}`);
        setState({
          loginBtnLoad: false,
        });
      },
    );
    return;
  };

  const userQuery = (data: any) => {
    console.log(data);

    ReqGet(
      '/system_infor',
      (data: any) => {
        const appCfgList = data.data.config;
        let appConfig: any = {};
        for (let i = 0; i < appCfgList.length; i++) {
          const key = appCfgList[i].cfg_key;
          const value = appCfgList[i].cfg_value;
          appConfig[key] = value;
        }
        console.log('###');
        console.log(appConfig);
        global.appInfor = appConfig;
        //刷新菜单、权限配置等内容
        refresh();
        history.push({
          pathname: '/welcome',
          query: {
            // userId: data.userId,
            // userPwd: data.userPwd,
            // userRole: resRole
          },
        });
      },
      (err: any) => {
        message.error(`登录失败 ${err}`);
        setState({
          loginBtnLoad: false,
        });
      },
    );

    return;

    axios
      .post('/Sys/selectUsers', {
        userId: data.userId,
      })
      .then((res: any) => {
        const resCode = res.data.code;
        const resMsg = res.data.msg;
        const resUserName = res.data.listInfo[0].userName;
        console.log('!!!!');
        console.log(res.data);
        if (resCode === '00') {
          // message.success(`${resMsg}`);
          global.userInfor.userName = resUserName;
          // console.log(global.userInfor);
          setState({
            loginBtnLoad: false,
          });
          //刷新菜单、权限配置等内容
          refresh();
          history.push({
            pathname: '/welcome',
            query: {
              // userId: data.userId,
              // userPwd: data.userPwd,
              // userRole: resRole
            },
          });
        } else {
          message.error(`${resMsg}`);
          setState({
            loginBtnLoad: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(`${error}`);
        setState({
          loginBtnLoad: false,
        });
      });
  };

  //登录操作
  const onFinish = (data: any) => {
    setState({
      loginBtnLoad: true,
    });
    message.destroy();
    if (autoLogin) {
      localStorage.setItem('GGMO.userId', `${data.userId}`);
      localStorage.setItem('GGMO.userPwd', `${data.userPwd}`);
      localStorage.setItem('GGMO.autoLogin', 'Y');
    } else {
      localStorage.setItem('GGMO.userId', '');
      localStorage.setItem('GGMO.userPwd', '');
      localStorage.setItem('GGMO.autoLogin', '');
    }

    userLogin(data, userQuery);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const chgAutoLogin = (e: any) => {
    let flag = e.target.checked;
    setAutoLogin(flag);
  };

  return (
    <div className={css.main}>
      <div className={css.title}>
        {/* @ts-ignore */}
        <div className={css.maintitle}>{MAIN_TITLE}</div>
        {/* @ts-ignore */}
        <span className={css.version}>{VERSION}</span>
      </div>
      <div className={css.slogan}>让每一个轮子都产生价值</div>
      <div className={css.loginBlock}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 32 }}
          initialValues={{
            userId: `${
              localStorage.getItem('GGMO.userId')
                ? localStorage.getItem('GGMO.userId')
                : ''
            }`,
            userPwd: `${
              localStorage.getItem('GGMO.userPwd')
                ? localStorage.getItem('GGMO.userPwd')
                : ''
            }`,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label=""
            name="userId"
            style={{ width: 300 }}
            rules={[{ required: true, message: '请输入您的用户名!' }]}
          >
            <Input
              className={css.input}
              size="large"
              placeholder="用户名"
              prefix={<UserOutlined className={css.icon} />}
            />
          </Form.Item>

          <Form.Item
            label=""
            name="userPwd"
            rules={[{ required: true, message: '请输入您的登录密码!' }]}
          >
            <Input.Password
              className={css.input}
              size="large"
              placeholder="密码"
              prefix={<LockOutlined className={css.icon} />}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 0, span: 32 }}
            label=""
            name="userPwd"
            rules={[{ required: false, message: '' }]}
          >
            <Checkbox
              checked={autoLogin}
              // disabled={this.state.disabled}
              onChange={(e: any) => {
                chgAutoLogin(e);
              }}
            >
              {'自动登录'}
            </Checkbox>
          </Form.Item>
          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
            <Button
              loading={state.loginBtnLoad}
              type="primary"
              htmlType="submit"
              size="large"
              className={css.loginBtn}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
