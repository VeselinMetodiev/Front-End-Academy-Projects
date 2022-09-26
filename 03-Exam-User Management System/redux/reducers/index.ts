import users, { UsersState } from './users';
import { combineReducers } from "redux";

export interface StoreState {
    users: UsersState
}

export default combineReducers({ users });