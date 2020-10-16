import React from 'react';

const AddItem = ({ addItem }) => {
  return (
    <button className="addItem" type="button" onClick={addItem}>
      Add Item
    </button>
  );
};

export default AddItem;
