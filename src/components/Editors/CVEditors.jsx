import AddCustomField from '../AddCustomField/AddCustomField';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';
import FieldWrapper from '../common/Fields/FieldWrapper';
import Button from '../common/Button/Button';

import UtilButtons from './UtilButtons/UtilButtons';
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
    const { headerText, isSelected, fields, type } = section;
    return (
      <DropDownContainer
        key={section.id}
        containerHeaderText={headerText}
        toggle={() => onSectionSelect(section.id)}
        isOpen={isSelected}
        addToggleToHeader={true}
      >
        {EditorFields({ fields, sectionId: section.id, sectionType: type })}
      </DropDownContainer>
    );
  };

  const EditorFields = ({ fields, sectionId, sectionType }) =>
    fields.map((field) => {
      const { type, label, value } = field;
      return (
        <FieldWrapper
          key={field.id}
          type={type}
          label={label}
          value={value}
          onChange={(e) => onFieldChange(sectionId, field.id, e.target.value)}
          onDelete={
            sectionType === 'custom' || sectionType === 'list'
              ? () => onRemoveField(sectionId, field.id)
              : null
          }
          isDraggable={sectionType === 'custom' ? () => {} : null}
        />
      );
    });

  return (
    <section className={`cv-editors-section`}>
      <UtilButtons onSave={onSave} />
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
