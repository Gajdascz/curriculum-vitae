import { useState } from 'react';
import Button from '../common/Button/Button';

import './DragContainer.css';

export default function DragContainer({
  items,
  onClick,
  onDrop,
  onDelete,
  renderItem
}) {
  const [dragStatus, setDragStatus] = useState({
    start: null,
    over: -1,
    startLocation: null
  });
  return (
    <div className="drag-container">
      {items.map((item, index) => {
        return (
          <div
            key={item.id}
            draggable={true}
            className={`draggable-item ${+dragStatus.over === +index ? ` drag-over` : ``}`}
            onDragStart={() => setDragStatus({ ...dragStatus, start: index })}
            onDragOver={(e) => {
              e.preventDefault();
              setDragStatus({
                ...dragStatus,
                over: e.target.closest('.draggable-item').dataset.index
              });
            }}
            onDragLeave={() => setDragStatus({ ...dragStatus, over: -1 })}
            onDrop={(e) => {
              const closest = e.target.closest('.draggable-item');
              if (
                (!closest.dataset.location ||
                  dragStatus.startLocation === closest.dataset.location) &&
                dragStatus.start === closest.dataset.index
              )
                return;
              onDrop({
                event: e,
                startIndex: dragStatus.start,
                targetIndex: closest.dataset.index,
                targetLocation: closest.dataset.location
              });
              setDragStatus({ start: null, over: -1 });
            }}
            data-index={index}
          >
            <div className="drag-handle">&#x283F;</div>
            <div
              className="render-item-wrapper"
              onClick={() => onClick(item.id)}
            >
              {renderItem(item, index)}
            </div>
            {onDelete && (
              <Button
                text="X"
                className="draggable-item-delete-button"
                addDefaultStyling={false}
                onClick={() => onDelete(item.id)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
