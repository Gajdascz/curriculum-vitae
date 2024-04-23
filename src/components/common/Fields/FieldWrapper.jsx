import Button from '../Button/Button';
import { useState } from 'react';

import './FieldWrapper.css';

function Field({ data, fns, className, value } = {}) {
  switch (data.type) {
    case 'text-area':
      return (
        <textarea {...data} className={className} {...fns} value={value} />
      );
    case 'list':
      return (
        <textarea
          className={className}
          placeholder={`Enter each list item on a new line.\nItem 1\nItem 2\nItem 3`}
          {...fns}
          value={value}
        />
      );
    default:
      return <input {...data} {...fns} className={className} value={value} />;
  }
}
export default function FieldWrapper({
  fieldData,
  fieldFns,
  labelData,
  onDelete
}) {
  const [fieldValue, setFieldValue] = useState(fieldData.value);
  return (
    <div className="field-wrapper">
      <label
        htmlFor={labelData.id}
        {...(labelData.hide && {
          style: { display: 'none' }
        })}
      >
        {labelData.text}
      </label>
      <div className="field-input-container">
        <Field
          className={`field-input`}
          data={fieldData}
          value={fieldValue}
          fns={{
            onChange: (e) => setFieldValue(e.target.value),
            ...fieldFns
          }}
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
