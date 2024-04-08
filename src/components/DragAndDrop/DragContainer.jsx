import Button from '../common/Button/Button';
import { useDragAndDropContext } from './DragAndDropContext';
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
  const { dragStatus, setDragStatus } = useDragAndDropContext();

  const isValidTarget = (target) => {
    return (
      target &&
      dragStatus.selectedContext === target.dataset.containerContext &&
      (+dragStatus.startIndex !== +target.dataset.index ||
        dragStatus.startLocation !== target.dataset.location)
    );
  };

  const getClosest = (e) => {
    const closest = e.currentTarget.closest(
      `.${itemSelectorClassName}[data-container-context="${containerContext}"]`
    );
    return closest.dataset.containerContext === dragStatus.selectedContext
      ? closest
      : null;
  };

  const onDragStart = (e) => {
    e.stopPropagation();
    const { containerContext, location, index } = e.currentTarget.dataset;
    setDragStatus({
      selectedContext: containerContext,
      startIndex: index,
      startLocation: location,
      overIndex: index,
      overLocation: location
    });
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const closest = getClosest(e);
    if (!closest || !isValidTarget(closest)) return;
    setDragStatus({
      ...dragStatus,
      overIndex: closest.dataset.index,
      overLocation: closest.dataset.location
    });
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragStatus({ ...dragStatus, overIndex: -1, overLocation: null });
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const closest = getClosest(e);
    if (isValidTarget(closest)) {
      onDragDrop({
        event: e,
        startIndex: dragStatus.startIndex,
        targetIndex: +closest.dataset.index,
        targetLocation: closest.dataset.location
      });
    }
    setDragStatus({
      selectedContext: null,
      startIndex: null,
      startLocation: null,
      overIndex: -1,
      overLocation: null
    });
  };

  const isOver = (index, location) =>
    containerContext === dragStatus.selectedContext &&
    +dragStatus.overIndex === +index &&
    (!location || dragStatus.overLocation === location);

  return (
    <div className="drag-container">
      {items.map((item, index) => {
        return (
          <div
            key={item.id}
            draggable={true}
            className={`${itemSelectorClassName} draggable-item ${isOver(index, item.location?.id) ? ` drag-over` : ``}`}
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e)}
            onDragLeave={(e) => onDragLeave(e)}
            onDrop={(e) => onDrop(e)}
            data-container-context={containerContext}
            data-index={index}
            data-location={item.location?.id ?? 'default'}
          >
            <div
              className="render-item-wrapper"
              onClick={() => onClick(item.id)}
            >
              <div className="drag-handle">&#x283F;</div>
              {renderItem(item, index)}
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
