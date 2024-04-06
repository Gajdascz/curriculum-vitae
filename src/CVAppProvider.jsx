import { useState } from 'react';
import { uid, getInitialSections } from './initialSectionsConfig';
import { storeSectionData } from './storage';
import CVAppContext from './CVAppContext';

export default function CVAppProvider({ children }) {
  const [sections, setSections] = useState(
    getInitialSections().sort((a, b) => a.index - b.index)
  );

  const onSave = () => storeSectionData(sections);

  const onExpandSection = (expandedSection) =>
    setSections(
      sections.map((section) =>
        section.id === expandedSection.id
          ? { ...section, ...expandedSection }
          : section
      )
    );

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
      sections.map((section) => {
        if (sectionId === section.id) console.log(section.fields);
        return section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id !== fieldId)
            }
          : section;
      })
    );

  const onSectionSelect = (sectionId) =>
    setSections(
      sections.map((section) => ({
        ...section,
        isSelected: section.id === sectionId && !section.isSelected
      }))
    );

  const onSectionOrderChange = (newOrder) => {};
  const onAddSection = (sectionInfo) => {};
  const onRemoveSection = (sectionId) => {};

  const onSaveStructuredData = (sectionId) =>
    setSections(
      sections.map((section) =>{
        if(section.id !== sectionId) return section;
          ? {
              ...section,
              saved: [
                ...section.saved,
                {
                  id: uid(),
                  index: section.saved.length + 1,
                  data: section.fields.map((field) => ({ ...field }))
                }
              ],
              fields: section.fields.map((field) => ({ ...field, value: '' })),
              loadedData: null
            }
          : section}
      )
    );

  const onDeleteStructuredData = (sectionId) =>
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              saved: section.saved
                .filter((savedData) => savedData.id !== section.loadedData)
                .map((data, index) => ({ ...data, index }))
            }
          : section
      )
    );

  const onEditSavedStructuredData = (sectionId, dataId) =>
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: [
                ...section.saved.find((data) => data.id === dataId).data
              ],
              loadedData: dataId
            }
          : section
      )
    );

  const onReorderStructuredData = (sectionId, startIndex, targetIndex) =>
    setSections(
      sections.map((section) => {
        if (section.id !== sectionId) return section;
        const itemToMove = section.saved[startIndex];
        const newSaved = [...section.saved];
        newSaved.splice(startIndex, 1);
        newSaved.splice(targetIndex, 0, itemToMove);
        const updated = newSaved.map((data, index) => ({ ...data, index }));
        console.log(updated);
        return { ...section, saved: updated };
      })
    );

  return (
    <CVAppContext.Provider
      value={{
        sections,
        onSave,
        onExpandSection,
        onFieldChange,
        onRemoveField,
        onAddField,

        onSaveStructuredData,
        onDeleteStructuredData,
        onEditSavedStructuredData,
        onReorderStructuredData,

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
