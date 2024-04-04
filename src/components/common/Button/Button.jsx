import './Button.css';

export default function Button({
  className = null,
  text = '',
  onclick = () => {},
  type = 'button',
  ...rest
}) {
  return (
    <button type={type} className={className} onClick={onclick} {...rest}>
      {text}
    </button>
  );
}
