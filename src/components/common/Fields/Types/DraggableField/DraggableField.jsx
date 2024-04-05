import Button from '../../../Button/Button';

export default function DraggableField({ Field }) {
  return (
    <div className="draggable-field">
      <div className="drag-handle">|||</div>
      <Field />;
      <Button className="delete-field-button" onclick={onclick}></Button>
    </div>
  );
}
