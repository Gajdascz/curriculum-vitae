import DropDownContainer from '../../DropDownContainer/DropDownContainer';
import DragContainer from '../../DragContainer/DragContainer';
import AddCustomField from '../../AddCustomField/AddCustomField';
import Button from '../../Button/Button';
import FieldWrapper from '../../Fields/FieldWrapper/FieldWrapper';
import { useCVAppContext } from '../../../contexts/CVAppContext';
import { useRef } from 'react';
import './EditorContainer.css';
export default function EditorContainer({ section }) {
  const {
    onSectionSelect,
    onAddField,
    onRemoveField,
    onDeleteStructuredData,
    onEditSavedStructuredData,
    onReorderStructuredData,
    onUpdateSection,
    onReorderFields,
    areFieldsInSync,
    setFieldsInSync
  } = useCVAppContext();

  const { headerText, isSelected, fields } = section;
  const fieldsRef = useRef([...fields]);

  const bufferFieldChange = (fieldId, value) => {
    fieldsRef.current = fieldsRef.current.map((field) => {
      return field.id !== fieldId ? field : { ...field, value };
    });
  };
  const onSaveChanges = (isStructured = false) => {
    console.log(areFieldsInSync());
    if (!areFieldsInSync()) {
      fieldsRef.current = [...fields];
      setFieldsInSync(true);
    }
    onUpdateSection(section.id, [...fieldsRef.current], isStructured);
  };
  const removeField = (fieldId) => {
    fieldsRef.current = fieldsRef.current.filter(
      (field) => field.id !== fieldId
    );
    onRemoveField(section.id, fieldId);
  };
  const addField = (field) => {
    const fieldData = onAddField(section.id, field);
    fieldsRef.current.push(fieldData);
  };

  const Fields = () =>
    fields.map((field) => (
      <FieldWrapper
        key={field.id}
        fieldData={{
          type: field.type,
          value: field.value
        }}
        labelData={{
          text: field.label,
          hide: field.hideLabel
        }}
        fieldFns={{
          onBlur: (e) => bufferFieldChange(field.id, e.target.value)
        }}
        onDelete={field.addDelete ? () => removeField(field.id) : null}
      />
    ));

  const StructuredEditorContent = () => {
    return (
      <>
        <DragContainer
          items={section.saved}
          itemSelectorClassName="draggable-field-selector"
          containerContext={section.id}
          onClick={(dataId) => {
            onEditSavedStructuredData(section.id, dataId);
            fieldsRef.current = section.saved.find(
              (data) => data.id === dataId
            ).data;
          }}
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
            onAdd={(field) => addField(field)}
            onDelete={(fieldId) => removeField(fieldId)}
          />
          <Button
            className="add-data-button"
            text="Add/Update"
            onClick={() => onSaveChanges(true)}
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
          onDragDrop={({ startIndex, targetIndex }) =>
            onReorderFields(section.id, startIndex, targetIndex)
          }
          onDelete={(fieldId) => removeField(fieldId)}
          renderItem={(field) => (
            <FieldWrapper
              key={field.id}
              fieldData={{
                type: field.type,
                value: field.value
              }}
              labelData={{
                text: field.label,
                hide: true
              }}
              fieldFns={{
                onBlur: (e) => bufferFieldChange(field.id, e.target.value)
              }}
            />
          )}
        />
        <div className="configurable-section-item-container">
          <AddCustomField
            onAdd={(field) => addField(field)}
            onDelete={(fieldId) => removeField(fieldId)}
          />
          <Button
            className="save-section-changes-button"
            text="Apply"
            onClick={() => onSaveChanges()}
          />
        </div>
      </>
    );
  };

  const EditorContent = () => {
    switch (section.type) {
      case 'static':
        return (
          <div className="editor-fields-container">
            <Fields />
            <Button
              className="save-section-changes-button"
              text="Apply"
              onClick={() => onSaveChanges()}
            />
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
