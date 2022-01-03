import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  store  from './js/Store';
import './index.css';
import App from './App';
 import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
ReactDOM.render(
  <Provider store={store}>
    
    <App />
  </Provider>,
  document.getElementById('root')
);
