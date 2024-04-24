import { useState } from 'react';
import DropDownContainer from '../../DropDownContainer/DropDownContainer';
import Button from '../../Button/Button';
import './SelectMenu.css';

export default function SelectMenu({ options, onChange, className }) {
  const [selectedStatus, setSelectedStatus] = useState({
    selected: options[0],
    isSelecting: false
  });
  const handleChange = (option) => {
    onChange(option);
    setSelectedStatus({ selected: option, isSelecting: false });
  };
  const toggleSelecting = () =>
    setSelectedStatus({
      ...selectedStatus,
      isSelecting: !selectedStatus.isSelecting
    });

  return (
    <DropDownContainer
      containerHeaderText={selectedStatus.selected}
      className={`select-menu ${className}`}
      isOpen={selectedStatus.isSelecting}
      toggle={toggleSelecting}
      addToggleToHeader={true}
    >
      <div className="select-menu-options-container">
        {options.map((option) =>
          option === selectedStatus.selected ? null : (
            <Button
              key={option}
              addDefaultStyling={false}
              className="select-menu-option"
              data-value={option}
              onClick={() => handleChange(option)}
              text={option}
            />
          )
        )}
      </div>
    </DropDownContainer>
  );
}
