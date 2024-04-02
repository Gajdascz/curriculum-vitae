import './Input.css';

export default function Input({
  type = 'text',
  label = '',
  value = '',
  labelProps = null,
  handleChange = () => {},
  ...rest
}) {
  return (
    <label {...labelProps}>
      {label}
      <input type={type} onChange={handleChange} value={value} {...rest} />
    </label>
  );
}
