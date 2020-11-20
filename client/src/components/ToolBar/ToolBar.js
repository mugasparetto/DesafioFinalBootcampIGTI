import React, { useState } from 'react';

import ModalTransaction from '../ModalTransaction/ModalTransaction';

export default function ToolBar({ inputChange, newTransaction }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = ({ target }) => {
    inputChange(target.value);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNewModal = (transaction) => {
    newTransaction(transaction);
    setIsModalOpen(false);
  };

  return (
    <div className="row valign-wrapper">
      <button
        className="waves-effect waves-light btn col s4"
        style={{ zIndex: '0' }}
        onClick={handleClick}
      >
        <i className="material-icons left">add</i>NOVO LANÇAMENTO
      </button>
      <form className="col s8">
        <input
          id="filter"
          type="text"
          placeholder="Filtrar"
          onChange={handleChange}
        />
      </form>
      {isModalOpen && (
        <ModalTransaction
          onSave={handleNewModal}
          onClose={handleCloseModal}
          transaction={null}
        />
      )}
    </div>
  );
}
