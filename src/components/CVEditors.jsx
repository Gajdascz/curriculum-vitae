import AddCustomField from './AddCustomField/AddCustomField';
import DropDownContainer from './common/DropDownContainer/DropDownContainer';
import FieldWrapper from './common/Fields/FieldWrapper';
import { useCVAppContext } from '../CVAppContext';

export default function CVEditors() {
  const { sections, onFieldChange, onAddField, onSectionSelect } =
    useCVAppContext();

  return (
    <section className={`cv-editors`}>
      {sections.map((section) => {
        const { headerText, isSelected, fields } = section;
        return (
          <DropDownContainer
            key={section.id}
            containerHeaderText={headerText}
            toggle={() => onSectionSelect(section.id)}
            isOpen={isSelected}
            addToggleToHeader={true}
          >
            {fields.map((field) => {
              const { type, label, value } = field;
              return (
                <FieldWrapper
                  key={field.id}
                  type={type}
                  label={label}
                  value={value}
                  onChange={(e) =>
                    onFieldChange(section.id, field.id, e.target.value)
                  }
                />
              );
            })}
            <AddCustomField onAdd={(field) => onAddField(section.id, field)} />
          </DropDownContainer>
        );
      })}
    </section>
  );
}
