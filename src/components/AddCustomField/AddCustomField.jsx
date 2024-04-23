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
          options={['text', 'text-area', 'list']}
          onChange={handleTypeChange}
        />
        <FieldWrapper
          fieldData={{
            type: 'text',
            id: 'custom-field-label-input'
          }}
          labelData={{
            text: ATTS.LABEL_INPUT_LABEL
          }}
          fieldFns={{ onBlur: (e) => handleLabelChange(e.target.value) }}
        />
        <FieldWrapper
          fieldData={{
            id: 'custom-field-value-input',
            type: fieldInfo.type
          }}
          labelData={{
            text: 'Value'
          }}
          fieldFns={{
            onBlur: (e) => handleValueChange(e.target.value)
          }}
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
