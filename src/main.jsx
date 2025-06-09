import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';  // ✅ HashRouter use kiya hai
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>  {/* ✅ Yeh change */}
      <App />
    </HashRouter>
  </React.StrictMode>
);
