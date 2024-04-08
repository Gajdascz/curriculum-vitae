import FieldWrapper from '../../common/Fields/FieldWrapper';
import { useCVAppContext } from '../../../CVAppContext';
import './EditorFields.css';

export default function EditorFields({ fields, sectionId, sectionType }) {
  const { onFieldChange, onRemoveField } = useCVAppContext();
  const getWrapper = (field) => {
    const { type, label, value, content } = field;
    return (
      <FieldWrapper
        key={field.id}
        type={type}
        label={label}
        value={value}
        content={content}
        onChange={(e) => onFieldChange(sectionId, field.id, e.target.value)}
        onDelete={
          field.addDelete ? () => onRemoveField(sectionId, field.id) : null
        }
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
}
