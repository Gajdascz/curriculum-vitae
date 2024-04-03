import { useState } from 'react';
import EditorSection from './EditorSectionBuilder/EditorSectionBuilder';

const initialEditors = [
  {
    key: 'header-0',
    className: 'header-editor',
    headerText: 'Header',
    isOpen: false,
    initialInputs: [
      { id: 'name-0', type: 'text', label: 'Name', value: '' },
      { id: 'email-1', type: 'email', label: 'Email', value: '' },
      { id: 'phone-2', type: 'tel', label: 'Phone', value: '' },
      { id: 'address-3', type: 'text', label: 'Address', value: '' }
    ]
  }
];
export default function CVEditors() {
  const [editors, setEditors] = useState(initialEditors);
  const handleToggle = (toggledKey) =>
    setEditors(
      editors.map((editor) => ({
        ...editor,
        isOpen: editor.key === toggledKey
      }))
    );
  return (
    <section className="cv-editors">
      {editors.map((editor) => {
        return (
          <EditorSection
            key={editor.key}
            {...editor}
            toggle={() => handleToggle(editor.key)}
          />
        );
      })}
    </section>
  );
}
