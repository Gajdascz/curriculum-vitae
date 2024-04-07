import { useState } from 'react';
import { uid, getInitialSections, sortSections } from './sectionsConfig';
import { storeSectionData } from './storage';
import CVAppContext from './CVAppContext';

export default function CVAppProvider({ children }) {
  const [sections, setSections] = useState(sortSections(getInitialSections()));

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

  const onSaveStructuredData = (sectionId) => {
    const getFieldData = (fields) => fields.map((field) => ({ ...field }));
    const getEmptyFields = (section) =>
      section.fields.map((field) => ({ ...field, value: '' }));
    setSections(
      sections.map((section) => {
        if (section.id !== sectionId) return section;
        if (section.loadedDataId) {
          return {
            ...section,
            saved: section.saved.map((savedData) =>
              savedData.id !== section.loadedDataId
                ? savedData
                : {
                    ...savedData,
                    data: getFieldData(section.fields)
                  }
            ),
            fields: getEmptyFields(section),
            loadedDataId: null
          };
        }
        return {
          ...section,
          saved: [
            ...section.saved,
            {
              id: uid(),
              index: section.saved.length,
              data: getFieldData(section.fields)
            }
          ],
          fields: getEmptyFields(section)
        };
      })
    );
  };
  const onDeleteStructuredData = (sectionId, dataId) =>
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              saved: section.saved
                .filter((savedData) => savedData.id !== dataId)
                .map((data, index) => ({ ...data, index })),
              loadedDataId: null
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
              loadedDataId: dataId
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
