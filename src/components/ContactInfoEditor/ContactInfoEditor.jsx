import { useState } from 'react';

import EditorSection from '../EditorSection';
import Input from '../common/Input/Input';
import AddCustomField from '../AddCustomField/AddCustomField';

export default function ContactInfoEditor() {
  const [inputs, setInputs] = useState([
    { id: 'name-0', type: 'text', label: 'Name', value: '' },
    { id: 'email-1', type: 'email', label: 'Email', value: '' },
    { id: 'phone-2', type: 'tel', label: 'Phone', value: '' },
    { id: 'address-3', type: 'text', label: 'Address', value: '' }
  ]);

  return <EditorSection></EditorSection>;
}
