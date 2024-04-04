import './Input.css';

export default function Input({ type, className, ...rest }) {
  return <input type={type} {...rest} className={className} />;
}
