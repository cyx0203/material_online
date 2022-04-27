import React, { useEffect, useState } from 'react';
import { useAccess, Access, history, useParams } from 'umi';
import {
  Result,
  Button,
  Card,
  Col,
  Row,
  Timeline,
  Image as AntImage,
  Divider,
  Space,
  InputNumber,
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { DragSource } from 'react-dnd';
import { ReqPost, ReqGet } from 'GGService';
import global from '@/core/global';
import css from './index.less';

const navigateTest = (props: any) => {
  useEffect(() => {
    getPic();
    return () => {};
  }, []);

  const imgurl =
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

  const getPic = () => {
    ReqGet(
      '/resource_sse_icon_autonav',
      (data: any) => {
        console.log(data);
        setPic1(data.data.lv1);
        setPic2(data.data.lv2);
      },
      (err: any) => {
        console.log(err);
      },
    );
  };

  // const res_url = 'https://wx.ggzzrj.cn/mf'; // 地址
  const res_url = global.appInfor.res_url; // 地址
  const [pic1, setPic1] = useState([]);
  const [pic2, setPic2] = useState([]);

  const [value, setValue] = useState<number>(2);
  var numArr: any = [1, 2];

  return (
    <div className={css.main}>
      <div>
        {numArr.map((item, index) => {
          return (
            <Space>
              <img id="c" width={100} src={imgurl}></img>
            </Space>
          );
        })}
      </div>
      <br />
      <br />
      <Space>
        <InputNumber
          width={200}
          min={2}
          max={10}
          value={value}
          onChange={setValue}
        />
        <Button
          type="primary"
          onClick={() => {
            numArr = new Array(value);
          }}
        >
          确定
        </Button>
      </Space>
      <Divider>分割线</Divider>
      <div>
        {pic1.map((item, key) => {
          return <AntImage src={res_url + item.url}></AntImage>;
        })}
      </div>
      <div>
        {pic2.map((item, key) => {
          return <AntImage src={res_url + item.url}></AntImage>;
        })}
      </div>
    </div>
  );
};

export default navigateTest;
