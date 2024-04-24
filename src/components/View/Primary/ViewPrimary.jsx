import FieldView from '../FieldView/FieldView';
import './ViewPrimary.css';

const PrimarySubsectionHeader = ({ info }) => (
  <div className="view-primary-subsection-header">
    <div className="view-primary-subsection-header-info">
      <span className="view-primary-subsection-header-primary">
        {info.primary}
      </span>
      {info.secondary && (
        <span className="view-primary-subsection-header-secondary">
          , <br /> {info.secondary}
        </span>
      )}
    </div>
    {info.date && (
      <span className="view-primary-subsection-header-date">{info.date}</span>
    )}
  </div>
);

const parseFieldData = ({ fields }) => {
  const rest = [];
  const headerData = fields.reduce((acc, field) => {
    switch (field.inHeader) {
      case undefined:
        rest.push(field);
        break;
      case 'primary':
        acc.primary = field.value;
        break;
      case 'secondary':
        acc.secondary = field.value;
        break;
      case 'date':
        acc.date = field.value;
        break;
      default:
        rest.push(field);
    }
    return acc;
  }, {});
  return { headerData, rest };
};

const SubSection = ({ fields }) => {
  const { headerData, rest } = parseFieldData({ fields });
  return (
    <div className="view-primary-subsection">
      <div className="view-primary-subsection-info">
        {headerData.primary && (
          <PrimarySubsectionHeader
            info={{
              primary: headerData.primary,
              secondary: headerData.secondary,
              date: headerData.date
            }}
          />
        )}
        <div className="view-primary-subsection-additional">
          {rest.map((field) => (
            <FieldView key={field.id} field={field} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default function ViewPrimary({ profile, primary }) {
  return (
    <div className="view-primary-info">
      <div className="view-profile">
        <p className="view-profile-text">
          {profile.fields.find((field) => field.ref === 'profile').value}
        </p>
      </div>
      {primary.map((section) => (
        <div key={section.id} className="view-primary-info-section">
          <h2 className="view-primary-info-section-header">
            {section.headerText}
          </h2>
          {section.saved ? (
            section.saved.map((savedSection) => (
              <SubSection key={savedSection.id} fields={savedSection.data} />
            ))
          ) : (
            <SubSection fields={section.fields} />
          )}
        </div>
      ))}
    </div>
  );
}
