import EditorContainer from './EditorContainer/EditorContainer';
import UtilButtons from './UtilButtons/UtilButtons';
import { useCVAppContext } from '../../CVAppContext';

import './CVEditors.css';
import DragContainer from '../DragAndDrop/DragContainer';
import AddSection from './AddSection/AddSection';
import Settings from './Settings/Settings';

export default function CVEditors() {
  const {
    sections,
    onRemoveSection,
    onSectionOrderChange,
    onSave,
    onLoadTemplate
  } = useCVAppContext();

  const [primaryDraggable, primaryStatic, sidebarDraggable, sidebarStatic] =
    sections.reduce(
      (acc, section) => {
        if (section.location.id === 'primary')
          acc[section.draggable ? 0 : 1].push(section);
        if (section.location.id === 'sidebar')
          acc[section.draggable ? 2 : 3].push(section);
        return acc;
      },
      [[], [], [], []]
    );

  return (
    <section className={`cv-editors-section`}>
      <UtilButtons onSave={onSave} onLoadTemplate={onLoadTemplate} />
      <div className="cv-section-editors">
        <h2 className="cv-section-editors-header">CV Editors</h2>
        <div className="cv-section-editors-container">
          <Settings
            section={sections.find((section) => section.location.id === 'base')}
          />
          <div className="section-editor-container">
            <h3 className="section-editor-header">Header</h3>
            {sections
              .filter((section) => section.location.id === 'header')
              .map((section) => (
                <EditorContainer key={section.id} section={section} />
              ))}
          </div>
          <div className="section-editor-container">
            <h3 className="section-editor-header">Primary</h3>
            {
              <EditorContainer
                section={sections.find(
                  (section) => section.location.id === 'profile'
                )}
              />
            }
            {primaryStatic.map((section) => (
              <EditorContainer key={section.id} section={section} />
            ))}
            <DragContainer
              items={primaryDraggable}
              itemSelectorClassName="draggable-section-selector"
              containerContext="sections-container"
              onClick={() => {}}
              onDragDrop={({ targetIndex, targetLocation, draggedItem }) =>
                onSectionOrderChange(draggedItem, targetIndex, targetLocation)
              }
              onDelete={(id) => onRemoveSection(id)}
              renderItem={(item) => <EditorContainer section={item} />}
            />
            <AddSection location="primary"></AddSection>
          </div>
          <div className="section-editor-container">
            <h3 className="section-editor-header">Sidebar</h3>
            {sidebarStatic.map((section) => (
              <EditorContainer key={section.id} section={section} />
            ))}
            <DragContainer
              items={sidebarDraggable}
              itemSelectorClassName="draggable-section-selector"
              containerContext="sections-container"
              onClick={() => {}}
              onDragDrop={({ targetIndex, targetLocation, draggedItem }) =>
                onSectionOrderChange(draggedItem, targetIndex, targetLocation)
              }
              onDelete={(id) => onRemoveSection(id)}
              renderItem={(item) => <EditorContainer section={item} />}
            />
            <AddSection location="sidebar"></AddSection>
          </div>
        </div>
      </div>
    </section>
  );
}
