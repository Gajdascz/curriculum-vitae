import { useState } from 'react';
import './Checkbox.css';
import Button from '../../../Button/Button';

export default function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Button
      text={isChecked ? '✔' : 'X'}
      className={`custom-checkbox ${isChecked ? 'checked' : 'unchecked'}`}
      value={isChecked}
      onclick={() => setIsChecked(!isChecked)}
    />
  );
}
