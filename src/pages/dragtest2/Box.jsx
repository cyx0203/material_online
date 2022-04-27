import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { Image } from 'antd';
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
  width: '4rem',
  height: '3rem',
};
export const Box = memo(function Box({ name, type, isDropped }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type],
  );
  return (
    <div ref={drag} role="Box" style={{ ...style, opacity }}>
      {/* {isDropped ? <s>{name}</s> : name} */}
      <Image src={name[0]}></Image>
    </div>
  );
});
