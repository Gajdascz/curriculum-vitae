import './Button.css';

export default function Button({
  className = null,
  text = '',
  handleClick = () => {},
  type = 'button',
  ...rest
}) {
  return (
    <button type={type} className={className} onClick={handleClick} {...rest}>
      {text}
    </button>
  );
}
