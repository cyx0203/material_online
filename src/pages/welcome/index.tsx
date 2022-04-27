import React, { useEffect } from 'react';
import { useAccess, Access, history, useParams } from 'umi';
import { Result, Button, Card, Col, Row, Timeline } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import css from './index.less';
// import { ReqPost, ReqGet } from 'GGService';

const Welcome = (props: any) => {
  useEffect(() => {
    return () => {};
  });

  return (
    <div className={css.main}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="自助更新" bordered={true}>
            <Timeline>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="移动端更新" bordered={true}>
            <Timeline>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>

              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" bordered={true}>
            <Timeline>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
