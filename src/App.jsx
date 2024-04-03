import './App.css';
import { useState } from 'react';
import CVEditors from './components/CVEditors';

export default function App() {
  const editors = ['header'];
  const [openEditor, setOpenEditor] = useState(editors);

  return (
    <main className="cv-app-container">
      <CVEditors />
      <section className="cv-view">
        <h1>Test</h1>
      </section>
    </main>
  );
}
