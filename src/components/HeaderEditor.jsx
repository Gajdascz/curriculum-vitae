import EditorSection from './EditorSection';

export default function HeaderEditor() {
  const initialInputs = [
    { id: 'name-0', type: 'text', label: 'Name', value: '' },
    { id: 'email-1', type: 'email', label: 'Email', value: '' },
    { id: 'phone-2', type: 'tel', label: 'Phone', value: '' },
    { id: 'address-3', type: 'text', label: 'Address', value: '' }
  ];
  return (
    <EditorSection className="header-editor" initialInputs={initialInputs} />
  );
}
