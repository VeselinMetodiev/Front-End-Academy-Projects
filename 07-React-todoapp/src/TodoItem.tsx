import React from "react";
import { Todo, TodoStatus } from "./todo.model";
import { TodoListener } from "./TodoApp";
import './TodoItem.css'

interface TodoItemProps {
    todo: Todo;
    onChangeStatus: TodoListener;
    onUpdate: TodoListener;
    onDelete : TodoListener;
    onCancel: TodoListener;
}

const TodoItem = ({todo, onChangeStatus, onUpdate, onDelete, onCancel}: TodoItemProps) => {

function handleCompletion(event: React.MouseEvent){
    onChangeStatus({...todo, status: TodoStatus.Completed})
}

function handleCompletionCancel(event: React.MouseEvent){
    onChangeStatus({...todo, status: TodoStatus.Canceled})
}
    return (
        <div className="TodoItem">
            <span className="TodoItem-text">
            <span className="TodoItem-Id">{todo.id} </span>
            {todo.text} 
            </span>
            <span className="TodoItem-right">
                <span className="TodoItem-status">
                    {TodoStatus[todo.status]}</span>
                    {
                    todo.status === TodoStatus.Active ? 
                    <span>
                    <span className="TodoItem-button fas fa-check-circle"
                    onClick={handleCompletion}></span>
                    <span className="TodoItem-button fas fa-circle-dot"
                    onClick={handleCompletionCancel}></span> 
                    </span> : todo.status === TodoStatus.Completed ?
                    <span className="TodoItem-button fas fa-trash-can danger"
                    onClick={() => onDelete(todo)}></span> : <span className="TodoItem-button fas fa-trash danger"
                    onClick={() => onCancel(todo)}></span>
                    }
            </span>
        </div>
    )
}

export default TodoItem;
