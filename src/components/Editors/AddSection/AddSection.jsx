import Button from '../../common/Button/Button';
import { useCVAppContext } from '../../../CVAppContext';
import { useState } from 'react';
import './AddSection.css';
export default function AddSection({ location }) {
  const [fieldInput, setFieldInput] = useState('');
  const { onAddSection } = useCVAppContext();
  return (
    <div className="add-section-input-container">
      <Button
        addDefaultStyling={false}
        text="+"
        className="add-section-button"
        onClick={() => {
          if (fieldInput && fieldInput.trim().length > 0) {
            onAddSection(location, fieldInput);
          }
          setFieldInput('');
        }}
      />
      <input
        className="add-section-header-input"
        placeholder="Section Header"
        onChange={(e) => setFieldInput(e.target.value)}
        value={fieldInput}
      />
    </div>
  );
}
