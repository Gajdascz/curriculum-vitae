import DropDownContainer from '../../DropDownContainer/DropDownContainer';
import Button from '../../Button/Button';
import { useCVAppContext } from '../../../contexts/CVAppContext';

import './Settings.css';
import { useState } from 'react';

export default function Settings({ section }) {
  const { headerText, isSelected } = section;
  const { onSectionSelect, onUpdateSettings } = useCVAppContext();
  const [settings, setSettings] = useState({ ...section.selected });

  const NestedInput = ({ inputs, label, className, selectedAttribute }) => (
    <div className="nested-input-container">
      <label htmlFor={label.htmlFor}>{label.text}</label>
      <div className="nested-input">
        {inputs.map((option) => (
          <div
            key={option.id}
            className={`visual-input ${className} ${option.value}${option.value === settings[selectedAttribute] ? ` selected` : ''}`}
            data-value={option.value}
            onClick={(e) =>
              setSettings({
                ...settings,
                [selectedAttribute]: e.target.dataset.value
              })
            }
          >
            {option.content}
          </div>
        ))}
      </div>
    </div>
  );

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
          onChange={(e) => setSettings({ ...settings, accent: e.target.value })}
          value={settings.accent}
        />
      </div>
      <NestedInput
        inputs={section.fonts}
        label={{ text: 'Font', htmlFor: 'settings-font-picker' }}
        className="font-field"
        selectedAttribute="font"
      />
      <NestedInput
        inputs={section.layouts}
        label={{ text: 'Layout', htmlFor: 'settings-layout-picker' }}
        className="layout-field"
        selectedAttribute="layout"
      />
      <Button
        text="Apply"
        className="apply-settings-button"
        onClick={() => onUpdateSettings({ settings })}
      />
    </DropDownContainer>
  );
}
