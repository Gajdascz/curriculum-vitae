import { useState } from 'react';
import Button from '../Button/Button';
import Help from '../Icons/Help';
import LightBulb from '../Icons/LightBulb';
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
          onClick={() => {
            if (theme === 'light') {
              setTheme('dark');
              document.documentElement.classList.remove('light-theme');
            } else {
              setTheme('light');
              document.documentElement.classList.add('light-theme');
            }
          }}
        />
        <a
          className="help-button header-icon-button"
          href="https://github.com/Gajdascz/curriculum-vitae-builder?tab=readme-ov-file#guide"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Help title="Help" className="help-icon header-icon" />
        </a>
      </div>
    </header>
  );
}
