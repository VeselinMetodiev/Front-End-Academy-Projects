import { DELETE_TODO_FAILED, DELETE_TODO_START, DELETE_TODO_SUCCEEDED, EDIT_TODO_FAILED, EDIT_TODO_START, EDIT_TODO_SUCCEEDED, SUBMIT_TODO_FAILED, SUBMIT_TODO_START, SUBMIT_TODO_SUCCEEDED, TODOS_FETCH_FAILED, TODOS_FETCH_REQUESTED, TODOS_FETCH_SUCCEEDED } from './../actionTypes';
import { } from '../actionTypes';
import { TodosAction, todosFetchRequested } from '../actions';
import { Todo } from '../../model/todo.model';

export type TodosState = {
    todos:Todo[],
    editedTodo: Todo | undefined,
    isLoading: boolean,
    error: string
}

const initialState: TodosState = {
    todos: [],
    editedTodo: undefined,
    isLoading: false,
    error: ''
}
    
let NEXT_TODO_ID = 0;

export default function (state = initialState, action: TodosAction) {
    switch (action.type) {
        case SUBMIT_TODO_START: {
            return {
                ...state,
                isLoading: true,
            }
            
        }
        case SUBMIT_TODO_SUCCEEDED: {
                return {
                    ...state,
                    isLoading: false,
                    error: '',
                    todos: state.todos.concat(action.todo)
                }
        }
        case SUBMIT_TODO_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.message,
            }
        }
        case EDIT_TODO_START: {
            return {
                ...state,
                error: '',
                isLoading: true
            }
        }
        case EDIT_TODO_SUCCEEDED: {
            return {
                ...state,
                editedTodo: action.todo,
                isLoading: false,
                error: '',
            }
        }
        case EDIT_TODO_FAILED: {
            return {
                ...state,
               error: action.message,
               isLoading: false
            }
        }
        case DELETE_TODO_START: {
            return  {
                ...state,
                error: '',
                isLoading: false,
            }
        }
        case DELETE_TODO_SUCCEEDED: {
            return  {
                ...state,
                todos: state.todos.filter(td => td.id !== action.id),
                error: '',
                isLoading: true,
            }
        }
        case DELETE_TODO_FAILED: {
            return  {
                ...state,
                error: action.message,
                isLoading: false,
            }
        }
        case TODOS_FETCH_REQUESTED: {
            return {
                ...state,
            }
        }
        case TODOS_FETCH_SUCCEEDED: {
            return {
                ...state,
                todos: action.todos,
            }
        }
        case TODOS_FETCH_FAILED: {
            return {
                ...state,
            }
        }
        default:
            return state;
    }
}