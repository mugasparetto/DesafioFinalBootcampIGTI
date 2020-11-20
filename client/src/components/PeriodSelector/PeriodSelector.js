import React from 'react';
import { formatDate } from '../../helpers/formatHelper';

export default function PeriodSelector(props) {
  const { period, allPeriods, onNewPeriod } = props;

  const handleChange = ({ target }) => {
    onNewPeriod(target.value);
  };

  return (
    <select value={period} className="browser-default" onChange={handleChange}>
      {allPeriods.map((p) => (
        <option value={p} key={p}>
          {formatDate(p)}
        </option>
      ))}
    </select>
  );
}
