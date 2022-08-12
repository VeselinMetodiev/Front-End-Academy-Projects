import React from "react";
import { User, UserStatus } from "./user.model";
import { UserListener } from "./App";
import './UserItem.css'

interface UserItemProps {
    user: User;
    onChangeStatus: UserListener;
    onUpdate: UserListener;
    onDelete : UserListener;
    onCancel: UserListener;
}

const UserItem = ({user, onChangeStatus, onUpdate, onDelete, onCancel}: UserItemProps) => {

function handleCompletion(event: React.MouseEvent){
    onChangeStatus({...user, status: UserStatus.DEACTIVATED})
}

function handleCompletionCancel(event: React.MouseEvent){
    onChangeStatus({...user, status: UserStatus.SUSPENDED})
}
    return (
        <div className="TodoItem">
            <span className="TodoItem-text">
            <span className="TodoItem-Id">{user.id} </span>
            {user.username} - {user.firstName + ' ' + user.lastName}
            </span>
            <span className="image"><img src={user.userPicture} alt='User appearance'></img></span>
            <span className="TodoItem-right">
                <span className="TodoItem-status">
                    {UserStatus[user.status]}</span>
                    {
                    user.status === UserStatus.ACTIVE ? 
                    <span>
                    <span className="TodoItem-button fas fa-check-circle"
                    onClick={handleCompletion}></span>
                    <span className="TodoItem-button fas fa-circle-dot"
                    onClick={handleCompletionCancel}></span> 
                    </span> : user.status === UserStatus.SUSPENDED ?
                    <span className="TodoItem-button fas fa-trash-can danger"
                    onClick={() => onDelete(user)}></span> : <span className="TodoItem-button fas fa-trash danger"
                    onClick={() => onCancel(user)}></span>
                    }
            </span>
        </div>
    )
}

export default UserItem;