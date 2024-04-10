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

  const AdditionalInfoSidebar = () => {
    const sidebarSections = sections.find(
      (section) => section.location.id === 'sidebar'
    );
    return <div className="view-additional-info-sidebar"></div>;
  };

  const PrimaryInfo = () => (
    <div>
      <div className="view-profile">
        <p className="view-profile-text">
          {
            sections
              .find((section) => section.location.id === 'profile')
              .fields.find((field) => field.ref === 'profile').value
          }
        </p>
      </div>
    </div>
  );

  return (
    <section className="cv-view" style={{ ...settingsClasses }}>
      <Header></Header>
      <PrimaryInfo></PrimaryInfo>
      <AdditionalInfoSidebar></AdditionalInfoSidebar>
    </section>
  );
}
