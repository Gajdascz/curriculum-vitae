import { useCVAppContext } from '../../CVAppContext';
import './CVView.css';

export default function CVView() {
  const { sections } = useCVAppContext();
  const fields = sections[0].fields;

  const Header = () => {
    const fields = sections[0].fields;
    return (
      <div className="view-header">
        <h1 className="view-header-name">
          {fields.find((field) => field.label === 'Name').value}
        </h1>
        <h2 className="view-header-title">
          {fields.find((field) => field.label === 'Title').value}
        </h2>
      </div>
    );
  };

  const AdditionalInfoSidebar = () => {
    return (
      <div className="view-additional-info-sidebar">
        <p>Test</p>
      </div>
    );
  };

  const Profile = () => {
    return <div className=""></div>;
  };

  return (
    <section className="cv-view">
      <Header></Header>
      <AdditionalInfoSidebar></AdditionalInfoSidebar>
    </section>
  );
}
