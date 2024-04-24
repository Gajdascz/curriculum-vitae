import './ViewHeader.css';
export default function ViewHeader({ fields }) {
  return (
    <div className="view-header">
      <h1 className="view-header-name">
        {fields.find((field) => field.ref === 'name').value}
      </h1>
      <h2 className="view-header-title">
        {fields.find((field) => field.ref === 'title').value}
      </h2>
      <h3 className="view-header-other">
        {fields.find((field) => field.ref === 'other').value}
      </h3>
    </div>
  );
}
