import FieldType from './Types/FieldType';
import './FieldWrapper.css';
import Button from '../Button/Button';

export default function FieldWrapper({
  type = 'text',
  label = '',
  id,
  onChange,
  className = '',
  isDraggable,
  onDelete,
  children,
  ...rest
}) {
  return (
    <div className="field-wrapper">
      <label htmlFor={id}>{label}</label>
      <div className="field-input-container">
        {isDraggable && <div className="drag-handle">&#x283F;</div>}
        <FieldType
          type={type}
          id={id}
          className={`field-input ${className} `}
          onChange={onChange}
          {...rest}
        />
        {onDelete && (
          <Button
            text="X"
            className="field-wrapper-delete-button"
            onclick={onDelete}
          />
        )}
      </div>
      {children}
    </div>
  );
}
