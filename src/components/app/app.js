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
    filterText: '',
    filter: 'all',
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

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const copyArr = [...todoData];

      copyArr.push(this.createItem(text));
      return {
        todoData: copyArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  onImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const item = arr[idx];
    const modifiedItem = { ...item, [propName]: !item[propName] };
    const copyArr = [...arr];
    copyArr.splice(idx, 1, modifiedItem);
    return copyArr;
  };

  search = (arr, text) => {
    if (!text) return arr;

    const filteredArr = arr.filter((el) =>
      el.label.toLowerCase().includes(text.toLowerCase())
    );
    return filteredArr;
  };
  changeFilterText = (text) => {
    this.setState({ filterText: text });
  };

  changeFilterState = (name) => {
    console.log('filter');
    this.setState({ filter: name });
  };

  filter = (arr, text) => {
    switch (text) {
      case 'all':
        return arr;
        break;
      case 'active':
        return arr.filter((el) => !el.done);
        break;
      case 'done':
        return arr.filter((el) => el.done);
        break;
      default:
        return arr;
    }
  };

  render() {
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    const visibleItems = this.filter(
      this.search(this.state.todoData, this.state.filterText),
      this.state.filter
    );

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.changeFilterText} />
          <ItemStatusFilter
            filter={this.changeFilterState}
            active={this.state.filter}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onImportant={this.onImportant}
        />
        <AddItem addItem={this.addItem} />
      </div>
    );
  }
}
