import { useCVAppContext } from '../../CVAppContext';
import ViewHeader from './Header/ViewHeader';
import ViewSidebar from './Sidebar/ViewSidebar';
import ViewPrimary from './Primary/ViewPrimary';
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
    ['--sidebar-left-padding']:
      selectedSettings.layout === 'right' ? '0.5em' : '0',
    ['--sidebar-right-padding']:
      selectedSettings.layout === 'right' ? '0' : '0.5em',
    ['gridTemplateColumns']:
      selectedSettings.layout === 'right' ? '1fr 0.5fr' : '0.5fr 1fr'
  };

  const List = ({ field }) => {
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
  };

  const Text = ({ field, colon = true }) => (
    <p key={field.id} className="view-text-field">
      {field.label && (
        <span className="view-text-field-label">
          {field.label}
          {colon ? `: ` : ''}
        </span>
      )}
      <span className="view-text-field-value">{field.value}</span>
    </p>
  );

  const PrimarySubsectionHeader = ({ info }) => (
    <div className="view-primary-subsection-header">
      <div className="view-primary-subsection-header-info">
        <span className="view-primary-subsection-header-primary">
          {info.primary}
        </span>
        {info.secondary && (
          <span className="view-primary-subsection-header-secondary">
            , {info.secondary}
          </span>
        )}
      </div>
      {info.date && (
        <span className="view-primary-subsection-header-date">{info.date}</span>
      )}
    </div>
  );
  const PrimaryInfo = () => {
    const profileSection = sections.find(
      (section) => section.location.id === 'profile'
    );
    const primarySections = sections.filter(
      (section) => section.location.id === 'primary'
    );

    const EduSection = ({ section }) => {
      return section.saved.map((savedData) => {
        const rest = [];
        const { university, degree, degreeSecondary, date } =
          savedData.data.reduce((acc, field) => {
            switch (field.ref) {
              case 'university':
              case 'degree':
              case 'degreeSecondary':
              case 'date':
                acc[field.ref] = field.value;
                break;
              default:
                rest.push(field);
            }
            return acc;
          }, {});

        return (
          <div key={savedData.id} className="view-edu-section">
            <div className="view-edu-info">
              <PrimarySubsectionHeader
                info={{
                  primary: degree,
                  secondary: degreeSecondary,
                  date: date
                }}
              />
              <p className="bold">{university}</p>
              <div className="view-edu-section-additional">
                {rest.map((field) => {
                  if (field.type === 'list')
                    return <List key={field.id} field={field} />;
                  else return <Text key={field.id} field={field} />;
                })}
              </div>
            </div>
          </div>
        );
      });
    };

    const ExpSection = ({ section }) => {
      return section.saved.map((savedData) => {
        const rest = [];
        const { position, employer, date } = savedData.data.reduce(
          (acc, field) => {
            switch (field.ref) {
              case 'position':
              case 'employer':
              case 'date':
                acc[field.ref] = field.value;
                break;
              default:
                rest.push(field);
            }
            return acc;
          },
          {}
        );

        return (
          <div key={savedData.id} className="view-exp-section">
            <div className="view-exp-info">
              <PrimarySubsectionHeader
                info={{
                  primary: position,
                  secondary: employer,
                  date: date
                }}
              />
              <div className="view-exp-section-additional">
                {rest.map((field) => {
                  if (field.type === 'list')
                    return <List key={field.id} field={field} />;
                  else return <Text key={field.id} field={field} />;
                })}
              </div>
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
            {section.ref === 'exp' && <ExpSection section={section} />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="cv-view" style={{ ...settingsClasses }}>
      <ViewHeader
        fields={
          sections.find((section) => section.location.id === 'header').fields
        }
      />
      <ViewPrimary
        profile={sections.find((section) => section.location.id === 'profile')}
        primary={sections.filter(
          (section) => section.location.id === 'primary'
        )}
      />
      <ViewSidebar
        sections={sections.filter(
          (section) => section.location.id === 'sidebar'
        )}
      />
    </section>
  );
}
