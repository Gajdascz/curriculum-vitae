import Button from '../../../Button/Button';

const DraggableField = (Field) => (
  <div className="draggable-field">
    <div className="drag-handle">&#x283F;</div>
    <Field />;
    <Button className="delete-field-button" onclick={onclick}></Button>
  </div>
);

export default function DraggableFieldsManager({ fields }) {
  return (
    <div className="orderable-container">
      {fields.map((field) => (
        <DraggableField Field={field} />
      ))}
    </div>
  );
}
