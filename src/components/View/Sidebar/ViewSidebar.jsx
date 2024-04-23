import FieldView from '../FieldView/FieldView';

export default function ViewSidebar({ sections }) {
  return (
    <div className="view-sidebar">
      {sections.map((section) => (
        <div key={section.id} className="view-sidebar-section ">
          <h2 className="view-sidebar-section-header">{section.headerText}</h2>
          {section.fields.map((field) => (
            <div key={field.id} className="view-sidebar-section-item">
              <FieldView field={field} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
