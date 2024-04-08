import { useState } from 'react';
import Button from '../common/Button/Button';
import Help from '../icons/Help';
import LightBulb from '../icons/LightBulb';
import './IndexHeader.css';

export default function IndexHeader() {
  const [theme, setTheme] = useState('dark');
  return (
    <header className="index-header">
      <h1 className="app-name">CV Builder</h1>
      <div className="header-buttons-container">
        <Button
          className={`theme-toggle-button header-icon-button ${theme}-active`}
          addDefaultStyling={false}
          text={
            <LightBulb
              title="Toggle theme"
              className={`header-icon theme-icon`}
            />
          }
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <Button
          className="help-button header-icon-button"
          addDefaultStyling={false}
          text={<Help title="Help" className="help-icon header-icon" />}
        />
      </div>
    </header>
  );
}
