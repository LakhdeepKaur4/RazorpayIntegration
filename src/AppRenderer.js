import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import App from "./App";
import promise from 'redux-promise'; 
import reducers from './redux/reducers'
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';

// ReactDOM.render(
//   <Provider store={configureStore()}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
const store = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={store(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
