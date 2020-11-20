const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const dateFormatter = Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: 'short',
});

const objDateFormatter = Intl.DateTimeFormat('pt-BR');

function formatValue(value) {
  return formatter.format(value);
}

function formatDate(date) {
  const string = date.replace('-', '/');

  return dateFormatter.format(new Date(string));
}

function formatFullDate(date) {
  const string = date.replace('-', '/');

  return new Date(string);
}

function formatObjDate(date) {
  const string = objDateFormatter.format(date);

  const year = string.slice(-4);
  const month = string.slice(3, 5);
  const day = string.slice(0, 2);

  return {
    day: parseInt(day),
    month: parseInt(month),
    year: parseInt(year),
    yearMonth: `${year}-${month}`,
    yearMonthDay: `${year}-${month}-${day}`,
  };
}

export { formatValue, formatDate, formatFullDate, formatObjDate };
