import './Button.css';

export default function Button({
  className = null,
  text = '',
  onClick = () => {},
  type = 'button',
  ...rest
}) {
  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {text}
    </button>
  );
}
