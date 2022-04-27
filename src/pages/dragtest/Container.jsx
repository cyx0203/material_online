import Dustbin from './Dustbin';
import Box from './Box';
import { useEffect } from 'react';
import global from '@/core/global';
const rowStyle = { overflow: 'hidden', clear: 'both' };
const res_url = 'https://wx.ggzzrj.cn/mf'; // 地址
const url0 = '/icon/SSE-AUTONAV/lv1/nav_lv1_001.png';

const getPic = () => {
  ReqGet(
    '/resource_sse_icon_autonav',
    (data) => {
      console.log(data);
      setPic1(data.data.lv1);
      setPic2(data.data.lv2);
    },
    (err) => {
      console.log(err);
    },
  );
};

export const Container = () => (
  // {pic1.map((item, key) => {
  //   return <AntImage src={res_url + item.url}></AntImage>;
  // })}
  <div>
    <div style={rowStyle}>
      <Dustbin />
    </div>
    <div style={rowStyle}>
      <Box name="Glass" />
      <Box name="Banana" />
      {/* <Box name="Paper" /> */}
      <Box name={res_url + url0} />
    </div>
  </div>
);
