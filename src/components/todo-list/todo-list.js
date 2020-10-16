import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, ...rest }) => {
  const elements = todos.map((item) => {
    const { id } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem {...rest} item={item} />
      </li>
    );
  });

  return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
