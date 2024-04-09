import Button from '../common/Button/Button';
import EditorContainer from './EditorContainer/EditorContainer';
import UtilButtons from './UtilButtons/UtilButtons';
import { useCVAppContext } from '../../CVAppContext';

import './CVEditors.css';
import DragContainer from '../DragAndDrop/DragContainer';
import DragAndDropProvider from '../DragAndDrop/DragAndDropProvider';
import AddSection from './AddSection/AddSection';
import Settings from './Settings/Settings';

export default function CVEditors() {
  const { sections, onSave } = useCVAppContext();

  return (
    <DragAndDropProvider>
      <section className={`cv-editors-section`}>
        <UtilButtons onSave={onSave} />
        <div className="cv-section-editors">
          <h2 className="cv-section-editors-header">CV Editors</h2>
          <div className="cv-section-editors-container">
            <Settings
              section={sections.find(
                (section) => section.location.id === 'base'
              )}
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
              <DragContainer
                items={sections.filter(
                  (section) => section.location.id === 'primary'
                )}
                itemSelectorClassName="draggable-section-selector"
                containerContext="sections-container"
                onClick={() => {}}
                onDragDrop={() => {}}
                onDelete={() => {}}
                renderItem={(item) => <EditorContainer section={item} />}
              />
              <AddSection location="primary"></AddSection>
            </div>
            <div className="section-editor-container">
              <h3 className="section-editor-header">Sidebar</h3>
              <DragContainer
                items={sections.filter(
                  (section) => section.location.id === 'sidebar'
                )}
                itemSelectorClassName="draggable-section-selector"
                containerContext="sections-container"
                onClick={() => {}}
                onDragDrop={() => {}}
                onDelete={() => {}}
                renderItem={(item) => <EditorContainer section={item} />}
              />
              <AddSection location="sidebar"></AddSection>
            </div>
          </div>
        </div>
      </section>
    </DragAndDropProvider>
  );
}
// import Button from '../common/Button/Button';
// import EditorContainer from './EditorContainer/EditorContainer';
// import UtilButtons from './UtilButtons/UtilButtons';
// import { useCVAppContext } from '../../CVAppContext';

// import './CVEditors.css';
// import DragContainer from '../DragAndDrop/DragContainer';
// import DragAndDropProvider from '../DragAndDrop/DragAndDropProvider';
// import FieldWrapper from '../common/Fields/FieldWrapper';
// import AddSection from './AddSection/AddSection';

// export default function CVEditors() {
//   const { sections, onSave } = useCVAppContext();

//   return (
//     <DragAndDropProvider>
//       <section className={`cv-editors-section`}>
//         <UtilButtons onSave={onSave} />
//         <div className="cv-section-editors">
//           <h2 className="cv-section-editors-header">CV Editors</h2>
//           <div className="cv-section-editors-container">
//             <div className="general-settings-editor">
//               {sections
//                 .filter((section) => section.location.id === 'base')
//                 .map((section) => EditorContainer({ section }))}
//             </div>
//             <div className="section-editor-container">
//               <h3 className="section-editor-header">Header</h3>
//               {sections
//                 .filter((section) => section.location.id === 'header')
//                 .map((section) => EditorContainer({ section }))}
//             </div>
//             <div className="section-editor-container">
//               <h3 className="section-editor-header">Primary</h3>
//               <AddSection location="primary"></AddSection>
//               <DragContainer
//                 items={sections.filter(
//                   (section) => section.location.id === 'primary'
//                 )}
//                 itemType="section"
//                 itemSelectorClassName="draggable-section-selector"
//                 containerContext="sections-container"
//                 onClick={() => {}}
//                 onDragDrop={() => {}}
//                 onDelete={() => {}}
//               />
//             </div>
//             <div className="section-editor-container">
//               <h3 className="section-editor-header">Sidebar</h3>
//               <Button text="+" className="add-section-button" />
//               <DragContainer
//                 items={sections.filter(
//                   (section) => section.location.id === 'sidebar'
//                 )}
//                 itemType="section"
//                 itemSelectorClassName="draggable-section-selector"
//                 containerContext="sections-container"
//                 onClick={() => {}}
//                 onDragDrop={() => {}}
//                 onDelete={() => {}}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </DragAndDropProvider>
//   );
// }
