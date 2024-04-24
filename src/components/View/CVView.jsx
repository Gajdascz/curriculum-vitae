import { useCVAppContext } from '../../contexts/CVAppContext';
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
      selectedSettings.layout === 'right' ? '1fr 0.5fr' : '0.5fr 1fr',
    ['--print-margin']:
      selectedSettings.layout === 'right' ? '1cm 0 1cm 1cm' : '1cm 1cm 1cm 0'
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
