import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { formData } from './reducers';
import RForm from './containers';
import { watchSendAsync } from './sagas';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  formData,
  composeWithDevTools(),
  applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchSendAsync);

render(
  <Provider store={store}>
    <RForm />
  </Provider>,
  document.getElementById('root'));
