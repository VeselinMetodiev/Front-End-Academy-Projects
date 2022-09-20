import { call, put, StrictEffect, takeEvery, takeLatest } from "redux-saga/effects";
import { TodosAPI } from "../dao/rest-api-client";
import { Todo } from "../model/todo.model";
import { SubmitTodoStart, submitTodoSucceeded } from "../redux/actions";

export function* submitTodo(action: SubmitTodoStart): Generator<StrictEffect, void, Todo> {
    try {
      const createdTodo = yield call(TodosAPI.create, action.todo);
      yield put(submitTodoSucceeded(createdTodo));
    } catch (e) {
      yield put({ type: "SUBMIT_TODO_FAILED", message: e.message });
    }
  }