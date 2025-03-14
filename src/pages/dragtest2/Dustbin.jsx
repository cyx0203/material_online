import { memo } from 'react';
import { useDrop } from 'react-dnd';
import { Image } from 'antd';
const style = {
  height: '5rem',
  width: '5rem',
  // marginRight: '1.5rem',
  // marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};
export const Dustbin = memo(function Dustbin({
  accept,
  lastDroppedItem,
  onDrop,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  // let backgroundColor = '#222';
  let backgroundColor = 'white';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
    // console.log(onDrop,lastDroppedItem)
  }
  // if(isOver) {}
  return (
    <div ref={drop} role="Dustbin" style={{ ...style, backgroundColor }}>
      {/* {isActive
            ? 'Release to drop'
            : `This dustbin accepts: ${accept.join(', ')}`} */}

      {/* {lastDroppedItem && (<p>Last dropped: {JSON.stringify(lastDroppedItem.name)}</p>)} */}
      {lastDroppedItem && <Image src={lastDroppedItem.name[0]}></Image>}
    </div>
  );
});
