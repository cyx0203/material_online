import React, { useEffect } from 'react';
import { useAccess, Access, history, useParams } from 'umi';
import { Result, Button, Card, Col, Row } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const Welcome = (props: any) => {
  useEffect(() => {
    return () => {};
  });

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Card title" bordered={true}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
