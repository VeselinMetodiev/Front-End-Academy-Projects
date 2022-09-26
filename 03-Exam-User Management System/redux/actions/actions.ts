import { Credentials } from "../../model/credentials";
import { LoggedUserData } from "../../model/sign-in";
import { User } from "../../model/user";
import { FETCH_USERS_START, FETCH_USERS_SUCCESS, LOGIN_START, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_SUCCESS, SIGN_OUT } from "./actionTypes";

export interface FetchUsersStart {
    type: FETCH_USERS_START;
}

export interface FetchUsersSuccess {
    type: FETCH_USERS_SUCCESS;
    users: User[];
}

export interface LoginStart {
    type: LOGIN_START;
    credentials: Credentials;
}

export interface LoginSuccess {
    type: LOGIN_SUCCESS;
    loggedUser: LoggedUserData;
}

export interface SignUpStart {
    type: SIGNUP_START;
}

export interface SignUpSuccess {
    type: SIGNUP_SUCCESS;
    user: User;
}

export interface SignOut {
    type: SIGN_OUT;
}

export type UserAction = LoginStart | LoginSuccess | SignUpStart | SignUpSuccess | SignOut | FetchUsersStart | FetchUsersSuccess;

// Functions 

export function fetchUsersStart(): FetchUsersStart {
    return {
        type: FETCH_USERS_START,
    };
}

export function fetchUsersSuccess(users: User[]): FetchUsersSuccess {
    return {
        type: FETCH_USERS_SUCCESS,
        users: users,
    };
}

export function loginStart(credentials: Credentials): LoginStart {
    return {
        type: LOGIN_START,
        credentials: credentials,
    };
}

export function loginSuccess(userData: LoggedUserData): LoginSuccess {
    return {
        type: LOGIN_SUCCESS,
        loggedUser: userData
    };
}

export function signUpStart(): SignUpStart {
    return {
        type: SIGNUP_START,
    };
}

export function signUpSuccess(user: User): SignUpSuccess {
    return {
        type: SIGNUP_SUCCESS,
        user: user
    };
}

export function signOut(): SignOut {
    return {
        type: SIGN_OUT,
    };
}