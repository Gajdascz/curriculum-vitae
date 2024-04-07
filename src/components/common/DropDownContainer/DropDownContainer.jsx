import { useState } from 'react';
import Button from '../Button/Button';
import ChevronDown from '../../icons/ChevronDown';
import './DropDownContainer.css';

const ATTS = {
  CLASSES: {
    CONTAINER: 'drop-down-container',
    HEADER: 'drop-down-container-header',
    INTERACTIVE_HEADER: 'drop-down-interactive-header',
    BUTTON: 'toggle-drop-down-button',
    CHEVRON: 'drop-down-chevron',
    ROTATE: 'rotated',
    CONTENT: 'drop-down-container-content',
    COLLAPSE: 'collapse',
    EXPAND: 'expand'
  },
  TITLES: {
    EXPAND: 'Expand content',
    COLLAPSE: 'Collapse content'
  },
  ANIMATIONS: {
    COLLAPSE: 'collapse-dropdown',
    EXPAND: 'expand-dropdown'
  },
  NONE: 'none'
};

const DIRECTIONS = {
  OPEN: 'open',
  CLOSE: 'close'
};

export default function DropDownContainer({
  children,
  containerHeaderText,
  toggle,
  className = '',
  isOpen = false,
  addToggleToHeader = false
}) {
  const nextDirection = isOpen ? DIRECTIONS.CLOSE : DIRECTIONS.OPEN;
  const [isAnimating, setIsAnimating] = useState(false);
  const handleClick = () => {
    setIsAnimating(true);
    toggle();
  };
  const handleAnimationEnd = (e) => {
    e.stopPropagation();
    setIsAnimating(false);
  };

  const headerProps = addToggleToHeader
    ? {
        onClick: handleClick,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick();
        },
        className: `${ATTS.CLASSES.HEADER} ${ATTS.CLASSES.INTERACTIVE_HEADER} ${isOpen ? 'open-menu' : ''}`,
        tabIndex: 0,
        'aria-expanded': isOpen
      }
    : { className: ATTS.CLASSES.HEADER };

  return (
    <div className={`${ATTS.CLASSES.CONTAINER} ${className}`}>
      <div {...headerProps}>
        <Button
          addDefaultStyling={false}
          text={
            <ChevronDown
              title={isOpen ? ATTS.TITLES.COLLAPSE : ATTS.TITLES.EXPAND}
              className={`${ATTS.CLASSES.CHEVRON} ${nextDirection === DIRECTIONS.CLOSE ? ATTS.CLASSES.ROTATE : ''}`}
            />
          }
          className={ATTS.CLASSES.BUTTON}
          onClick={handleClick}
          aria-expanded={isOpen}
        />
        {containerHeaderText && <h3>{containerHeaderText}</h3>}
      </div>
      <div
        className={`${ATTS.CLASSES.CONTENT} ${nextDirection === DIRECTIONS.OPEN ? ATTS.CLASSES.COLLAPSE : ATTS.CLASSES.EXPAND}`}
        style={{
          display: isAnimating || isOpen ? '' : ATTS.NONE
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </div>
  );
}
