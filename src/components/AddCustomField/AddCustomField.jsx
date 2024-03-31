import { useState } from 'react';

import Button from '../common/Button';
import Select from '../common/Select';
import Input from '../common/Input';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';

import { CSS } from './AddCustomFieldConstants';
import './AddCustomField.css';

export default function AddCustomField({ onAdd }) {
  const [fieldInfo, setFieldInfo] = useState({
    type: '',
    label: '',
    value: ''
  });

  const handleTypeChange = (e) =>
    setFieldInfo({ ...fieldInfo, type: e.target.value });
  const handleLabelChange = (e) =>
    setFieldInfo({ ...fieldInfo, label: e.target.value });
  const handleValueChange = (e) =>
    setFieldInfo({ ...fieldInfo, value: e.target.value });

  const handleSubmit = () => {
    onAdd({ ...fieldInfo });
    setFieldInfo({ type: '', label: '', value: '' });
  };

  return (
    <DropDownContainer containerHeaderText="Add Custom Field">
      <Select
        label={CSS.TYPE_SELECT_LABEL}
        id={CSS.TYPE_SELECT_ID}
        options={CSS.TYPE_SELECT_OPTIONS}
        onChange={handleTypeChange}
      />
      <Input
        id="custom-field-label-input"
        label={CSS.LABEL_INPUT_LABEL}
        handleChange={handleLabelChange}
        value={fieldInfo.label}
        placeholder={CSS.LABEL_INPUT_PLACEHOLDER}
        labelProps={{ htmlFor: 'custom-field-label-input' }}
      />
      <Input
        id="custom-field-value-input"
        handleChange={handleValueChange}
        label="Value"
        value={fieldInfo.value}
        placeholder={CSS.VALUE_INPUT_PLACEHOLDER}
        labelProps={{ htmlFor: 'custom-field-value-input' }}
      />
      <Button text="Add" name="add-custom-field" handleClick={handleSubmit} />
    </DropDownContainer>
  );
}
