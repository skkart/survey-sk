// This is starting point of file, To bootup react app and redux stores
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; // provider is a component that makes the store accessinle to all cmpt in app
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import axois from 'axios';
window.axios = axois;


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root')
);
