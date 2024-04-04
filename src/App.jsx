import './App.css';
import CVAppProvider from './CVAppProvider';
import CVView from './components/View/CVView';
import CVEditors from './components/CVEditors';

export default function App() {
  return (
    <CVAppProvider>
      <main className="cv-app-container">
        <CVEditors />
        <CVView>
          <h1>Test</h1>
        </CVView>
      </main>
    </CVAppProvider>
  );
}
