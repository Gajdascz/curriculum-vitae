import Button from '../../common/Button/Button';
import './UtilButtons.css';
export default function UtilButtons({ onSave, onLoadTemplate }) {
  return (
    <div className="cv-editors-util-sections">
      <div className="util-section-wrapper">
        <div className="util-section-buttons">
          <Button text="Save" onClick={onSave} />
          <Button
            text="Clear"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          />
          <Button text="Print" onClick={() => window.print()} />
          <Button text="Template" onClick={() => onLoadTemplate()} />
        </div>
      </div>
    </div>
  );
}
