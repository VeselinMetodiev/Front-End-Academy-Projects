
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import todosSlice from '../todos-slice';

const rootReducer = combineReducers({ todos });

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: todosSlice,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk : false}).map(mw => { console.log(mw); return mw; }).concat(sagaMiddleware);
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;