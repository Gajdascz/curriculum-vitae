import SelectMenu from './Types/SelectMenu/SelectMenu';
import Input from './Types/Input/Input';
import TextArea from './Types/TextArea/TextArea';
import Checkbox from './Types/Checkbox/Checkbox';
import './FieldWrapper.css';
import Button from '../Button/Button';

const FieldType = ({ type, className, ...rest }) => {
  switch (type) {
    case 'text-area':
      return <TextArea {...rest} className={className} />;
    case 'select':
      return <SelectMenu {...rest} className={className} />;
    case 'checkbox':
      return <Checkbox></Checkbox>;
    case 'visual':
      return <div></div>;
    default:
      return <Input type={type} {...rest} className={className} />;
  }
};

const DraggableField = ({ type, className, ...rest }) => {
  <div className="draggable-field">
    <div className="drag-handle">|||</div>
    <FieldType type={type} className={className} {...rest} />;
    <Button className="delete-field-button" onclick={onclick}></Button>
  </div>;
};

export default function FieldWrapper({
  type = 'text',
  label = '',
  id,
  onChange,
  className = null,
  children,
  ...rest
}) {
  return (
    <div className="field-wrapper">
      <label htmlFor={id}>{label}</label>
      <FieldType
        type={type}
        id={id}
        className={`${className} field-input`}
        onChange={onChange}
        {...rest}
      />
      {children}
    </div>
  );
}
