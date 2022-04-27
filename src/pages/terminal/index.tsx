import React, { useEffect, useState } from 'react';
import { useAccess, Access, history, useParams } from 'umi';
import {
  Result,
  Button,
  Card,
  Col,
  Row,
  Table,
  message,
  Tabs,
  Divider,
} from 'antd';
import {
  SmileOutlined,
  DownloadOutlined,
  CopyOutlined,
  AppleOutlined,
  AndroidOutlined,
} from '@ant-design/icons';
import copy from 'copy-to-clipboard'; // 复制插件
import css from './index.less';
import { ReqPost, ReqGet } from 'GGService';
import global from '@/core/global';

const Terminal = (props: any) => {
  useEffect(() => {
    console.log('g', global.appInfor.sse_icon_unified);
    ReqGet(
      '/resource_sse_icon_unified',
      // {
      // },
      (Rdata: any) => {
        console.log('Rdata:', Rdata);
        let temp = Rdata.data;
        let tempList = [];
        setTotalData(temp);
        for (let i = 0; i < temp.Types.length; i++) {
          temp.Types[i].key = i;
          tempList.push([temp.Types[i].en, temp[temp.Types[i].en]]);
        }
        setData(temp.Types);

        console.log(tempList);
        setList(tempList);
      },
      (err: any) => {},
    );
    return () => {};
  }, []);

  const [dataList, setList] = useState([]);

  const [totalData, setTotalData] = useState([]);
  const [data, setData] = useState([]);
  const [expendData, setExpendData] = useState([]);

  const res_url = global.appInfor.res_url; // 地址
  const downLoadUrl = '/' + global.appInfor.sse_icon_unified; // 地址

  const { TabPane } = Tabs; // tabs标签

  const [tab, setTab] = useState('1');

  const columns = [
    { title: '类型', dataIndex: 'cn', key: 'cn' },
    { title: '英文标识', dataIndex: 'en', key: 'en' },
    { title: '中文标识', dataIndex: 'explain', key: 'explain' },
  ];

  const expandedRowRender = (record, index, indent, expanded) => {
    //拓展表格
    const columns = [
      {
        title: '功能点',
        dataIndex: 'cn',
        key: 'cn',
        align: 'center',
        width: 150,
      },
      {
        title: '图标',
        dataIndex: 'file',
        key: 'file',
        align: 'center',
        width: 300,
        render: (text, records, i) =>
          totalData[record.en][i].file.split('|').map((f, j) => {
            //碰到|分割的需要遍历
            return (
              <img
                className={css.iconImg}
                src={res_url + '/icon/SSE-UNIFIED/' + f + '.svg'}
              ></img>
            );
          }),
      },
      {
        title: '调用名',
        dataIndex: 'file',
        key: 'file',
        align: 'center',
        width: 300,
        render: (text, records, i) => (
          <div>
            {totalData[record.en][i].file}&emsp;
            <CopyOutlined
              onClick={() => {
                copy(totalData[record.en][i].file);
                message.success('复制成功 !');
              }}
            />
          </div>
        ),
      },
      {
        title: '命名',
        dataIndex: 'explain',
        key: 'explain',
        align: 'center',
        width: 200,
      },
    ];
    const columns2 = [];
    const data = totalData[record.en]; // 表格数据来源

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const tabChange = (key: any) => {
    setTab(key);
  };

  const downLoad = () => {
    window.open(res_url + downLoadUrl);
  };

  return (
    <div>
      <div>
        <Tabs defaultActiveKey="1" onChange={(key) => tabChange(key)}>
          <TabPane
            tab={
              <span>
                <AppleOutlined />
                统一ICON
              </span>
            }
            key="1"
          >
            <div>
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                onClick={downLoad}
              >
                下载资源包
              </Button>
              <br />
              <br />
              <Table
                className={css.table}
                columns={columns}
                // expandable={{ expandedRowRender }}
                dataSource={data}
                pagination={false}
                // showHeader={false}
                defaultExpandAllRows
                expandedRowRender={expandedRowRender}
              />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <AndroidOutlined />
                Tab 2
              </span>
            }
            key="2"
          >
            <div>
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                onClick={downLoad}
              >
                下载资源包
              </Button>
              <br />
              <br />
              <div>
                {dataList.map((item, index) => {
                  return (
                    <div className={css.container}>
                      <Row style={{ margin: '0px 0 0 10px' }}>{item[0]}</Row>
                      <Divider></Divider>
                      <div className={css.iconContainer}>
                        {item[1].map((i, k) => {
                          return (
                            <div
                            // className={css.iconMap}
                            >
                              <Row>
                                {i.file.split('|').map((f, j) => {
                                  //碰到|分割的需要遍历
                                  return (
                                    <div className={css.iconMap}>
                                      <div className={css.Img}>
                                        <Row className={css.imgHover}>
                                          <img
                                            onClick={() => {
                                              copy(f);
                                              message.success('复制成功 !');
                                            }}
                                            className={css.iconImg2}
                                            src={
                                              res_url +
                                              '/icon/SSE-UNIFIED/' +
                                              f +
                                              '.svg'
                                            }
                                          ></img>
                                        </Row>
                                        <Row className={css.fileName}>{f}</Row>
                                      </div>
                                      <Row
                                        className={css.cn}
                                        style={{
                                        }}
                                      >
                                        {i.cn}
                                      </Row>
                                    </div>
                                  );
                                })}
                              </Row>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Terminal;
