import { Todo } from '../model/todo.model';
import { ADD_TODO, DELETE_TODO } from './actionTypes';

export interface AddToDo {
    type: ADD_TODO;
    payload: Todo;
}

export interface DeleteToDo {
    type: DELETE_TODO;
    payload: number
}

export type ToDoAction = AddToDo | DeleteToDo


export function AddToDo(todo: Todo): AddToDo {
    return {
        type: ADD_TODO,
        payload: todo,
    };
}

export function DeleteTodo(todo: Todo): DeleteToDo {
    return {
        type: DELETE_TODO,
        payload: todo.id!,
    };
}
