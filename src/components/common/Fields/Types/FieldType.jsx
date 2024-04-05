import SelectMenu from './SelectMenu/SelectMenu';
import Input from './Input/Input';
import TextArea from './TextArea/TextArea';
import Checkbox from './Checkbox/Checkbox';

export default function FieldType({ type, className, ...rest }) {
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
}
