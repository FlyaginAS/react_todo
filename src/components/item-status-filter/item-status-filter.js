import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  render() {
    const buttons = [
      {
        name: 'all',
        label: 'All',
      },
      {
        name: 'active',
        label: 'Active',
      },
      {
        name: 'done',
        label: 'Done',
      },
    ];

    const elButtons = buttons.map((el) => {
      return (
        <button
          type="button"
          key={el.name}
          className={
            el.name === this.props.active
              ? `btn btn-info`
              : `btn btn-outline-secondary`
          }
          onClick={() => this.props.filter(el.name)}
        >
          {el.name}
        </button>
      );
    });

    return <div className="btn-group">{elButtons}</div>;
  }
}
