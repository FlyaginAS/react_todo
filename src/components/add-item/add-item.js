import React, { Component } from 'react';

// const AddItem = ({ addItem }) => {
//   return (
//     <button className="addItem" type="button" onClick={addItem}>
//       Add Item
//     </button>
//   );
// };
class AddItem extends Component {
  state = {
    label: '',
  };

  onChange = (evt) => {
    this.setState({ label: evt.target.value });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const { addItem } = this.props;
    addItem(this.state.label);
    this.setState({ label: '' });
  };

  render() {
    return (
      <form className="addItem" onSubmit={this.onSubmit}>
        <input
          type="text"
          onChange={this.onChange}
          className="addItemInput"
          value={this.state.label}
        />
        <button className="addItemButton" type="submit">
          Add Item
        </button>
      </form>
    );
  }
}

export default AddItem; ////
