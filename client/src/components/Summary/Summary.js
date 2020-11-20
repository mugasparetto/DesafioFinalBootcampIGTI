import React from 'react';
import { formatValue } from '../../helpers/formatHelper';

import css from './summary.module.css';

export default function Summary({ transactions }) {
  const ammount = transactions.length;
  let receipts = 0;
  let debits = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === '-') {
      debits += transaction.value;
      return;
    }

    receipts += transaction.value;
  });

  let total = receipts - debits;

  return (
    <ul className={css.summaryBox}>
      <li>Lançamentos: {ammount}</li>
      <li>Receitas: {formatValue(receipts)}</li>
      <li>Despesas: -{formatValue(debits)}</li>
      <li>Saldo: {formatValue(total)}</li>
    </ul>
  );
}
