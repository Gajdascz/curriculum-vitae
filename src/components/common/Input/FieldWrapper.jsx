import SelectMenu from '../SelectMenu/SelectMenu';

import './FieldWrapper.css';

const FieldType = ({ type, className, ...rest }) => {
  switch (type) {
    case 'text-area':
      return <textarea {...rest} className={className} />;
    case 'select':
      return <SelectMenu {...rest} className={className} />;
    default:
      return <input type={type} {...rest} className={className} />;
  }
};

export default function FieldWrapper({
  type = 'text',
  label = '',
  id,
  className = '',
  onChange,
  ...rest
}) {
  return (
    <div className="field-wrapper">
      <label htmlFor={id}>{label}</label>
      <FieldType
        type={type}
        id={id}
        className={className}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
