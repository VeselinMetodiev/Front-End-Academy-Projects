import React, { Component, useCallback, useState } from 'react';
import { Todo } from './todo.model';
import { TodoListener } from './TodoApp';

interface TodoInputProps {
    onCreateTodo: TodoListener
}

interface TodoInputState {
    text: string;
    date: string;
}

const initialState = {
    text: '',
    date: new Date().toISOString()
}

function TodoInputFunction({onCreateTodo} : TodoInputProps) {
    const [todoFields, setTodoFields] = useState(initialState)
    
    const handleTodoSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            onCreateTodo(new Todo(todoFields.text, new Date(todoFields.date).toDateString()));
            setTodoFields(initialState);
        }, [onCreateTodo, todoFields.text, todoFields.date]
        );

    function handleTextChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.name as keyof TodoInputState & string;
        const stateUpdate = {[fieldName]: event.target.value} as unknown as TodoInputState;
        setTodoFields((oldFields :TodoInputState) => ({...oldFields, ...stateUpdate}));
        // setTodoFields((oldFields :TodoInputState) => Object.assign({}, oldFields, stateUpdate));
    }

    function handletodoReset(event: React.MouseEvent){
        event.preventDefault();
        setTodoFields(initialState)
    }

        return (
            <form className="TodoInput-form" onSubmit={handleTodoSubmit}>
                <label htmlFor="TodoInput-todo-text">What to do next?</label>
                <input type="text" id="TodoInput-todo-text" name="text" value={todoFields.text}
                    onChange={handleTextChanged} />
                <input type="date" id="TodoInput-todo-text" name="date" value={todoFields.date}
                    onChange={handleTextChanged} />
                <button className='button button5' type="submit">Add TODO</button>
                <button className='button button3' type="reset" onClick={handletodoReset}>Reset</button>
            </form>
        );
    }

export default TodoInputFunction;