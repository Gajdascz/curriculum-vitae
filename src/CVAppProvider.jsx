import { useState } from 'react';
import {
  uid,
  getInitialSections,
  sortSections,
  loadTemplate
} from './sectionsConfig';
import { storeSectionData } from './storage';
import CVAppContext from './CVAppContext';

export default function CVAppProvider({ children }) {
  const [sections, setSections] = useState(sortSections(getInitialSections()));

  const onSave = () => storeSectionData(sections);

  const onLoadTemplate = () => setSections(sortSections(loadTemplate()));

  const onUpdateSettings = ({ settings }) =>
    setSections(
      sections.map((section) => {
        if (section.location.id !== 'base') return section;
        return {
          ...section,
          selected: { ...section.selected, ...settings }
        };
      })
    );

  const updateRegularSection = (sectionId, updatedData) =>
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: [...updatedData]
            }
          : section
      )
    );

  const updateSectionSavedData = (sectionId, updatedData) => {
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
                    data: updatedData
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
              data: updatedData
            }
          ],
          fields: getEmptyFields(section)
        };
      })
    );
  };

  const onUpdateSection = (sectionId, updatedData, isStructured = false) => {
    if (!isStructured) updateRegularSection(sectionId, updatedData);
    else updateSectionSavedData(sectionId, updatedData);
  };

  const onAddField = (sectionId, field) => {
    const fieldData = { id: uid(), ...field, addDelete: true };
    setSections(
      sections.map((section) => {
        if (sectionId === section.id) console.log(section.fields);
        return sectionId === section.id
          ? {
              ...section,
              fields: [...section.fields, fieldData]
            }
          : section;
      })
    );
    return fieldData;
  };

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

  const onAddSection = (location, headerText) =>
    setSections(
      sortSections([
        ...sections,
        {
          id: uid(),
          headerText,
          isSelected: false,
          fields: [],
          type: 'configurable',
          location: { id: location, index: 999 },
          draggable: true
        }
      ])
    );

  const onSectionOrderChange = (sectionId, targetIndex, targetLocation) => {
    let updatedSection = null;
    const [inTarget, staticInTarget, rest] = sections.reduce(
      (acc, section) => {
        if (section.id === sectionId) {
          updatedSection = {
            ...section,
            location: {
              ...section.location,
              id: targetLocation,
              index: targetIndex
            }
          };
        } else if (!section.draggable) acc[2].push(section);
        else acc[section.location.id === targetLocation ? 0 : 1].push(section);
        return acc;
      },
      [[], [], []]
    );
    inTarget.splice(targetIndex, 0, updatedSection);
    inTarget.forEach((section, index) => (section.location.index = index));
    staticInTarget.push(...inTarget);
    setSections(sortSections([...rest, ...staticInTarget]));
  };

  const onRemoveSection = (sectionId) =>
    setSections(sections.filter((section) => section.id !== sectionId));

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

        onLoadTemplate,

        onUpdateSettings,

        onUpdateSection,

        onRemoveField,
        onAddField,

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
