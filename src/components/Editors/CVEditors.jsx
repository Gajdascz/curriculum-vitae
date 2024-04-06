import AddCustomField from '../AddCustomField/AddCustomField';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';
import FieldWrapper from '../common/Fields/FieldWrapper';
import Button from '../common/Button/Button';

import UtilButtons from './UtilButtons/UtilButtons';
import { useCVAppContext } from '../../CVAppContext';

import './CVEditors.css';
import { useState } from 'react';

export default function CVEditors() {
  const {
    sections,
    onFieldChange,
    onAddField,
    onRemoveField,
    onSave,
    onSectionSelect,
    onSaveStructuredData,
    onDeleteStructuredData,
    onEditSavedStructuredData,
    onReorderStructuredData
  } = useCVAppContext();

  const [dragStartIndex, setDragStartIndex] = useState(null);

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
        <div className="editor-content-container">
          {type === 'structured' && (
            <div className="orderable-data-container">
              {section.saved.map((saved) => (
                <FieldWrapper
                  key={saved.id}
                  type={'visual'}
                  hideLabel={true}
                  content={'saved-data'}
                  display={saved.data[0].value}
                  isDraggable={true}
                  data-index={saved.index}
                  onClick={() =>
                    onEditSavedStructuredData(section.id, saved.id)
                  }
                  onDragStart={() => setDragStartIndex(saved.index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(targetIndex) => {
                    onReorderStructuredData(
                      section.id,
                      dragStartIndex,
                      targetIndex
                    );
                    setDragStartIndex(null);
                  }}
                />
              ))}
            </div>
          )}
          <div className="editor-fields-container">
            {EditorFields({ fields, sectionId: section.id, sectionType: type })}
          </div>
          {type === 'expandable' && (
            <AddCustomField onAdd={(field) => onAddField(section.id, field)} />
          )}
          {type === 'structured' && (
            <div className="structured-data-buttons-container">
              <Button
                className="save-data-button"
                text="save"
                onClick={() => onSaveStructuredData(section.id)}
              />
              <Button
                className="delete-data-button"
                text="delete"
                onClick={() => onDeleteStructuredData(section.id)}
              />
            </div>
          )}
        </div>
      </DropDownContainer>
    );
  };

  const EditorFields = ({ fields, sectionId, sectionType }) => {
    const getWrapper = (field) => {
      const { type, label, value, content } = field;
      const hideLabel = sectionType === 'list' || label === 'Profile';
      return (
        <FieldWrapper
          key={field.id}
          type={type}
          label={label}
          hideLabel={hideLabel}
          value={value}
          content={content}
          onChange={(e) => onFieldChange(sectionId, field.id, e.target.value)}
          onDelete={
            sectionType === 'custom' || sectionType === 'list'
              ? () => onRemoveField(sectionId, field.id)
              : null
          }
          isDraggable={sectionType === 'custom' || sectionType === 'list'}
        />
      );
    };
    return fields.map((field) => {
      if (Array.isArray(field))
        return (
          <div key={field[0]} className="nested-input">
            <label>{field[1]}</label>
            <div className="nested-input-fields">
              {EditorFields({ fields: field[2], sectionId, sectionType })}
            </div>
          </div>
        );
      else return getWrapper(field);
    });
  };

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
