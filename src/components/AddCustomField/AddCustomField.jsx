import { useState } from 'react';

import Button from '../common/Button/Button';
import Input from '../common/Input/Input';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';

import { ATTS } from './AddCustomFieldConstants';
import './AddCustomField.css';
import SelectMenu from '../common/SelectMenu/SelectMenu';

export default function AddCustomField({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fieldInfo, setFieldInfo] = useState({
    type: '',
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
    onAdd({ ...fieldInfo });
    setFieldInfo({ type: '', label: '', value: '' });
  };

  return (
    <DropDownContainer
      containerHeaderText="Add Custom Field"
      isOpen={isOpen}
      toggle={() => setIsOpen(!isOpen)}
      addToggleToHeader={true}
    >
      <div className="add-custom-field-inputs-container">
        <SelectMenu
          label={ATTS.TYPE_SELECT_LABEL}
          id={ATTS.TYPE_SELECT_ID}
          options={ATTS.TYPE_SELECT_OPTIONS}
          handleChange={handleTypeChange}
        />
        <Input
          id="custom-field-label-input"
          label={ATTS.LABEL_INPUT_LABEL}
          handleChange={handleLabelChange}
          value={fieldInfo.label}
          placeholder={ATTS.LABEL_INPUT_PLACEHOLDER}
          labelProps={{ htmlFor: 'custom-field-label-input' }}
        />
        <Input
          id="custom-field-value-input"
          handleChange={handleValueChange}
          label="Value"
          value={fieldInfo.value}
          placeholder={ATTS.VALUE_INPUT_PLACEHOLDER}
          labelProps={{ htmlFor: 'custom-field-value-input' }}
        />
        <Button text="Add" name="add-custom-field" handleClick={handleSubmit} />
      </div>
    </DropDownContainer>
  );
}
