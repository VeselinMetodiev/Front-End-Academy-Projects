import {all, fork} from 'redux-saga/effects';
import {initFetchTodo, watchRequestsForTodos} from './fetchTodos-saga'

export const rootSaga = function* root() {
    yield all([fork(watchRequestsForTodos), fork(initFetchTodo)])
}

