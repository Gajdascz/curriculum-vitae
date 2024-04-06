import Button from '../../common/Button/Button';
import './UtilButtons.css';
export default function UtilButtons({ onSave }) {
  return (
    <div className="cv-editors-util-sections">
      <div className="util-section-wrapper">
        <h3 className="util-section-header">Memory</h3>
        <div className="util-section-buttons">
          <Button text="Save" onClick={onSave} />
          <Button text="Clear" onClick={() => localStorage.clear()} />
        </div>
      </div>
      <div className="util-section-wrapper">
        <h3 className="util-section-header">Export</h3>
        <div className="util-section-buttons">
          <Button text="PDF" />
          <Button text="HTML" />
        </div>
      </div>
      <div className="util-section-wrapper">
        <h3 className="util-section-header">Print</h3>
        <div className="util-section-buttons">
          <Button text="Preview" />
          <Button text="Start" />
        </div>
      </div>
    </div>
  );
}
