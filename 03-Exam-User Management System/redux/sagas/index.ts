
import {all, fork} from 'redux-saga/effects';
import { watchGetUsers, watchSignInStart } from './users-saga';

export const rootSaga = function* root() {
    yield all([fork(watchGetUsers), fork(watchSignInStart)])
}