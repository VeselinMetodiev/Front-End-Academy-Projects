import React, { Component } from 'react'
import { User, UserRole, UserStatus } from './user.model';
import { UserListener } from './App'
import './registrationForm.css'

interface UserInputProps {
    onCreateTodo: UserListener
}

interface UserInputState {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    userRole: UserRole;
    gender: string;
    pictureUrl: string;
    description: string;
    userStatus: UserStatus;
    registrationTimespan: string;
    lastModificationTimespan: string;
}

export default class RegistrationForm extends Component<UserInputProps, UserInputState> {
    state: Readonly<UserInputState> = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        gender: '',
        userRole: UserRole.USER,
        pictureUrl: '',
        description: '',
        userStatus: UserStatus.ACTIVE,
        registrationTimespan: new Date().toDateString(),
        lastModificationTimespan: new Date().toDateString()
    }

    handleUserSubmit = (event: React.FormEvent) => {
    event.preventDefault(); //if none - it will reload the page
    this.props.onCreateTodo(new User(
        this.state.firstName,
        this.state.lastName,
        this.state.username,
        this.state.password,
        this.state.gender,
        this.state.userRole,
        this.state.pictureUrl,
        this.state.description,
        this.state.userStatus,
        this.state.registrationTimespan,
        this.state.lastModificationTimespan));
        this.setState({firstName: '', lastName: '', username: '', password: '', gender: '', pictureUrl: '', description: ''})
  }

  handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof UserInputState;
    const newStateUpdate = {[fieldName]: event.target.value} as unknown as UserInputState;
    this.setState(newStateUpdate)
  }

    handleUserReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({firstName: '', lastName: '', username: '', password: '', gender: '', pictureUrl: '', description: ''})
    }

  render() {
    return (
      <form className='UserInput-form' onSubmit={this.handleUserSubmit}>
        <label htmlFor="firstName"><b>First Name</b></label>
        <input type="text" id="TodoInput-todo-firstName" name="firstName" value={this.state.firstName}
            onChange={this.handleTextChanged} />
        <label htmlFor="lastName"><b>Last Name</b></label>
        <input type="text" id="TodoInput-todo-lastName" name="lastName" value={this.state.lastName}
            onChange={this.handleTextChanged} />
        <label htmlFor="username"><b>Username</b></label>
        <input type="text" id="TodoInput-todo-username" name="username" value={this.state.username}
            onChange={this.handleTextChanged} />
        <label htmlFor="password"><b>Password</b></label>
        <input type="password" id="TodoInput-todo-password" name="password" value={this.state.password}
            onChange={this.handleTextChanged} />
             <label htmlFor='m'>Gender</label>
    <input type="text" id="TodoInput-todo-gender" name="gender" value={this.state.gender}
            onChange={this.handleTextChanged} />
        <label htmlFor="pictureURL"><b>Picture URL</b></label>
        <input type="text" id="TodoInput-todo-pictureURL" name="pictureUrl" value={this.state.pictureUrl}
            onChange={this.handleTextChanged} />
        <label htmlFor="description"><b>Description</b></label>
        <input type="text" id="TodoInput-todo-descripotion" name="description" value={this.state.description}
            onChange={this.handleTextChanged} />

            <button className="button button5" type="submit">Register</button>
            <button className="button button3" type="reset" onClick={this.handleUserReset}>Reset</button>
        </form>
    )
  }
}