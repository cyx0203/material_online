import React, { useEffect, useState, useRef } from 'react';
var _ = require('lodash');
import {
  Table,
  Dropdown,
  Button,
  Menu,
  Input,
  Space,
  message,
  Spin,
} from 'antd';
import {
  DownOutlined,
  LikeOutlined,
  DownloadOutlined,
  LikeFilled,
} from '@ant-design/icons';
import css from './index.less';
import { ReqPost, ReqGet } from 'GGService';
import global from '@/core/global';

export default function index() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    ReqPost(
      '/resource_voice',
      {
        type: 'voice',
        platform: 'sse',
      },
      (data: any) => {
        setIsLoading(false);
        console.log(data.data);

        // 初始化所有语音资源
        setTotalData(data.data.reslist);
        let temp = data.data.reslist.COMMON;
        let initTypeName = '公用(COMMON)';
        // 为该类型的语音列表对象添加一个唯一的key属性
        for (let i = 0; i < temp.length; i++) {
          temp[i].key = i;
        }
        // 设置初始展示和选择（搜索）类型之后的语音信息列表
        setDefaultdata(temp);
        setDropdownShowValue(initTypeName);
        // 初始化语音类别选择菜单内容
        setTypeData(data.data.type);
      },
      (err: any) => {
        console.log(err);

        setIsLoading(false);
      },
    );
    return () => {};
  }, []);

  // 喜欢
  const like = () => {
    message.success('点赞成功!');
  };
  // 取消喜欢
  const cancellike = () => {
    message.success('取消点赞!');
  };
  // 存放所有语音资源
  const [totalData, setTotalData] = useState([]);
  // 初始化，当前表格展示的语音类型的语音列表数据
  const [defaultData, setDefaultdata] = useState([]);
  // 下拉菜单
  // 下拉菜单展示文字
  const [dropdownShowValue, setDropdownShowValue] = useState('');
  // 下拉菜单列表内容
  const [typeData, setTypeData] = useState([]);

  //   表格
  // 表格第一行表头

  var arr = new Array(10).fill(false);
  const [mp3, setMp3] = useState(arr);

  console.log(mp3);

  const columns = [
    // { title: '业务类型', dataIndex: 'group', key: 'group' },
    { title: '文字描述', dataIndex: 'text', key: 'text' },
    {
      title: '试听',
      // dataIndex: 'url',
      key: 'url',
      render: (text, records, i: any) => {
        return (
          <Space size="middle">
            <audio
              controls
              onPlay={() => {
                var audios = document.getElementsByTagName('audio');
                for (var i = audios.length - 1; i >= 0; i--) {
                  (function () {
                    var p = i;
                    audios[p].addEventListener('play', function () {
                      pauseAll(p);
                    });
                  })();
                }
                function pauseAll(index) {
                  for (var j = audios.length - 1; j >= 0; j--) {
                    if (j != index) audios[j].pause();
                    // audios[j].load();
                  }
                }
              }}
            >
              <source src={global.appInfor.res_url + text} />
            </audio>
          </Space>
        );
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (text, records, i) => {
        return (
          <Space size="middle" className={css.action}>
            <div className={css.like_count} title="点赞数">
              <LikeOutlined
                style={{ fontSize: '20px', color: '#85d3cc', display: 'none' }}
                onClick={like}
              />
              <LikeFilled
                style={{ fontSize: '20px', color: '#85d3cc', display: '' }}
                onClick={cancellike}
              />
              <span className={css.like_count_number}>
                {records.like_count}
              </span>
            </div>
            <div className={css.download_count} title="下载数">
              <DownloadOutlined
                style={{ fontSize: '20px', color: '#85d3cc' }}
              />
              <span className={css.like_download_number}>
                {records.download_count}
              </span>
            </div>
            <a className={css.download}>下载</a>
          </Space>
        );
      },
    },
  ];

  const expandedRowRender = (record, index, indent, expanded) => {
    // 拓展表格表头
    const columns = [
      {
        title: '说明',
        dataIndex: 'explain',
        key: 'explain',
        align: 'center',
        width: 100,
      },
      {
        title: '使用场景',
        dataIndex: 'scenario',
        key: 'scenario',
        align: 'center',
        width: 200,
      },
      {
        title: '日期',
        dataIndex: 'upload_date',
        key: 'upload_date',
        align: 'center',
        width: 300,
      },
      {
        title: '上传人',
        dataIndex: 'provider',
        key: 'provider',
        align: 'center',
        width: 200,
      },
    ];
    const data = [record];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  // 下拉菜单点击事件
  const handleMenuClick = (value) => {
    let menuText = '';
    let cnText = '';
    for (let i = 0; i < typeData.length; i++) {
      if (value.key === typeData[i].en) {
        cnText = typeData[i].cn;
      }
    }
    menuText = cnText + '(' + value.key + ')';
    setDropdownShowValue(menuText);
    // 下拉选择菜单接口获取的数据Object
    console.log(value);
    let typeKey = value.key;
    let temp = totalData[typeKey];

    // 为该类型的语音列表对象添加一个唯一的key属性
    for (let i = 0; i < temp.length; i++) {
      temp[i].key = i;
    }

    setDefaultdata(temp);
    // 重新加载audio标签url
    var audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) {
      audios[i].load();
    }
  };
  // 下拉菜单
  const menu = (
    <Menu onClick={handleMenuClick}>
      {typeData.map((item) => {
        return (
          <Menu.Item key={item.en}>{item.cn + '(' + item.en + ')'}</Menu.Item>
        );
      })}
    </Menu>
  );
  //   搜索框
  const onSearch = (value) => {
    // 搜索框输入的内容
    console.log(value);
    // 搜索成功后的新数组
    let afterSearchData: any = [];
    // 所有数据以数组对象的形式存储
    let allVoiceObject: any = [];
    // 如果搜索框不为空时才进行搜索
    if (value !== '') {
      // 查询数据为所有的语音数据
      // 将所有数据以数组的形式转存
      let arrvalue = Object.values(totalData);
      arrvalue.map((item) => {
        item.map((item2) => {
          // 转为数组对象的形式
          allVoiceObject.push(item2);
        });
      });
      // 为语音列表对象添加一个唯一的key属性
      for (let i = 0; i < allVoiceObject.length; i++) {
        allVoiceObject[i].key = i;
      }
      // 将text部分转存到新数组
      let arrnew = allVoiceObject.map((item, index) => {
        return Object.assign(
          {},
          {
            // 保存语音的文字描述属性
            // 根据语音的文字描述进行查询
            desc: item.text,
          },
        );
      });
      // 搜索过滤数据
      var newData = arrnew.filter((item) => {
        if (item.desc.indexOf(value) > -1) {
          //indexOf方法中如果xxx.indexOf("")返回值为0
          return item;
        }
        return newData;
      });
      // 遍历寻找搜索内容与text对应的Object
      for (let j = 0; j < newData.length; j++) {
        for (let i = 0; i < allVoiceObject.length; i++) {
          if (allVoiceObject[i].text === newData[j].desc) {
            afterSearchData.push(allVoiceObject[i]);
          }
        }
      }
      if (afterSearchData.length > 0) {
        // 将新数组反显
        setDefaultdata(afterSearchData);
      } else {
        // 没有检索到数据则显示数据为空
        setDefaultdata([]);
      }

      // 重新加载audio标签url
      var audios = document.getElementsByTagName('audio');
      for (let i = 0; i < audios.length; i++) {
        audios[i].load();
      }
      setDropdownShowValue('请选择类型');
    }
  };
  const { Search } = Input;
  return (
    <div className={css.main}>
      <div
        className={css.isLoading}
        style={{ display: isLoading ? '' : 'none' }}
      >
        <Spin tip="Loading..." />
      </div>
      <div className={css.header}>
        <div className={css.headerLeft}>
          <Dropdown overlay={menu}>
            <Button>
              {dropdownShowValue} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className={css.headerRight}>
          <Search
            placeholder="请输入文字描述"
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={onSearch}
          />
        </div>
      </div>
      {/* 主体表格部分 */}
      <Table
        className={css.table}
        columns={columns}
        dataSource={defaultData}
        pagination={false}
        defaultExpandAllRows
        expandedRowRender={expandedRowRender}
      />
    </div>
  );
}
