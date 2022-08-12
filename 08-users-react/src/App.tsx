import React, { Component } from 'react';
import './App.css';
import { User, UserStatus } from './user.model';
import RegistrationForm from './RegistrationForm';
import UserList from './UserList';
import UserFilter from './UserFilter';
import { UsersAPI } from './rest-api-client';

export interface UserListener {
  (user: User): void;
}

interface UsersAppState {
  users: User[];
  filter: FilterType;
  errors: string | undefined;
}

export interface FilterChangeListener {
  (filter: FilterType): void;
}

export type FilterType = UserStatus | undefined;

class App extends Component<{}, UsersAppState> {
  state: Readonly<UsersAppState> = {
    users: [],
    filter: undefined,
    errors: undefined,
  }

  constructor(props: {}) {
    super(props)
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  //Callback methods

  async componentDidMount() {
    try {
    const allUsers = await UsersAPI.findAll();
    this.setState({users: allUsers})
    this.setState({errors: undefined})
    } catch(err ) {
      this.setState({errors :err as string})
    }
  }

  //HandleUpdate and Cancel todo are the same
handleUpdateUser(user:User) {
  this.setState(({users}) => ({
    users: users.map(u => u.id === user.id? user: u)
  }))
}

handleCancelUser = (user:User) => {
  this.setState(({users}) => ({
    users: users.filter(u => u.id !== user.id)
  }))
}

handleDeleteUser = async (user:User) => {
  const deletedUser = await UsersAPI.deleteById(user.id);
  this.setState(({users}) => ({
    users: users.filter(u => u.id !== user.id)
  }))
}

handleFilterChange = (status: FilterType) => {
this.setState({filter: status})
}

handleCreateUser = async (user:User) => {
    const createdUser = await UsersAPI.create(user);
    this.setState(({users}) => ({
      users: users.concat(createdUser)
    }))
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <h1>User System</h1>
        {/* {this.state.errors && <div className="errors">{this.state.errors}</div>} */}
        <RegistrationForm onCreateTodo={this.handleCreateUser}/>
        <UserFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} />
        <UserList users={this.state.users} filter={this.state.filter}
        onChangeStatus={this.handleUpdateUser}
        onUpdate={this.handleCreateUser}
        onCancel={this.handleCancelUser}
        onDelete={this.handleDeleteUser}/>
      </header>
    </div>
  );
}
}
export default App;
