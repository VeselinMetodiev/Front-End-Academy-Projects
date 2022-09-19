import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { Todo } from "../model/todo.model";
import { AddToDo, DeleteTodo, ToDoAction } from "../redux/actions";
import { StoreState } from "../redux/reducers";


function mapStateToProps({ todo: { todoList } }: StoreState) {
  return {
      todoList,
      editedTodo: undefined,
  }
}

function mapDispatchToProps(dispatch: Dispatch<ToDoAction>) {
  return {
      onAdd: (todo: Todo) => dispatch(AddToDo(todo)),
      onDelete: (todo: Todo) => dispatch(DeleteTodo(todo)),
  }
}

interface ToDoProps {
  todoList: Todo[];
  editedTodo: Todo | undefined;
  onAdd: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

class ToDoContainerApp extends Component<ToDoProps> {
  render() {
    return (

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={styles.header}>TODO Demo</Text>
          <TodoInput key={this.props.editedTodo?.id} todo={this.props.editedTodo} onCreateTodo={this.props.onAdd} />
          <TodoList
            todos={this.props.todoList}
            filter={undefined}
            onUpdate={() => {}}
            onDelete={this.props.onDelete}
            onEdit={() => {}}
          />
        </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoContainerApp);

// export default ToDoContainerApp;

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 20,
    alignSelf: 'center',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  errors: {
    padding: 5,
    fontSize: 20,
    border: 1,
    borderRadius: 5,
    backgroundColor: '#eecccc',
    color: 'red',
    textAlign: 'center',
  }
});