import axios from 'axios';

const API_URL = 'http://localhost:8080/api/transaction';

const getTransactionsByPeriod = async (period) => {
  const res = await axios.get(`${API_URL}?period=${period}`);

  const transactions = res.data.transactions.map((t) => {
    return {
      ...t,
      descriptionLowerCase: t.description.toLowerCase(),
    };
  });

  return transactions;
};

const insertTransaction = async (transaction) => {
  const response = await axios.post(API_URL, transaction);
  return response.data.id;
};

const updateTransaction = async (transaction) => {
  const response = await axios.put(`${API_URL}/${transaction.id}`, transaction);
  return response.data;
};

const deleteTransaction = async (transaction) => {
  const response = await axios.delete(`${API_URL}/${transaction.id}`);
  return response.data;
};

const getAllPeriods = async () => {
  const response = await axios.get(`${API_URL}/getPeriods`);
  return response.data;
};

export {
  getTransactionsByPeriod,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  getAllPeriods,
};
