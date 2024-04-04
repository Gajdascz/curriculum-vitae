import { useState } from 'react';
import { uid, getInitialSections } from './initialSectionsConfig';
import CVAppContext from './CVAppContext';

export default function CVAppProvider({ children }) {
  const [sections, setSections] = useState(getInitialSections());

  const onFieldChange = (sectionId, fieldId, newValue) =>
    setSections(
      sections.map((section) =>
        sectionId === section.id
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? { ...field, value: newValue } : field
              )
            }
          : section
      )
    );

  const onAddField = (sectionId, field) =>
    setSections(
      sections.map((section) => {
        console.log(field);
        if (sectionId === section.id) console.log(section.fields);
        return sectionId === section.id
          ? {
              ...section,
              fields: [...section.fields, { id: uid(), ...field }]
            }
          : section;
      })
    );

  const onRemoveField = (sectionId, fieldId) =>
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id === fieldId)
            }
          : section
      )
    );

  const onSectionSelect = (sectionId) => {
    setSections(
      sections.map((section) => ({
        ...section,
        isSelected: section.id === sectionId && !section.isSelected
      }))
    );
    console.log(sections);
    console.log(sectionId);
  };
  const onSectionOrderChange = (newOrder) => {};
  const onAddSection = (sectionInfo) => {};
  const onRemoveSection = (sectionId) => {};

  return (
    <CVAppContext.Provider
      value={{
        sections,
        onFieldChange,
        onRemoveField,
        onAddField,
        onSectionSelect,
        onSectionOrderChange,
        onAddSection,
        onRemoveSection
      }}
    >
      {children}
    </CVAppContext.Provider>
  );
}
