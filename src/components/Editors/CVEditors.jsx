import AddCustomField from '../AddCustomField/AddCustomField';
import DropDownContainer from '../common/DropDownContainer/DropDownContainer';
import FieldWrapper from '../common/Fields/FieldWrapper';
import Button from '../common/Button/Button';

import UtilButtons from './UtilButtons/UtilButtons';
import { useCVAppContext } from '../../CVAppContext';

import './CVEditors.css';
import DragContainer from '../DragContainer/DragContainer';

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

  const EditorContainer = (section) => {
    const { headerText, isSelected, fields, type } = section;
    return (
      <DropDownContainer
        key={section.id}
        containerHeaderText={headerText}
        toggle={() => onSectionSelect(section.id)}
        isOpen={isSelected}
        addToggleToHeader={true}
        data-location={section.location.id}
        data-index={section.location.index}
      >
        <div className="editor-content-container">
          {type === 'structured' && (
            <DragContainer
              items={section.saved}
              onClick={(dataId) =>
                onEditSavedStructuredData(section.id, dataId)
              }
              onDrop={({ startIndex, targetIndex }) =>
                onReorderStructuredData(section.id, startIndex, targetIndex)
              }
              onDelete={(itemId) => onDeleteStructuredData(section.id, itemId)}
              renderItem={(data) => (
                <div className="draggable-field">{data.data[0].value}</div>
              )}
            />
          )}
          <div className="editor-fields-container">
            {EditorFields({ fields, sectionId: section.id, sectionType: type })}
          </div>
          {type === 'expandable' && (
            <AddCustomField onAdd={(field) => onAddField(section.id, field)} />
          )}
          {type === 'structured' && (
            <Button
              className="save-data-button"
              text="save"
              onClick={() => onSaveStructuredData(section.id)}
            />
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
          <div className="general-settings-editor">
            {sections
              .filter((section) => section.location.id === 'base')
              .map(EditorContainer)}
          </div>
          <div className="section-editor-container">
            <h3 className="section-editor-header">Header</h3>
            {sections
              .filter((section) => section.location.id === 'header')
              .map(EditorContainer)}
          </div>
          <div className="section-editor-container">
            <h3 className="section-editor-header">Primary</h3>
            <DragContainer
              items={sections.filter(
                (section) => section.location.id === 'primary'
              )}
              onClick={() => {}}
              onDrop={() => {}}
              onDelete={() => {}}
              renderItem={(item) => EditorContainer(item)}
            />
            <Button text="Add" className="add-section-button" />
          </div>
          <div className="section-editor-container">
            <h3 className="section-editor-header">Sidebar</h3>
            <DragContainer
              items={sections.filter(
                (section) => section.location.id === 'sidebar'
              )}
              onClick={() => {}}
              onDrop={() => {}}
              onDelete={() => {}}
              renderItem={(item) => EditorContainer(item)}
            />
            <Button text="Add" className="add-section-button" />
          </div>
        </div>
      </div>
    </section>
  );
}
