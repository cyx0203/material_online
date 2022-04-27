import React, { useEffect } from 'react';
import { useAccess, Access, history, useParams } from 'umi';
import { Result, Button, Card, Col, Row, Timeline } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import css from './index.less';
import App from '..';
import { useDrag } from 'react-dnd';

const dragtest = (props: any) => {
  useEffect(() => {
    return () => {};
  });

  return (
    <div className={css.main}>
      <App />
    </div>
  );
};

export default dragtest;
