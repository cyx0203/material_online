import React, { useEffect } from 'react';
import { useAccess, Access, history, useParams } from 'umi';
import { Result, Button, Card, Col, Row } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const picture = (props: any) => {
  useEffect(() => {
    return () => {};
  });

  return (
    <div>
      <h1>这是图片界面</h1>
    </div>
  );
};

export default picture;
