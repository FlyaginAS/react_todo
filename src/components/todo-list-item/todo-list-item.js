import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({ item, onDeleted, onImportant, onToggleDone }) => {
  const { important, done, id, label } = item;

  let classNames = 'todo-list-item';
  if (done) {
    classNames += ' done';
  }
  if (important) {
    classNames += ' important';
  }

  return (
    <span className={classNames}>
      <span className="todo-list-item-label" onClick={() => onToggleDone(id)}>
        {label}
      </span>

      <button
        type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={() => onImportant(id)}
      >
        <i className="fa fa-exclamation" />
      </button>

      <button
        type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={() => onDeleted(id)}
      >
        <i className="fa fa-trash-o" />
      </button>
    </span>
  );
};

export default TodoListItem; //
