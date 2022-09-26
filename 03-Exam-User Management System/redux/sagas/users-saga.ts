import { apply, call, CallEffect, Effect, put, StrictEffect, take, takeLatest } from 'redux-saga/effects';
import { UsersAPI } from '../../api/rest-api-client';
import { User } from '../../model/user';
import { AuthAPI } from '../../service/rest-api-auth-client';
import { fetchUsersStart, fetchUsersSuccess, LoginStart, loginStart, loginSuccess, LoginSuccess } from '../actions/actions';

export function* initSaga(): Generator<StrictEffect, void, Effect> {
    yield put(fetchUsersStart());
}

export function* watchGetUsers(): Generator<StrictEffect, void, User[]> {
    yield call(fetchUsersStart);
    const users = yield apply(UsersAPI, UsersAPI.findAll, []);
    console.log(users)
    yield put(fetchUsersSuccess(users))
}

export function* watchSignInStart(): Generator<StrictEffect, void, User[]> {
    yield takeLatest("LOGIN_START", doLogin);
    
}

export function* doLogin(loginAction: LoginStart): Generator<StrictEffect, any, any> {
    const loggedUserData = yield apply(AuthAPI, AuthAPI.signIn, [loginAction.credentials]);
    yield put(loginSuccess(loggedUserData))
}
