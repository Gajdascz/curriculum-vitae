import { useState } from 'react';
import {
  uid,
  getInitialSections,
  sortSections,
  loadTemplate
} from '../config/sectionsConfig';
import { storeSectionData } from '../storage';
import CVAppContext from './CVAppContext';

export default function CVAppProvider({ children }) {
  const [sections, setSections] = useState(sortSections(getInitialSections()));
  const [fieldsInSync, setFieldsInSync] = useState(true);
  const onSave = () => {
    localStorage.clear();
    storeSectionData(sections);
  };

  const onLoadTemplate = () => {
    setSections(sortSections(loadTemplate()));
    setFieldsInSync(false);
  };

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
              removable: true,
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
              fields: [...section.fields, { ...fieldData, removable: true }]
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
          draggable: true,
          removable: true
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

  const sortByIndex = (sectionId, sortProperty, startIndex, targetIndex) =>
    setSections(
      sections.map((section) => {
        if (section.id !== sectionId) return section;
        const itemToMove = section[sortProperty][startIndex];
        const newItemArray = [...section[sortProperty]];
        newItemArray.splice(startIndex, 1);
        newItemArray.splice(targetIndex, 0, itemToMove);
        const updated = newItemArray.map((item, index) => ({ ...item, index }));
        return { ...section, [sortProperty]: updated };
      })
    );

  const onReorderStructuredData = (sectionId, startIndex, targetIndex) =>
    sortByIndex(sectionId, 'saved', startIndex, targetIndex);

  const onReorderFields = (sectionId, startIndex, targetIndex) =>
    sortByIndex(sectionId, 'fields', startIndex, targetIndex);

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

        onReorderFields,

        onDeleteStructuredData,
        onEditSavedStructuredData,
        onReorderStructuredData,

        onSectionSelect,
        onSectionOrderChange,
        onAddSection,
        onRemoveSection,

        setFieldsInSync,
        areFieldsInSync: () => fieldsInSync
      }}
    >
      {children}
    </CVAppContext.Provider>
  );
}
