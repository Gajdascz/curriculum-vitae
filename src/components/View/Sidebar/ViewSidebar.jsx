import FieldView from '../FieldView/FieldView';
import './ViewSidebar.css';
export default function ViewSidebar({ sections }) {
  return (
    <div className="view-sidebar">
      {sections.map((section) => {
        if (section.fields.length <= 0) return null;
        return (
          <div key={section.id} className="view-sidebar-section ">
            <h2 className="view-sidebar-section-header">
              {section.headerText}
            </h2>
            {section.fields.map((field) => {
              if (field.value.length <= 0) return null;
              return (
                <div key={field.id} className="view-sidebar-section-item">
                  <FieldView field={field} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
