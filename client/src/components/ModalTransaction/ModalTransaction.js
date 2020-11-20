import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import DatePicker from 'react-datepicker';

import { formatFullDate, formatObjDate } from '../../helpers/formatHelper';

import 'react-datepicker/dist/react-datepicker.css';
import css from './modalTransaction.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-100%',
    transform: 'translate(-50%, -50%)',
    width: '480px',
    zIndex: '1000',
  },
};

Modal.setAppElement('#root');

export default function ModalTransaction({ onSave, onClose, transaction }) {
  const description = !transaction ? '' : transaction.description;
  const category = !transaction ? '' : transaction.category;
  const value = !transaction ? 0 : transaction.value;
  const date = !transaction
    ? `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`
    : transaction.yearMonthDay;
  const type = !transaction ? '' : transaction.type;

  const [modalDescription, setModalDescription] = useState(description);
  const [modalCategory, setModalCategory] = useState(category);
  const [modalValue, setModalValue] = useState(value);
  const [modalDate, setModalDate] = useState(formatFullDate(date));
  const [modalType, setModalType] = useState(type);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = ({ key }) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const date = formatObjDate(modalDate);
    const newTransaction = {
      description: modalDescription,
      descriptionLowerCase: modalDescription.toLowerCase(),
      category: modalCategory,
      value: modalValue,
      type: modalType,
      ...date,
    };

    if (!!transaction) {
      newTransaction.id = transaction.id;
    }

    onSave(newTransaction);
    return;
  };

  const handleInputChange = ({ target }) => {
    switch (target.id) {
      case 'modalDescription':
        setModalDescription(target.value);
        break;
      case 'modalCategory':
        setModalCategory(target.value);
        break;
      case 'modalValue':
        setModalValue(target.value);
        break;
      case 'modalType':
        setModalType(target.value);
        break;
      default:
    }
  };

  return (
    <Modal isOpen={true} style={customStyles}>
      <div className={css.header}>
        <h5>
          {!transaction ? 'Inclusão de lançamento' : 'Edição de lançamento'}
        </h5>
        <button
          className="waves-effect waves-light btn red darken-4"
          onClick={onClose}
        >
          <i className="material-icons tiny">close</i>
        </button>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input
            className="with-gap"
            name="modalType"
            id="modalType"
            value="-"
            type="radio"
            checked={transaction && modalType === '-'}
            disabled={!!transaction}
            onChange={handleInputChange}
          />
          <span>Despesa</span>
        </label>
        <label>
          <input
            className="with-gap"
            name="modalType"
            id="modalType"
            value="+"
            type="radio"
            checked={transaction && modalType === '+'}
            disabled={!!transaction}
            onChange={handleInputChange}
          />
          <span>Receita</span>
        </label>
      </div>
      <div className="row" style={{ marginTop: '2rem' }}>
        <form className="col s12" onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="modalDescription"
                type="text"
                value={modalDescription}
                onChange={handleInputChange}
                autoFocus
              />
              <label htmlFor="modalDescription" className="active">
                Descrição
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="modalCategory"
                type="text"
                value={modalCategory}
                onChange={handleInputChange}
              />
              <label htmlFor="modalCategory" className="active">
                Categoria
              </label>
            </div>
            <div className="input-field col s6">
              <input
                id="modalValue"
                type="number"
                value={modalValue}
                onChange={handleInputChange}
              />
              <label htmlFor="modalValue" className="active">
                Valor
              </label>
            </div>
            <div className="input-field col s6">
              <DatePicker
                selected={modalDate}
                onChange={(date) => setModalDate(date)}
                dateFormat="dd/MM/yyyy"
              />
              <label className="active">Data</label>
            </div>
          </div>
          <button
            className="waves-effect waves-light btn"
            onClick={handleFormSubmit}
            disabled={
              modalDescription === '' ||
              modalType === '' ||
              modalCategory === ''
            }
          >
            Salvar
          </button>
        </form>
      </div>
    </Modal>
  );
}
