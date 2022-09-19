import { Todo } from '../../model/todo.model';
import { DeleteTodo, ToDoAction } from '../actions';
import { ADD_TODO, DELETE_TODO } from '../actionTypes';

export interface ToDoState {
    todoList: Todo[];
}

const initialState: ToDoState = {
    todoList: [],
};

export default function todoReducer(state = initialState, action: ToDoAction) {
    switch (action.type) {
        case ADD_TODO: {
            return {
                ...state,
                todoList: state.todoList.concat(action.payload),
            };
        }
        case DELETE_TODO: {
            return {
                ...state,
                todoList: state.todoList.filter((todo) => todo.id !== action.payload),
            };
        }
        default:
            return state;
    }
}