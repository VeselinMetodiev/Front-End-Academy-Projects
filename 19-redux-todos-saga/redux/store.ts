import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { StoreState } from './reducers';
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)));
  
  sagaMiddleware.run(rootSaga)