export default function Button({
  className = null,
  text = '',
  handleClick = () => {},
  ...rest
}) {
  return (
    <button className={className} onClick={handleClick} {...rest}>
      {text}
    </button>
  );
}
