import Button from '../Button/Button';
import { useState } from 'react';

import './FieldWrapper.css';

function Field({ type, className, ...rest } = {}) {
  switch (type) {
    case 'text-area':
      return <textarea {...rest} className={className} />;
    default:
      return <input type={type} {...rest} className={className} />;
  }
}
export default function FieldWrapper({
  type = 'text',
  label = '',
  hideLabel = false,
  id,
  onDelete,
  onBlur,
  value = '',
  ...rest
}) {
  const [fieldValue, setFieldValue] = useState(value);
  return (
    <div className="field-wrapper">
      <label
        htmlFor={id}
        {...((hideLabel || type === 'visual') && {
          style: { display: 'none' }
        })}
      >
        {label}
      </label>
      <div className="field-input-container">
        <Field
          type={type}
          id={id}
          className={`field-input`}
          onBlur={(e) => onBlur(e.target.value)}
          onChange={(e) => setFieldValue(e.target.value)}
          value={fieldValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.blur();
          }}
          {...rest}
        />
        {onDelete && (
          <Button
            addDefaultStyling={false}
            text="X"
            className="field-wrapper-delete-button"
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  );
}
