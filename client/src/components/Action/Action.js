import React from 'react';

import css from './action.module.css';

export default function Action({ type, onActionClick }) {
  return (
    <span className={css.actionButton} onClick={onActionClick}>
      <i className="material-icons tiny">{type}</i>
    </span>
  );
}
