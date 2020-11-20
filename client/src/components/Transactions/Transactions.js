import React, { useState } from 'react';

import ModalTransaction from '../ModalTransaction/ModalTransaction';
import Transaction from '../Transaction/Transaction';

export default function Transactions({ transactions, onDelete, onEdit }) {
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (transaction) => {
    onDelete(transaction);
  };

  const handleEdit = (transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleEditModal = (edittedTransaction) => {
    onEdit(edittedTransaction);

    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Transaction
              transaction={transaction}
              deleteTransaction={handleDelete}
              editTransaction={handleEdit}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ModalTransaction
          onSave={handleEditModal}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
}
