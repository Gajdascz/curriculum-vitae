import Button from '../common/Button/Button';
import { useState } from 'react';
import './DragContainer.css';

export default function DragContainer({
  items,
  onClick,
  onDragDrop,
  onDelete,
  renderItem,
  itemSelectorClassName,
  containerContext
}) {
  const [dragData, setDragData] = useState({
    selectedContext: null,
    startIndex: null,
    startLocation: null,
    overIndex: -1,
    overLocation: null
  });

  const isValidTarget = (target) => {
    return (
      target &&
      dragData.selectedContext === target.dataset.containerContext &&
      (+dragData.startIndex !== +target.dataset.index ||
        dragData.startLocation !== target.dataset.location)
    );
  };

  const getClosest = (e) => {
    const closest = e.currentTarget.closest(
      `.${itemSelectorClassName}[data-container-context="${containerContext}"]`
    );
    return closest.dataset.containerContext === dragData.selectedContext
      ? closest
      : null;
  };

  const onDragStart = (e, itemId) => {
    e.stopPropagation();
    const { containerContext, location, index } = e.currentTarget.dataset;
    setDragData({
      selectedContext: containerContext,
      startIndex: index,
      startLocation: location,
      overIndex: index,
      overLocation: location,
      draggedItem: itemId
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const closest = getClosest(e);
    if (!closest || !isValidTarget(closest)) return;
    setDragData({
      ...dragData,
      overIndex: closest.dataset.index,
      overLocation: closest.dataset.location
    });
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragData({ ...dragData, overIndex: -1, overLocation: null });
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const closest = getClosest(e);
    if (isValidTarget(closest)) {
      onDragDrop({
        event: e,
        startIndex: dragData.startIndex,
        targetIndex: +closest.dataset.index,
        targetLocation: closest.dataset.location,
        draggedItem: dragData.draggedItem
      });
    }
    setDragData({
      selectedContext: null,
      startIndex: null,
      startLocation: null,
      overIndex: -1,
      overLocation: null,
      draggedItem: null
    });
  };

  const isOver = (index, location) =>
    containerContext === dragData.selectedContext &&
    +dragData.overIndex === +index &&
    (!location || dragData.overLocation === location);

  return (
    <div className="drag-container">
      {items.map((item, index) => {
        return (
          <div
            key={item.id}
            draggable={true}
            className={`${itemSelectorClassName} draggable-item ${isOver(index, item.location?.id) ? ` drag-over` : ``}`}
            onDragStart={(e) => onDragStart(e, item.id)}
            onDragOver={(e) => onDragOver(e)}
            onDragLeave={(e) => onDragLeave(e)}
            onDrop={(e) => onDrop(e, item)}
            data-container-context={containerContext}
            data-index={index}
            data-location={item.location?.id ?? 'default'}
          >
            <div className="render-item-wrapper">
              <div className="drag-handle">&#x283F;</div>
              <div className="render-item" onClick={() => onClick(item.id)}>
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
          </div>
        );
      })}
    </div>
  );
}
