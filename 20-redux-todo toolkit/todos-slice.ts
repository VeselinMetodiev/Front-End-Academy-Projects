import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./model/todo.model";
import { DeleteTodo } from "./redux/actions";

interface TodosState {
    todos: Todo[],
    editedTodo: Todo | undefined,
}

const initialState: TodosState = {
    todos: [],
    editedTodo: undefined,
}

let NEXT_TODO_ID = 0;

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        submitTodo(state, action: PayloadAction<Todo>) {
            const todo = action.payload;
            if(todo.id){
                state.todos = state.todos.map(td => td.id === todo.id ? todo : td)
            } else {
                state.todos.push({...todo, id: ++NEXT_TODO_ID})
            }
        },
        editTodo(state, action: PayloadAction<Todo>) {
            state.editedTodo = action.payload;
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(td => td.id !== action.payload)
        }
    }
})

export const {submitTodo, editTodo, deleteTodo} = todosSlice.actions;
export default todosSlice.reducer;