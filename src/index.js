import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const embedTarget = document.querySelector('[data-config-wizard-type]');
const target = embedTarget || document.getElementById('config-wizard-default-root');

if (embedTarget) {
  document.documentElement.classList.add(`config-wizard-is-embed`);
} else {
  document.documentElement.classList.add(`config-wizard-not-embed`);
}

ReactDOM.render(
  <App isEmbed={!!embedTarget} />,
  target,
);
