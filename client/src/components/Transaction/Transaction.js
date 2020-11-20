import React from 'react';
import { formatValue } from '../../helpers/formatHelper';
import Action from '../Action/Action';

import css from './transaction.module.css';

export default function Transaction({
  transaction,
  deleteTransaction,
  editTransaction,
}) {
  const { day, category, description, value, type } = transaction;

  const handleEdit = () => {
    editTransaction(transaction);
  };

  const handleDelete = () => {
    deleteTransaction(transaction);
  };

  return (
    <article
      className={css.transaction}
      style={
        type === '-'
          ? { backgroundColor: '#ef9a9a' }
          : { backgroundColor: '#a5d6a7' }
      }
    >
      <div className={css.flexRow}>
        <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          {day.toString().padStart(2, 0)}
        </span>
        <ul style={{ marginLeft: '1rem' }}>
          <li style={{ fontWeight: '700' }}>{category}</li>
          <li>{description}</li>
        </ul>
      </div>
      <div className={css.flexRow}>
        <span
          style={{
            marginRight: '3rem',
            fontSize: '1.3rem',
            fontWeight: 'bold',
          }}
        >
          {formatValue(value)}
        </span>
        <div>
          <Action onActionClick={handleEdit} type="create" />
          <Action onActionClick={handleDelete} type="delete" />
        </div>
      </div>
    </article>
  );
}
