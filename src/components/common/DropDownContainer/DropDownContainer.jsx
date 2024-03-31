import { useState } from 'react';
import Button from '../Button';
import ChevronDown from '../../icons/ChevronDown';
import './DropDownContainer.css';

export default function DropDownContainer({ children, containerHeaderText }) {
  const [status, setStatus] = useState({
    open: false,
    closed: true,
    animating: false
  });
  return (
    <div className="container drop-down-container">
      <div className="drop-down-container-header">
        <Button
          text={
            <ChevronDown
              title={status.open ? 'Collapse content' : 'Expand content'}
              className={`drop-down-chevron ${status.open ? 'rotated' : ''}`}
            />
          }
          className="toggle-content-button"
          handleClick={() => setStatus({ ...status, animating: true })}
        />
        {containerHeaderText && <h3>{containerHeaderText}</h3>}
      </div>
      <div
        className={`drop-down-container-content ${!status.animating ? '' : status.open ? 'collapse' : 'expand'}`}
        style={{ display: status.animating || status.open ? '' : 'none' }}
        onAnimationEnd={(e) => {
          const statusStrategy = {
            ['collapse-dropdown']: () =>
              setStatus({ animating: false, closed: true, open: false }),
            ['expand-dropdown']: () =>
              setStatus({ animating: false, closed: false, open: true })
          };
          statusStrategy[e.animationName]();
        }}
      >
        {children}
      </div>
    </div>
  );
}
