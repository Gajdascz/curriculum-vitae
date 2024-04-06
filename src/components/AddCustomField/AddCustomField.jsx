import { useState } from 'react';

import Button from '../common/Button/Button';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';

import { ATTS } from './AddCustomFieldConstants';
import FieldWrapper from '../common/Fields/FieldWrapper';

import './AddCustomField.css';

export default function AddCustomField({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldInfo, setFieldInfo] = useState({
    type: 'text',
    label: '',
    value: ''
  });

  const handleTypeChange = (newType) =>
    setFieldInfo({ ...fieldInfo, type: newType });

  const handleLabelChange = (e) =>
    setFieldInfo({ ...fieldInfo, label: e.target.value });
  const handleValueChange = (e) =>
    setFieldInfo({ ...fieldInfo, value: e.target.value });

  const handleSubmit = () => {
    console.log(fieldInfo);
    if (!fieldInfo.label || fieldInfo.label.trim().length <= 0) return;
    onAdd({ ...fieldInfo });
    setFieldInfo({ type: '', label: '', value: '' });
  };

  return (
    <DropDownContainer
      containerHeaderText="Add Field"
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
      addToggleToHeader={true}
    >
      <div className="add-custom-field-inputs-container">
        <FieldWrapper
          type="select"
          label={ATTS.TYPE_SELECT_LABEL}
          id={ATTS.TYPE_SELECT_ID}
          options={ATTS.TYPE_SELECT_OPTIONS}
          onChange={handleTypeChange}
        />
        <FieldWrapper
          id="custom-field-label-input"
          label={ATTS.LABEL_INPUT_LABEL}
          onChange={handleLabelChange}
          value={fieldInfo.label}
        />
        <FieldWrapper
          id="custom-field-value-input"
          type={fieldInfo.type}
          onChange={handleValueChange}
          label="Value"
          value={fieldInfo.value}
        />
        <Button
          text="Add"
          className="add-custom-field-button"
          onClick={handleSubmit}
        />
      </div>
    </DropDownContainer>
  );
}
