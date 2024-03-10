import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './ItemList.css';

export const ItemList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleAdd = (event) => {
    event.preventDefault();
    setItems([...items, inputValue]);
    setInputValue('');
  };

  const handleDelete = (index) => {
    setIsModalOpen(true);
    setItemToDelete({ index, value: items[index] });
  };

  const confirmDelete = () => {
    setItems(items.filter((_, i) => i !== itemToDelete.index));
    setIsModalOpen(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(items[index]);
  };

  const handleUpdate = (event, index) => {
    event.preventDefault();
    items[index] = editValue;
    setItems([...items]);
    setEditIndex(-1);
    setEditValue('');
  };

  return (
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            {items.map((item, index) => (
                <div key={index} className="box">
                  {editIndex === index ? (
                      <form onSubmit={(event) => handleUpdate(event, index)} className="field has-addons">
                        <div className="control is-expanded">
                          <input className="input" type="text" value={editValue}
                                 onChange={(e) => setEditValue(e.target.value)} placeholder="Update item"/>
                        </div>
                        <div className="control">
                          <button className="button is-info" type="submit">Update</button>
                        </div>
                      </form>
                  ) : (
                      <div className="item-line">
                        <p>{item}</p>
                        <div className="button-container">
                          <button className="button is-danger" onClick={() => handleDelete(index)}>Delete</button>
                          <button className="button is-info" onClick={() => handleEdit(index)}>Edit</button>
                        </div>
                      </div>
                  )}
                </div>
            ))}
            <form onSubmit={handleAdd} className="field has-addons">
              <div className="control is-expanded">
                <input className="input" type="text" value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)} placeholder="Enter item"/>
              </div>
              <div className="control">
                <button className="button is-info" type="submit">Add</button>
              </div>
            </form>
            {isModalOpen && (
                <div className="modal is-active">
                  <div className="modal-background"></div>
                  <div className="modal-card">
                    <header className="modal-card-head">
                      <p className="modal-card-title">Confirm Delete</p>
                      <button className="delete" aria-label="close" onClick={() => setIsModalOpen(false)}></button>
                    </header>
                    <section className="modal-card-body">
                      <p>Are you sure you want to delete the item "{itemToDelete.value}"?</p>
                    </section>
                    <footer className="modal-card-foot is-justify-content-flex-end">
                      <button className="button is-danger" onClick={confirmDelete}>Delete</button>
                      <button className="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </footer>
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};