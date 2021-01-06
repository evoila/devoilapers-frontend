import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'normalize.css/normalize.css';
import '@cds/core/global.css'; // pre-minified version breaks
import '@cds/city/css/bundles/default.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
