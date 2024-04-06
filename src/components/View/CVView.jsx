import { useCVAppContext } from '../../CVAppContext';
import './CVView.css';

export default function CVView() {
  const { sections } = useCVAppContext();

  const Header = () => {
    const header = sections.find((section) => section.headerText === 'Header');
    const fields = header.fields ?? [];
    return (
      <div className="view-header">
        <h1 className="view-header-name">
          {fields.find((field) => field.label === 'Name').value}
        </h1>
        <h2 className="view-header-title">
          {fields.find((field) => field.label === 'Title').value}
        </h2>
        {fields
          .filter((field) => !['Name', 'Title'].includes(field.label))
          ?.map((field) => (
            <h3 key={field.id} className={`view-header-additional`}>
              {field.value}
            </h3>
          ))}
      </div>
    );
  };

  const AdditionalInfoSidebar = () => {
    return <div className="view-additional-info-sidebar"></div>;
  };

  const Profile = () => {
    return (
      <div className="view-profile">
        <span className="profile-first-word"></span>
      </div>
    );
  };

  return (
    <section className="cv-view">
      <Header></Header>
      <AdditionalInfoSidebar></AdditionalInfoSidebar>
    </section>
  );
}
