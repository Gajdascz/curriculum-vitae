import './App.css';
import CVAppProvider from './CVAppProvider';
import CVView from './components/View/CVView';
import CVEditors from './components/Editors/CVEditors';

export default function App() {
  return (
    <CVAppProvider>
      <main className="cv-app-container">
        <CVEditors />
        <CVView />
      </main>
    </CVAppProvider>
  );
}
