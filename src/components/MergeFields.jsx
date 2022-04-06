import { useDrag } from 'react-dnd';

const styleMergeField = {
  width: '200px',
  border: '3px dashed gray',
  textAlign: 'center',
  backgroundColor: 'lightGreen',
  padding: '10px',
  cursor: 'move',
};

export const MergeFields = ({ name, pasteField }) => {
   
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "BOX",
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`);
               
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const opacity = isDragging ? 0.4 : 1;
    return (
        <div ref={drag} role="Box" style={{ ...styleMergeField, opacity }} data-testid={`box-${name}`}>
		  	{name}
        </div>);
};
