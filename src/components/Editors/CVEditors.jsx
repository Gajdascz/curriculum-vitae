import Button from '../common/Button/Button';
import EditorContainer from './EditorContainer/EditorContainer';
import UtilButtons from './UtilButtons/UtilButtons';
import { useCVAppContext } from '../../CVAppContext';

import './CVEditors.css';
import DragContainer from '../DragAndDrop/DragContainer';
import DragAndDropProvider from '../DragAndDrop/DragAndDropProvider';

export default function CVEditors() {
  const { sections, onSave } = useCVAppContext();

  return (
    <DragAndDropProvider>
      <section className={`cv-editors-section`}>
        <UtilButtons onSave={onSave} />
        <div className="cv-section-editors">
          <h2 className="cv-section-editors-header">CV Editors</h2>
          <div className="cv-section-editors-container">
            <div className="general-settings-editor">
              {sections
                .filter((section) => section.location.id === 'base')
                .map(EditorContainer)}
            </div>
            <div className="section-editor-container">
              <h3 className="section-editor-header">Header</h3>
              {sections
                .filter((section) => section.location.id === 'header')
                .map(EditorContainer)}
            </div>
            <div className="section-editor-container">
              <h3 className="section-editor-header">Primary</h3>
              <Button text="+" className="add-section-button" />
              <DragContainer
                items={sections.filter(
                  (section) => section.location.id === 'primary'
                )}
                itemSelectorClassName="draggable-section-selector"
                containerContext="sections-container"
                onClick={() => {}}
                onDragDrop={() => {}}
                onDelete={() => {}}
                renderItem={(item) => EditorContainer(item)}
              />
            </div>
            <div className="section-editor-container">
              <h3 className="section-editor-header">Sidebar</h3>
              <Button text="+" className="add-section-button" />
              <DragContainer
                items={sections.filter(
                  (section) => section.location.id === 'sidebar'
                )}
                itemSelectorClassName="draggable-section-selector"
                containerContext="sections-container"
                onClick={() => {}}
                onDragDrop={() => {}}
                onDelete={() => {}}
                renderItem={(item) => EditorContainer(item)}
              />
            </div>
          </div>
        </div>
      </section>
    </DragAndDropProvider>
  );
}
