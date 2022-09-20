import { Todo, TodoStatus } from '../model/todo.model';
import { DELETE_TODO_START, TODOS_FETCH_REQUESTED, TODOS_FETCH_SUCCEEDED, TODOS_FETCH_FAILED, SUBMIT_TODO_SUCCEEDED, SUBMIT_TODO_FAILED, SUBMIT_TODO_START, DELETE_TODO_FAILED, DELETE_TODO_SUCCEEDED, EDIT_TODO_START, EDIT_TODO_SUCCEEDED, EDIT_TODO_FAILED } from './actionTypes';

export interface SubmitTodoStart {
    type: SUBMIT_TODO_START;
    todo: Todo
}

export interface SubmitTodoSucceeded {
    type: SUBMIT_TODO_SUCCEEDED;
    todo: Todo;
}

export interface SubmitTodoFailed {
    type: SUBMIT_TODO_FAILED;
    message: string;
}

export interface EditTodoStart {
    type: EDIT_TODO_START;
    todo: Todo;
}

export interface EditTodoSucceeded {
    type: EDIT_TODO_SUCCEEDED;
    todo: Todo;
}

export interface EditTodoFailed {
    type: EDIT_TODO_FAILED;
    message: string;
}

export interface DeleteTodoStart {
    type: DELETE_TODO_START;
    id: number;
}

export interface DeleteTodoSucceeded {
    type: DELETE_TODO_SUCCEEDED;
    id: number;
}

export interface DeleteTodoFailed {
    type: DELETE_TODO_FAILED;
    message: string;
}

export interface TodosFetchRequested {
    type: TODOS_FETCH_REQUESTED;
}

export interface TodosFetchSucceeded {
    type: TODOS_FETCH_SUCCEEDED;
    todos: Todo[];
}

export interface TodosFetchFailed {
    type: TODOS_FETCH_FAILED;
    message: string
}

export type TodosAction = SubmitTodoStart | SubmitTodoSucceeded | SubmitTodoFailed | EditTodoStart | EditTodoFailed | EditTodoSucceeded | DeleteTodoStart | DeleteTodoFailed | DeleteTodoSucceeded | TodosFetchFailed | TodosFetchSucceeded | TodosFetchRequested;

//Action creators
export function submitTodoStart(todo: Todo): SubmitTodoStart {
    return {
        type: SUBMIT_TODO_START,
        todo: todo,
    };
}

export function submitTodoSucceeded(todo: Todo): SubmitTodoSucceeded {
    return {
        type: SUBMIT_TODO_SUCCEEDED,
        todo: todo,
    };
}

export function submitTodoFailed(message: string): SubmitTodoFailed {
    return {
        type: SUBMIT_TODO_FAILED,
        message: message,
    };
}

export function editTodoStart(todo: Todo): EditTodoStart {
    return {
        type: 'EDIT_TODO_START',
        todo: todo,
    };
}

export function editTodoSucceeded(todo: Todo): EditTodoSucceeded {
    return {
        type: 'EDIT_TODO_SUCCEEDED',
        todo: todo,
    };
}

export function EditTodoFailed(message: string): EditTodoFailed {
    return {
        type: 'EDIT_TODO_FAILED',
        message: message,
    };
}

export function deleteTodoStart(id: number): DeleteTodoStart {
    return {
        type: DELETE_TODO_START,
        id
    };
}

export function deleteTodoSucceeded(id: number): DeleteTodoSucceeded {
    return {
        type: DELETE_TODO_SUCCEEDED,
        id
    };
}

export function deleteTodoFailed(message: string): DeleteTodoFailed {
    return {
        type: DELETE_TODO_FAILED,
        message
    };
}
    
export function todosFetchRequested() : TodosFetchRequested {
        return {
            type: TODOS_FETCH_REQUESTED
        }
    }

export function todosFetchSucceeded(todos: Todo[]) : TodosFetchSucceeded {
        return {
            type: TODOS_FETCH_SUCCEEDED,
            todos,
        }
    }

export function todosFetchFailed(message: string) : TodosFetchFailed {
        return {
            type: TODOS_FETCH_FAILED,
            message,
        }
    }
