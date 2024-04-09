import DropDownContainer from '../../common/DropDownContainer/DropDownContainer';
import { useCVAppContext } from '../../../CVAppContext';

import './Settings.css';

export default function Settings({ section }) {
  const { headerText, isSelected } = section;
  const { onSectionSelect } = useCVAppContext();

  const NestedInput = ({ inputs, label, className }) => (
    <div className="nested-input-container">
      <label htmlFor={label.htmlFor}>{label.text}</label>
      <div className="nested-input">
        {inputs.map((option) => (
          <div
            key={option.id}
            className={`visual-input ${className} ${option.value}`}
          >
            {option.content}
          </div>
        ))}
      </div>
    </div>
  );

  console.log(section);
  return (
    <DropDownContainer
      key={section.id}
      containerHeaderText={headerText}
      toggle={() => onSectionSelect(section.id)}
      isOpen={isSelected}
      addToggleToHeader={true}
    >
      <div className="color-picker-container">
        <label htmlFor="settings-color-picker">Accent</label>
        <input
          type="color"
          id="settings-color-picker"
          onChange={() => {}}
          value={section.accentColor.selected}
        />
      </div>
      <NestedInput
        inputs={section.fonts.options}
        label={{ text: 'Font', htmlFor: 'settings-font-picker' }}
        className="font-field"
      />
      <NestedInput
        inputs={section.layouts.options}
        label={{ text: 'Layout', htmlFor: 'settings-layout-picker' }}
        className="layout-field"
      />
    </DropDownContainer>
  );
}
