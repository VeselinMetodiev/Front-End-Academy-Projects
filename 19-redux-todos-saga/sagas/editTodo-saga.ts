import { call, put, StrictEffect, takeEvery, takeLatest } from "redux-saga/effects";
import { TodosAPI } from "../dao/rest-api-client";
import { Todo } from "../model/todo.model";
import { EditTodoStart, editTodoSucceeded, submitTodoSucceeded } from "../redux/actions";

export function* editTodo(action: EditTodoStart): Generator<StrictEffect, void, Todo> {
    try {
      const updatedTodo = yield call(TodosAPI.update, action.todo);
      yield put(editTodoSucceeded(updatedTodo));
    } catch (e) {
      yield put({ type: "EDIT_TODO_FAILED", message: e.message });
    }
  }