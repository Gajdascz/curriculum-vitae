import SelectMenu from './Types/SelectMenu/SelectMenu';
import Input from './Types/Input/Input';
import TextArea from './Types/TextArea/TextArea';
import Checkbox from './Types/Checkbox/Checkbox';
import './FieldWrapper.css';

const FieldType = ({ type, className, ...rest }) => {
  switch (type) {
    case 'text-area':
      return <TextArea {...rest} className={className} />;
    case 'select':
      return <SelectMenu {...rest} className={className} />;
    case 'checkbox':
      return <Checkbox></Checkbox>;
    default:
      return <Input type={type} {...rest} className={className} />;
  }
};

export default function FieldWrapper({
  type = 'text',
  label = '',
  id,
  className = null,
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
