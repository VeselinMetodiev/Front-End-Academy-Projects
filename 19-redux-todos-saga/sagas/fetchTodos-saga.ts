import { call, put, StrictEffect, takeEvery, takeLatest } from "redux-saga/effects";
import { TodosAPI } from "../dao/rest-api-client";
import { Todo } from "../model/todo.model";
import { todosFetchRequested, TodosFetchRequested, todosFetchSucceeded } from "../redux/actions";
import { deleteTodo } from "./deleteTodo-saga";
import { editTodo } from "./editTodo-saga";
import { submitTodo } from "./submitTodo-saga";

export function* fetchTodos(action: TodosFetchRequested): Generator<StrictEffect, void, Todo[]> {
  try {
    const todos = yield call(TodosAPI.findAll);
    yield put(todosFetchSucceeded(todos) );
  } catch (e) {
    yield put({ type: "TODOS_FETCH_FAILED", message: e.message });
  }
}
/*
Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action. Allows concurrent fetches of user.
*/
export function* watchRequestsForTodos() {
  yield takeLatest("TODOS_FETCH_REQUESTED", fetchTodos);
  yield takeEvery("SUBMIT_TODO_START", submitTodo);
  yield takeEvery("DELETE_TODO_START", deleteTodo)
  yield takeEvery("EDIT_TODO_START", editTodo)
}

export function* initFetchTodo() {
    yield put(todosFetchRequested())
}
