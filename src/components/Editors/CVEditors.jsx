import AddCustomField from '../AddCustomField/AddCustomField';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';
import FieldWrapper from '../common/Fields/FieldWrapper';
import Button from '../common/Button/Button';

import { useCVAppContext } from '../../CVAppContext';

import './CVEditors.css';

export default function CVEditors() {
  const {
    sections,
    onFieldChange,
    onAddField,
    onRemoveField,
    onSave,
    onSectionSelect
  } = useCVAppContext();

  const EditorContainer = (section) => {
    const { headerText, isSelected, fields, saved, actions } = section;
    return (
      <DropDownContainer
        key={section.id}
        containerHeaderText={headerText}
        toggle={() => onSectionSelect(section.id)}
        isOpen={isSelected}
        addToggleToHeader={true}
      >
        {EditorFields(fields, section.id)}
      </DropDownContainer>
    );
  };

  const EditorFields = (fields, sectionId) =>
    fields.map((field) => {
      const { type, label, value, addDelete } = field;
      return (
        <FieldWrapper
          key={field.id}
          type={type}
          label={label}
          value={value}
          onChange={(e) => onFieldChange(sectionId, field.id, e.target.value)}
          onDelete={addDelete && (() => onRemoveField(sectionId, field.id))}
        />
      );
    });

  return (
    <section className={`cv-editors-section`}>
      <div className="cv-editors-util-sections">
        <div className="util-section-wrapper">
          <h3 className="util-section-header">Memory</h3>
          <div className="util-section-buttons">
            <Button text="Save" onclick={onSave} />
            <Button text="Clear" onclick={() => localStorage.clear()} />
          </div>
        </div>
        <div className="util-section-wrapper">
          <h3 className="util-section-header">Export</h3>
          <div className="util-section-buttons">
            <Button text="PDF" />
            <Button text="HTML" />
          </div>
        </div>
        <div className="util-section-wrapper">
          <h3 className="util-section-header">Print</h3>
          <div className="util-section-buttons">
            <Button text="Preview" />
            <Button text="Start" />
          </div>
        </div>
      </div>
      <div className="cv-section-editors">
        <h2 className="cv-section-editors-header">CV Editors</h2>
        <div className="cv-section-editors-container">
          {sections.map(EditorContainer)}
        </div>
      </div>
    </section>
  );
}
// {
//   sections.map((section) => {
//     const { headerText, isSelected, fields, saved, actions } = section;
//     return (
//       <DropDownContainer
//         key={section.id}
//         containerHeaderText={headerText}
//         toggle={() => onSectionSelect(section.id)}
//         isOpen={isSelected}
//         addToggleToHeader={true}
//       >
//         {fields.map((field) => {
//           const { type, label, value } = field;
//           return (
//             <FieldWrapper
//               key={field.id}
//               type={type}
//               label={label}
//               value={value}
//               onChange={(e) =>
//                 onFieldChange(section.id, field.id, e.target.value)
//               }
//             />
//           );
//         })}
//         {/* <AddCustomField onAdd={(field) => onAddField(section.id, field)} /> */}
//       </DropDownContainer>
//     );
//   });
// }
