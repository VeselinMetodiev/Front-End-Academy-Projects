import { combineReducers } from "redux";
import todo from "./todo";
import { ToDoState } from "./todo";

export interface StoreState {
    todo: ToDoState
}

export default combineReducers({ todo });