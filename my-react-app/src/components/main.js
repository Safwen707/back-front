// index.js ou App.js (fichier principal)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './Home';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
