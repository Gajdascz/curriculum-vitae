export default function FieldView({ field }) {
  switch (field.type) {
    case 'list':
      return (
        <div className="view-list">
          {field.label && <p className="view-list-label">{field.label}</p>}
          <div className="view-list-item-container">
            {field.value
              .split('\n')
              .filter((item) => item.trim() !== '')
              .map((item, index) => (
                <div key={index} className="view-list-item">
                  &bull; {item}
                </div>
              ))}
          </div>
        </div>
      );
    default:
      return (
        <p
          key={field.id}
          className={`view-text-field${field.bold ? ' bold' : ''}`}
        >
          {field.label && !field.hideViewLabel && (
            <span className="view-text-field-label">{field.label}: </span>
          )}
          <span className="view-text-field-value">{field.value}</span>
        </p>
      );
  }
}
