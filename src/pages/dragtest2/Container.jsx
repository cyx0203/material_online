import { useState, useCallback, memo, useEffect } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import {
  Image as antImg,
  Input,
  Row,
  Col,
  Select,
  Space,
  Divider,
  Tabs,
  Spin,
  Alert,
  Result,
  Button,
} from 'antd';
import html2canvas from 'html2canvas';
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import { ItemTypes } from './ItemTypes';
import update from 'immutability-helper';
import arrow from '../../../public/assets/icon/autonav/arrow.png';
// import { setConstantValue } from 'typescript';
import { ReqPost, ReqGet } from 'GGService';
export const Container = memo(function Container() {
  useEffect(() => {
    getPic(1);
    return () => {};
  }, []);

  const [res, setRes] = useState(true); // 控制result结果组件
  const [loading, setLoading] = useState(false); // 控制加载组件

  const initial = (number) => {
    getPic(number);
    // initialPic(number);
  };

  const getPic = (number) => {
    setLoading(true);
    ReqGet(
      '/resource_sse_icon_autonav',
      (data) => {
        console.log(data);
        setPic1(data.data.lv1);
        setPic2(data.data.lv2);
        if (number === 1) initialPic(1, data.data.lv1);
        else initialPic(2, data.data.lv2);
        setLoading(false);
        setRes(true);
      },
      (err) => {
        console.log(err);
        setLoading(false);
        setRes(false);
      },
    );
  };
  const [pic1, setPic1] = useState([]);
  const [pic2, setPic2] = useState([]);

  const [showTxt, setTxt] = useState(false); // 控制文本显示
  const [describe, setDescribe] = useState([]);
  const [span, setSpan] = useState(6);

  const res_url = 'https://wx.ggzzrj.cn/mf'; // 地址
  const url0 = '/icon/SSE-AUTONAV/lv1/nav_lv1_001.png';
  const url1 = '/icon/SSE-AUTONAV/lv1/nav_lv1_002.png';

  const { Option } = Select;

  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.TITLE], lastDroppedItem: null },
    { accepts: [ItemTypes.CONTENT], lastDroppedItem: null },
    {
      accepts: [ItemTypes.CONTENT, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes.CONTENT, NativeTypes.FILE], lastDroppedItem: null },
  ]);
  const [boxes, setBox] = useState([
    // { name: 'Bottle', type: ItemTypes.GLASS },
    // { name: 'Banana', type: ItemTypes.FOOD },
    // { name: res_url + url1, type: ItemTypes.FOOD },
    // { name: res_url + url0, type: ItemTypes.PAPER },
  ]);

  const initialPic = (key, data) => {
    let temp = [];
    if (key === 1) {
      {
        data.map((item, key) => {
          temp.push({
            name: [res_url + item.url, item.explain],
            type: ItemTypes.TITLE,
            des: item.explain,
          });
        });
      }
    } else {
      data.map((item, key) => {
        temp.push({
          name: [res_url + item.url, item.explain],
          type: ItemTypes.CONTENT,
          des: item.explain,
        });
      });
    }

    setBox(temp);
    // setLoading(false);
  };

  // let temp = [];
  // {
  //   pic1.map((item, key) => {
  //     temp.push({
  //       name: [res_url + item.url, item.explain],
  //       type: ItemTypes.TITLE,
  //       des: item.explain,
  //     });
  //     // temp.push({name: res_url + url0, type: ItemTypes.PAPER})
  //   });
  // }
  // boxes = temp;
  // {
  //   pic2.map((item, key) => {
  //     temp.push({
  //       name: [res_url + item.url, item.explain],
  //       type: ItemTypes.CONTENT,
  //       des: item.explain,
  //     });
  //   });
  // }
  // boxes = temp;

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }
  const handleDrop = useCallback(
    (index, item) => {
      // console.log(index,item.name[1])
      let temp = [...describe];
      temp[index] = item.name[1];
      setDescribe(temp);

      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      );
    },
    [droppedBoxNames, dustbins],
  );

  const JTclick = () => {
    setTxt(false);
    const ops = {
      // 解决图片跨域
      useCORS: true,
      allowTaint: true,
    };

    document.getElementById('a').width = 1030;
    document.getElementById('a').height = 120;
    const a = document.getElementById('a');
    a.style.width = 1030;
    a.style.height = 120;
    // const a = document.getElementsByClassName('c')[0];
    html2canvas(a, ops).then((canvas) => {
      const imgUrl = canvas.toDataURL();

      //设置截图大小
      canvas.style.width = 1030;
      canvas.style.height = 120;

      iimg = imgUrl;

      var element = document.createElement('a');

      element.setAttribute('crossOrigin', 'anonymous');
      element.setAttribute('href', `${iimg}`);
      element.setAttribute('download', 'cyx');
      // element.href = imgurl;
      //   element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  };

  const [Base64, setBase64] = useState();

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

  function imgfun(g) {
    let image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = g;
    console.log(image.src);
    image.onload = function () {
      let base64 = getBase64Image(image);
      console.log(base64);
      setBase64(base64);
      console.log(Base64);
    };
  }

  const generate = () => {
    // imgfun();
    click2();
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

  function click2() {
    const a = document.getElementById('b');
    html2canvas(a).then((canvas) => {
      const imgUrl = canvas.toDataURL();
      imgfun(imgUrl);
    });
    // console.log(iimg)
  }

  function HTML2Click() {
    const ops = {
      useCORS: true,
      allowTaint: true,
    };

    html2canvas(document.querySelector('#a'), ops).then(function (canvas) {
      document.body.appendChild(canvas);
    });
  }

  var iimg = '';

  const handleChange = (value) => {
    let temp = [];
    temp.push({ accepts: [ItemTypes.TITLE], lastDroppedItem: null });
    for (let i = 1; i < value; i++) {
      temp.push({ accepts: [ItemTypes.CONTENT], lastDroppedItem: null });
    }
    setDustbins(temp);
    setDescribe([]);
    let s = 24 / value;
    s = Math.floor(s);
    console.log(s);
    setSpan(s);
  };

  const getSpan = (index) => {
    if (index === dustbins.length - 1) {
      if (span === 8) return 6;
      else if (span === 6) return 4;
      else return 2;
    }
    return span;
  };

  const { TabPane } = Tabs;

  const tabChange = (key) => {
    if (key === 'origin') initialPic(1, pic1);
    else initialPic(2, pic2);
  };

  return (
    <div id="b">
      <div
        id="a"
        style={{
          overflow: 'hidden',
          clear: 'both',
          width: '1030px',
          height: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box', //设置了该属性
          // backgroundColor:'#3232',
          // borderRadius:'10px'
        }}
      >
        <Row
          style={{
            display: 'flex',
            // justifyContent: 'space-between',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {dustbins.map(({ accepts, lastDroppedItem }, index) => (
            <Col
              span={getSpan(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Col
                span={12}
                style={{
                  display: 'grid',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // textAlign: 'center',
                  // marginRight: '0px',
                }}
              >
                <Row>
                  <Dustbin
                    accept={accepts}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={(item) => {
                      handleDrop(index, item);
                    }}
                    key={index}
                  />
                </Row>
                <Row
                  style={{
                    // display:describe[index]?'':'none',
                    justifyContent: 'center',
                  }}
                >
                  {/* {showTxt ? (
                    <Input
                      value={describe[index]}
                      onChange={(e) => {
                        let temp = [...describe];
                        temp[index] = e.target.value;
                        setDescribe(temp);
                      }}
                      style={{ width: '100px' }}
                      size="small"
                      placeholder="请输入描述"
                    />
                  ) : ( */}
                  <label
                    contentEditable={true}
                    // style={{margin:'-20px 0 0 27.5px'}}
                  >
                    {describe[index]}
                  </label>
                  {/* )
                  } */}
                </Row>
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // height: '80px',
                  // margin: '0 20px',
                  display: index != dustbins.length - 1 ? 'flex' : 'none',
                }}
              >
                <img src={arrow} />
              </Col>
            </Col>
          ))}
        </Row>
      </div>
      {/* <button onClick={generate}>跨域截图</button>
      <button onClick={HTML2Click}>截图</button> */}
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <Col style={{ color: '#36CFC9', width: 120 }}>请选择导航数量:</Col>
        <Col>
          <Select
            defaultValue="4"
            placeholder="请选择图标数量"
            style={{ width: 60 }}
            onChange={handleChange}
          >
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Col>
        {/* <button
        onClick={() => {
          setTxt(!showTxt);
        }}
      >
        {showTxt ? '完成编辑' : '编辑文本'}
      </button> */}
        <Col style={{ marginLeft: 5 }}>
          {!showTxt ? (
            <Button type="primary" onClick={JTclick}>
              生成导航图
            </Button>
          ) : (
            ''
          )}
        </Col>
      </Row>

      <Divider />

      <Tabs onChange={(key) => tabChange(key)}>
        <TabPane tab="起始图标" key="origin">
          <div
            className="c"
            id="c"
            style={{ overflow: 'hidden', clear: 'both' }}
          >
            {res === false ? (
              <Result
                status="warning"
                // title="网络错误"
                subTitle="抱歉，图片加载出现错误"
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      getPic(1);
                    }}
                  >
                    刷新
                  </Button>
                }
              />
            ) : loading === false ? (
              boxes.map(({ name, type }, index) => (
                <Box
                  name={name}
                  type={type}
                  isDropped={isDropped(name)}
                  key={index}
                />
              ))
            ) : (
              <Spin tip="Loading...">
                <Alert
                  message="正在加载图片资源"
                  description="请耐心等待"
                  type="info"
                />
              </Spin>
            )}
          </div>
        </TabPane>
        <TabPane tab="常用图标" key="normal">
          <div
            className="c"
            id="c"
            style={{ overflow: 'hidden', clear: 'both' }}
          >
            {res === false ? (
              <Result
                status="warning"
                // title="网络错误"
                subTitle="抱歉，图片加载出现错误"
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      getPic(2);
                    }}
                  >
                    刷新
                  </Button>
                }
              />
            ) : !loading ? (
              boxes.map(({ name, type }, index) => (
                <Box
                  name={name}
                  type={type}
                  isDropped={isDropped(name)}
                  key={index}
                  // des={des}
                />
              ))
            ) : (
              <Spin tip="Loading...">
                <Alert
                  message="正在加载图片资源"
                  description="请耐心等待"
                  type="info"
                />
              </Spin>
            )}
          </div>
        </TabPane>
      </Tabs>

      {/* <div className="c" id="c" style={{ overflow: 'hidden', clear: 'both' }}>
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
            // des={des}
          />
        ))}
      </div> */}
    </div>
  );
});
