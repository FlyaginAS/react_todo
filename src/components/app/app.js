import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import AddItem from '../add-item';

export default class App extends Component {
  id = 100;

  state = {
    todoData: [
      this.createItem('Drink Coffee'),
      this.createItem('Make Awesome App'),
      this.createItem('Have a lunch'),
    ],
  };

  createItem(text) {
    return {
      label: text,
      important: false,
      id: this.id++,
      done: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const todoDataCopy = [...todoData];
      todoDataCopy.splice(idx, 1);

      return {
        todoData: todoDataCopy,
      };
    });
  };

  addItem = () => {
    this.setState(({ todoData }) => {
      const copyArr = [...todoData];

      copyArr.push(this.createItem('New Item'));
      return {
        todoData: copyArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const item = todoData[idx];
      const modifiedItem = { ...item, done: !item.done };
      const copyArr = [...this.state.todoData];
      copyArr.splice(idx, 1, modifiedItem);
      return {
        todoData: copyArr,
      };
    });
  };

  onImportant = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const item = todoData[idx];
      const modifiedItem = { ...item, important: !item.important };
      const copyArr = [...this.state.todoData];
      copyArr.splice(idx, 1, modifiedItem);
      return {
        todoData: copyArr,
      };
    });
  };

  render() {
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onImportant={this.onImportant}
        />
        <AddItem addItem={this.addItem} />
      </div>
    );
  }
}
