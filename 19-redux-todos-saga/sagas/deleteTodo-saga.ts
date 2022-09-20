import { call, put, StrictEffect, takeEvery, takeLatest } from "redux-saga/effects";
import { TodosAPI } from "../dao/rest-api-client";
import { Todo } from "../model/todo.model";
import { DeleteTodoStart, deleteTodoSucceeded, SubmitTodoStart, submitTodoSucceeded } from "../redux/actions";

export function* deleteTodo(action: DeleteTodoStart): Generator<StrictEffect, void, Todo> {
    try {
        console.log(action.id)
      const deletedTodo = yield call(TodosAPI.deleteById, action.id);
      yield put(deleteTodoSucceeded(action.id));
    } catch (e) {
      yield put({ type: "DELETE_TODO_FAILED", message: e.message });
    }
  }