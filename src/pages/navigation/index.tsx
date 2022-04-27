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
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { DragSource } from 'react-dnd';
import { ReqPost, ReqGet } from 'GGService';
import global from '@/core/global';
import css from './index.less';

const Navigation = (props: any) => {
  useEffect(() => {

    // ReqGet(
    //   '/issue_query',
    //   (data: any) => {
    //     console.log(data.data);
    //   },
    //   (err: any) => {
    //     console.log(err);
    //   },
    // );


    return () => {};
  });

  const [Base64, setBase64]: any = useState();

  function getBase64Image(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    // var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  function imgfun() {
    let image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    let c = document.getElementById('c');
    console.log(c);
    image.src = c.getAttribute('src');
    image.onload = function () {
      let base64 = getBase64Image(image);
      console.log(base64);
      setBase64(base64);
      console.log(Base64);
    };
  }

  const generate = () => {
    imgfun();
    console.log(Base64);
    // 生成并下载图片
    var data = {};
    var element = document.createElement('a');
    var message = '';
    message += 'cyx' + '\n';
    element.setAttribute(
      'href',
      // 'data:text/plain;charset=utf-8,' + encodeURIComponent(imgurl),
      'data:image/png;base64,' + Base64,
    );
    element.setAttribute('download', 'cyx');
    // element.href = imgurl;
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generatePhote = () => {
    // var img = document.getElementById('testImg'); // 获取要下载的图片
    var url = imgurl; // 获取图片地址
    var a = document.createElement('a'); // 创建一个a节点插入的document
    var event = new MouseEvent('click'); // 模拟鼠标click点击事件
    a.download = '图片名字'; // 设置a节点的download属性值
    // a.href = url;                                 // 将图片的src赋值给a节点的href
    a.dispatchEvent(event);
  };

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

  const canvasPic = () => {
    // html2canvas(document.querySelector('div')).then(function(canvas) {
    //   document.body.appendChild(canvas);
    // })
  };

  // const res_url = 'https://wx.ggzzrj.cn/mf'; // 地址
  const res_url = global.appInfor.res_url; // 地址
  const [pic1, setPic1] = useState([]);
  const [pic2, setPic2] = useState([]);

  return (
    <div className={css.main}>
      <img id="c" width={100} src={imgurl}></img>
      <Button onClick={generate}>base64</Button>
      <Button onClick={getPic}>获取图片</Button>
      <Button onClick={canvasPic}>截图</Button>
      <Divider>分割线</Divider>
      <div>
        {pic1.map((item, key) => {
          return <AntImage src={res_url + item.url}></AntImage>;
        })}
      </div>
    </div>
  );
};

export default Navigation;
