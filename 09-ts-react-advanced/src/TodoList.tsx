import { render } from "@testing-library/react";
import { useMemo } from "react";
import { Todo, TodoStatus } from "./todo.model";
import { FilterType, TodoListener } from "./TodoApp";
import TodoItem from "./TodoItem";
import './TodoList.css'

interface Props{
    todos: Todo[];
    filter: FilterType;
    onUpdate: TodoListener;
    onDelete: TodoListener;
    onEdit: TodoListener;
    render: (todo : Todo) => JSX.Element;
}

export default function TodoList({todos, filter, render, ...rest}: Props) {
    const visibleTodos = (todos: Todo[], filter:FilterType)=> todos.filter(todo => ! filter ? true: todo.status === filter);
    const memoizedVisibleTodos = useMemo(() => visibleTodos(todos, filter), [todos, filter])
    return (<div className="TodoList">
        { 
        memoizedVisibleTodos.map(todo =>
            render(todo))
           // (<TodoItem prevStatus={todo.status} todo={todo} key={todo.id} {...rest} />))
        }
    </div>)
}