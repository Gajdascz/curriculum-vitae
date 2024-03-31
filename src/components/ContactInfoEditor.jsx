import { useState } from 'react';

import Section from './Section';
import Input from './common/Input';
import AddCustomField from './AddCustomField/AddCustomField';

export default function ContactInfoEditor() {
  const [inputs, setInputs] = useState([
    { id: 'name-0', type: 'text', label: 'Name', value: '' },
    { id: 'email-1', type: 'email', label: 'Email', value: '' },
    { id: 'phone-2', type: 'tel', label: 'Phone', value: '' },
    { id: 'address-3', type: 'text', label: 'Address', value: '' }
  ]);

  const handleAddField = ({ type, label }) => {
    setInputs([
      ...inputs,
      {
        id: `${label.toLowerCase().replace(/\s+/g, '-')}-${inputs.length - 1}`,
        type,
        label,
        value: ''
      }
    ]);
  };

  const handleInputChange = (id, value) =>
    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, value } : input))
    );

  return (
    <Section name="contact-info-editor">
      {inputs.map((input) => {
        const { id, type, label, value } = input;
        return (
          <Input
            key={id}
            type={type}
            label={label}
            value={value}
            handleChange={(e) => handleInputChange(id, e.target.value)}
          />
        );
      })}
      <AddCustomField onAdd={handleAddField}></AddCustomField>
    </Section>
  );
}
