import React, { useState, useEffect } from 'react';

import * as api from './api/apiService.js';
import PeriodSelector from './components/PeriodSelector/PeriodSelector.js';
import Summary from './components/Summary/Summary.js';
import ToolBar from './components/ToolBar/ToolBar.js';
import Transactions from './components/Transactions/Transactions.js';

export default function App() {
  const [periodTransactions, setPeriodTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [availablePeriods, setAvailablePeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('2020-11');

  useEffect(() => {
    async function populatePeriods() {
      const periods = await api.getAllPeriods();
      setAvailablePeriods(periods);
    }

    populatePeriods();
  }, []);

  useEffect(() => {
    async function populateTransactions() {
      let transactions = await api.getTransactionsByPeriod(selectedPeriod);

      transactions.sort((a, b) => a.day - b.day);

      setPeriodTransactions(transactions);
      setFilteredTransactions(transactions);
    }

    populateTransactions();
  }, [selectedPeriod]);

  const changedPeriod = (newPeriod) => {
    setPeriodTransactions([]);
    setSelectedPeriod(newPeriod);
  };

  const handleDeleteTransaction = async (transaction) => {
    console.log(transaction);
    const deleted = await api.deleteTransaction(transaction);
    console.log(deleted);
    if (deleted) {
      const newTransactions = Object.assign([], periodTransactions);

      const deletedTransactionIndex = newTransactions.findIndex(
        (t) => t.id === transaction.id
      );

      newTransactions.splice(deletedTransactionIndex, 1);

      setFilteredTransactions(newTransactions);
      setPeriodTransactions(newTransactions);
    }
  };

  const handleEditTransaction = async (transaction) => {
    const newTransactions = Object.assign([], periodTransactions);

    const transactionToUpdate = newTransactions.find(
      (t) => t.id === transaction.id
    );

    if (transaction.yearMonth === selectedPeriod) {
      Object.keys(transactionToUpdate).forEach((key) => {
        transactionToUpdate[key] = transaction[key];
      });

      periodTransactions.sort((a, b) => a.day - b.day);

      await api.updateTransaction(transaction);
      return;
    }
    await api.updateTransaction(transaction);

    const periods = await api.getAllPeriods();
    setAvailablePeriods(periods);

    let transactions = await api.getTransactionsByPeriod(selectedPeriod);
    transactions.sort((a, b) => a.day - b.day);
    setPeriodTransactions(transactions);
    setFilteredTransactions(transactions);
  };

  const handleInputChange = (text) => {
    const filteredArray = periodTransactions.filter((transaction) => {
      return transaction.descriptionLowerCase.includes(text.toLowerCase());
    });

    setFilteredTransactions(filteredArray);
  };

  const handleNewTransaction = async (transaction) => {
    await api.insertTransaction(transaction);

    const periods = await api.getAllPeriods();
    setAvailablePeriods(periods);

    let transactions = await api.getTransactionsByPeriod(selectedPeriod);
    transactions.sort((a, b) => a.day - b.day);
    setPeriodTransactions(transactions);
    setFilteredTransactions(transactions);
  };

  return (
    <main className="container">
      <h4 className="center">Controle financeiro pessoal</h4>

      {periodTransactions.length === 0 && <p>Carregando transações...</p>}

      {periodTransactions.length > 0 && (
        <section>
          <PeriodSelector
            period={selectedPeriod}
            allPeriods={availablePeriods}
            onNewPeriod={changedPeriod}
          />
          <Summary transactions={filteredTransactions} />
          <ToolBar
            inputChange={handleInputChange}
            newTransaction={handleNewTransaction}
          />
          <Transactions
            transactions={filteredTransactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </section>
      )}
    </main>
  );
}
