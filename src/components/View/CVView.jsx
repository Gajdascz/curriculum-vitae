import { useCVAppContext } from '../../CVAppContext';
import './CVView.css';

export default function CVView() {
  const { sections } = useCVAppContext();
  const selectedSettings = sections.find(
    (section) => section.location.id === 'base'
  ).selected;
  const settingsClasses = {
    ['--accent-color']: selectedSettings.accent,
    ['--selected-font']: selectedSettings.font,
    ['--sidebar-location']: selectedSettings.layout === 'right' ? 2 : 1,
    ['gridTemplateColumns']:
      selectedSettings.layout === 'right' ? '1fr 0.5fr' : '0.5fr 1fr'
  };
  const Header = () => {
    const header = sections.find((section) => section.location.id === 'header');
    const fields = header.fields ?? [];
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
  };

  const PrimaryInfo = () => {
    const profileSection = sections.find(
      (section) => section.location.id === 'profile'
    );
    const primarySections = sections.filter(
      (section) => section.location.id === 'primary'
    );

    const EduSection = ({ section }) => {
      const rest = [];
      return section.saved.map((savedData) => {
        const { university, degree, start, end, location } =
          savedData.data.reduce((acc, field) => {
            switch (field.ref) {
              case 'university':
              case 'degree':
              case 'start':
              case 'end':
              case 'location':
                acc[field.ref] = field.value;
                break;
              default:
                rest.push(field);
            }
            return acc;
          }, {});
        return (
          <div key={savedData.id} className="view-edu-section">
            <p className="view-edu-attendance-date">
              {start} - {end}
            </p>
            <div className="view-edu-info">
              <p className="view-edu-degree">{degree}</p>
              <p className="view-edu-university">
                {university} -
                {location && (
                  <span className="view-edu-location"> {location}</span>
                )}
              </p>
            </div>
            <div className="view-edu-section-additional">
              {rest.map((data) => (
                <p key={data.id}>{data.value}</p>
              ))}
            </div>
          </div>
        );
      });
    };

    return (
      <div className="view-primary-info">
        <div className="view-profile">
          <p className="view-profile-text">
            {
              profileSection.fields.find((field) => field.ref === 'profile')
                .value
            }
          </p>
        </div>
        {primarySections.map((section) => (
          <div key={section.id} className="view-primary-info-section">
            <h2 className="view-primary-info-section-header">
              {section.headerText}
            </h2>
            {section.ref === 'edu' && <EduSection section={section} />}
            <div className="view-primary-info-item">
              <h3 className="view-primary-info-item-header"></h3>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const AdditionalInfoSidebar = () => {
    const sidebarSections = sections.filter(
      (section) => section.location.id === 'sidebar'
    );
    return (
      <div className="view-sidebar">
        {sidebarSections.map((section) => (
          <div key={section.id} className="view-sidebar-section ">
            <h2 className="view-sidebar-section-header">
              {section.headerText}
            </h2>
            {section.fields.map((field) => (
              <div key={field.id} className="view-sidebar-section-item">
                <div className="view-sidebar-item-label">{field.label}</div>
                <div className="view-sidebar-item-value">{field.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="cv-view" style={{ ...settingsClasses }}>
      <Header></Header>
      <PrimaryInfo></PrimaryInfo>
      <AdditionalInfoSidebar></AdditionalInfoSidebar>
    </section>
  );
}
