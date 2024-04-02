import { useState } from 'react';
import Input from './common/Input/Input';
import AddCustomField from './AddCustomField/AddCustomField';
import DropDownContainer from './common/DropDownContainer/DropDownContainer';

export default function EditorSection({
  className,
  headerText = '',
  initialInputs = [],
  isOpen = false,
  toggle
}) {
  const [inputs, setInputs] = useState(initialInputs);
  const handleAddField = ({ type, label, value }) => {
    setInputs([
      ...inputs,
      {
        id: `${label.toLowerCase().replace(/\s+/g, '-')}-${inputs.length - 1}`,
        type,
        label: `${label.charAt(0).toUpperCase() + label.slice(1)}`,
        value
      }
    ]);
  };
  const handleInputChange = (id, value) =>
    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, value } : input))
    );

  return (
    <section className={`${className} editor-section`}>
      <DropDownContainer
        containerHeaderText={headerText}
        toggle={toggle}
        isOpen={isOpen}
        addToggleToHeader={true}
      >
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
        <AddCustomField onAdd={handleAddField} />
      </DropDownContainer>
    </section>
  );
}
