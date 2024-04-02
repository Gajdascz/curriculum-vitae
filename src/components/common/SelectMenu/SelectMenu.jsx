import { useState } from 'react';
import DropDownContainer from '../DropDownContainer/DropDownContainer';
import Button from '../Button/Button';
import './SelectMenu.css';

export default function SelectMenu({ label, options, handleChange }) {
  const [selectedStatus, setSelectedStatus] = useState({
    selected: options[0],
    isSelecting: false
  });
  const onChange = (option) => {
    handleChange(option);
    setSelectedStatus({ selected: option, isSelecting: false });
  };
  const toggleSelecting = () =>
    setSelectedStatus({
      ...selectedStatus,
      isSelecting: !selectedStatus.isSelecting
    });

  return (
    <span className="select-menu-label">
      {label}
      <DropDownContainer
        containerHeaderText={selectedStatus.selected}
        className="select-menu"
        isOpen={selectedStatus.isSelecting}
        toggle={toggleSelecting}
        addToggleToHeader={true}
      >
        {options.map((option) =>
          option === selectedStatus.selected ? null : (
            <Button
              key={option}
              className="select-menu-option"
              data-value={option}
              onClick={() => onChange(option)}
              text={option}
            />
          )
        )}
      </DropDownContainer>
    </span>
  );
}
