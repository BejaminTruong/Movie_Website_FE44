import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './redux/reducers/rootReducer';
import thunk from 'redux-thunk'
import "./index.css"

const store = createStore(rootReducer,applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
