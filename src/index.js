import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Launch from './Launch'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from "react-router-dom"
import './styles.scss'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Launch />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
