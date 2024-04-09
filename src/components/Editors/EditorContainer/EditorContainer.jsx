import DropDownContainer from '../../common/DropDownContainer/DropDownContainer';
import DragContainer from '../../DragAndDrop/DragContainer';
import AddCustomField from '../../AddCustomField/AddCustomField';
import Button from '../../common/Button/Button';
import FieldWrapper from '../../common/Fields/FieldWrapper';
import { useCVAppContext } from '../../../CVAppContext';
import './EditorContainer.css';
export default function EditorContainer({ section }) {
  const {
    onSectionSelect,
    onAddField,
    onRemoveField,
    onUpdateField,
    onSaveStructuredData,
    onDeleteStructuredData,
    onEditSavedStructuredData,
    onReorderStructuredData
  } = useCVAppContext();

  const { headerText, isSelected, fields } = section;

  const Fields = () =>
    fields.map((field) => (
      <FieldWrapper
        key={field.id}
        type={field.type}
        label={field.label}
        value={field.value}
        onBlur={(value) => onUpdateField(section.id, field.id, value)}
        onDelete={
          field.addDelete ? () => onRemoveField(section.id, field.id) : null
        }
      />
    ));

  const StructuredEditorContent = () => {
    return (
      <>
        <DragContainer
          items={section.saved}
          itemSelectorClassName="draggable-field-selector"
          containerContext={section.id}
          onClick={(dataId) => onEditSavedStructuredData(section.id, dataId)}
          onDragDrop={({ startIndex, targetIndex }) =>
            onReorderStructuredData(section.id, startIndex, targetIndex)
          }
          onDelete={(itemId) => onDeleteStructuredData(section.id, itemId)}
          renderItem={(data) => (
            <div className="draggable-field">{data.data[0].value}</div>
          )}
        />
        <div className="editor-fields-container">
          <Fields />
          <AddCustomField
            onAdd={(field) => onAddField(section.id, field)}
            onDelete={(fieldId) => onRemoveField(section.id, fieldId)}
          />
          <Button
            className="save-data-button"
            text="save"
            onClick={() => onSaveStructuredData(section.id)}
          />
        </div>
      </>
    );
  };

  const ConfigurableEditorContent = () => {
    return (
      <>
        <DragContainer
          items={section.fields}
          itemSelectorClassName="configurable-section-input-selector"
          containerContext={section.id}
          onClick={() => {}}
          onDragDrop={() => {}}
          onDelete={() => {}}
          renderItem={(field) => (
            <FieldWrapper
              {...field}
              hideLabel={true}
              placeholder={field.label}
              onBlur={(value) => onUpdateField(section.id, field.id, value)}
            />
          )}
        />
        <AddCustomField
          onAdd={(field) => onAddField(section.id, field)}
          onDelete={(fieldId) => onRemoveField(section.id, fieldId)}
        />
      </>
    );
  };

  const EditorContent = () => {
    switch (section.type) {
      case 'static':
        return (
          <div className="editor-fields-container">
            <Fields />
          </div>
        );
      case 'structured':
        return <StructuredEditorContent />;
      case 'configurable':
        return <ConfigurableEditorContent />;
    }
  };

  return (
    <DropDownContainer
      key={section.id}
      containerHeaderText={headerText}
      toggle={() => onSectionSelect(section.id)}
      isOpen={isSelected}
      addToggleToHeader={true}
    >
      <EditorContent />
    </DropDownContainer>
  );
}
