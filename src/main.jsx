import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import IndexHeader from './components/Index/IndexHeader.jsx';
import './styles/index.css';
import IndexFooter from './components/Index/IndexFooter.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IndexHeader />
    <App />
    <IndexFooter />
  </React.StrictMode>
);
