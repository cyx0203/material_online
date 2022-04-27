import { ItemTypes } from './ItemTypes';
import { DragSource } from 'react-dnd';
import { Image } from 'antd';
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const Box = ({ name, isDragging, connectDragSource }) => {
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      ref={connectDragSource}
      role={'Box'}
      data-testid={`box-${name}`}
      style={{ ...style, opacity }}
    >
      {/* {name} */}
      <Image src={name}></Image>
    </div>
  );
};
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: (props) => {
      return { name: props.name };
    },
    endDrag(props, monitor) {
      // monitor查询当前拖动状态和参数
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`);
        // document.createElement
      }
    },
  },
  (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    };
  },
)(Box);
