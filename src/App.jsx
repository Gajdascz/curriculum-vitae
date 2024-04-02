import HeaderEditor from './components/HeaderEditor';
import './App.css';

export default function App() {
  return (
    <main className="cv-app-container">
      <section className="cv-editors">
        <HeaderEditor></HeaderEditor>
      </section>
      <section className="cv-view">
        <h1>Test</h1>
      </section>
    </main>
  );
}
