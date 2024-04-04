import Button from '../common/Button/Button';
import Cogs from '../icons/Gears';
import './IndexHeader.css';
export default function IndexHeader() {
  return (
    <header className="index-header">
      <h1 className="app-name">CV Builder</h1>
      <Button
        className="settings-button"
        text={<Cogs title="settings" className="settings-icon" />}
      ></Button>
    </header>
  );
}
