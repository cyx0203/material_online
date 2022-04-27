import { DropTarget } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};
const Dustbin = ({ canDrop, isOver, connectDropTarget, lastDroppedItem }) => {
  const isActive = canDrop && isOver;
  // const isActive = canDrop;
  let didDrop = connectDropTarget.didDrop;
  // let backgroundColor = '#222';
  let backgroundColor = 'gray';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
    console.log(lastDroppedItem);
  }
  return (
    <div
      ref={connectDropTarget}
      style={{ ...style, backgroundColor }}
      role="Dustbin"
    >
      {isActive ? 'Release to drop' : 'Drag a box here'}
      {lastDroppedItem && <Image src={lastDroppedItem.name}></Image>}
    </div>
  );
};
export default DropTarget(
  ItemTypes.BOX,
  {
    drop: (props, monitor, component) => ({
      name: 'Dustbin',
      result: monitor.didDrop(),
    }),
    // drop(props, monitor, component){
    //   if (monitor.didDrop()) {
    //     alert('c')
    //     console.log('cyx')
    //     return
    //   }
    // }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin);
