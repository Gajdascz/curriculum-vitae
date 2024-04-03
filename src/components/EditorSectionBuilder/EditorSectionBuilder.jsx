import { useState } from 'react';
import Button from '../common/Button/Button';
import TextArea from '../common/TextArea/TextArea';
import AddCustomField from '../AddCustomField/AddCustomField';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';
import ListBuilder from '../common/List/List';
import './EditorSectionBuilder.css';
import FieldWrapper from '../common/Input/FieldWrapper';

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
        value,
        includeRemove: true
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
            <FieldWrapper
              key={id}
              type={type}
              label={label}
              value={value}
              onChange={(e) => handleInputChange(id, e.target.value)}
            />
          );
        })}
        <AddCustomField onAdd={handleAddField} />
      </DropDownContainer>
    </section>
  );
}
// <div key={id} className="editor-input-container">
//   <div className="editor-input">{InputTypeElement}</div>
//   <Button
//     text="X"
//     handleClick={() =>
//       setInputs(inputs.filter((input) => input.id !== id))
//     }
//     className="remove-input"
//   />
// </div>
