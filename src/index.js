import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { App } from './components/App';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);