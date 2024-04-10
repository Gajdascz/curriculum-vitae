import { useState } from 'react';

import Button from '../common/Button/Button';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';

import { ATTS } from './AddCustomFieldConstants';

import SelectMenu from '../common/Fields/Types/SelectMenu/SelectMenu';
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

  const handleLabelChange = (value) =>
    setFieldInfo({ ...fieldInfo, label: value });
  const handleValueChange = (value) => setFieldInfo({ ...fieldInfo, value });

  const handleSubmit = () => {
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
        <SelectMenu
          type="select"
          label={ATTS.TYPE_SELECT_LABEL}
          id={ATTS.TYPE_SELECT_ID}
          options={ATTS.TYPE_SELECT_OPTIONS}
          onChange={handleTypeChange}
        />
        <FieldWrapper
          id="custom-field-label-input"
          label={ATTS.LABEL_INPUT_LABEL}
          onBlur={handleLabelChange}
        />
        <FieldWrapper
          id="custom-field-value-input"
          type={fieldInfo.type}
          onBlur={handleValueChange}
          label="Value"
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
