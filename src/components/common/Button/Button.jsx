import './Button.css';

export default function Button({
  className = null,
  addDefaultStyling = true,
  text = '',
  onClick = () => {},
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`${className}${addDefaultStyling ? ` default-button` : ''}`}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}
