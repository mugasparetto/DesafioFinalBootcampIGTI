import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Transaction = db.transaction;

const create = async (req, res, next) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    return next(new Error('Dados para criação vazio'));
  }

  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = req.body;

  const transaction = new Transaction({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  });

  try {
    await transaction.save();
    res.send({
      message: 'Transaction inserido com sucesso',
    });
    logger.info(`POST /transaction - ${JSON.stringify(transaction)}`);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const id = req.params.id;

  try {
    const transaction = await Transaction.findByIdAndRemove(id).orFail();
    res.send({ message: 'Transaction excluido com sucesso' });
    logger.info(`DELETE /transaction - ${id}`);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    return next(new Error('Dados para atualização vazio'));
  }

  const id = req.params.id;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    ).orFail();

    res.send(updatedTransaction);
    logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    next(error);
  }
};

const findByPeriod = async (req, res, next) => {
  const { period } = req.query;
  if (!period) {
    return next(
      new Error(
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm'
      )
    );
  }
  try {
    const transactions = await Transaction.find({ yearMonth: period });
    res.send({ length: transactions.length, transactions });
    logger.info(`GET /transaction?period - ${period}`);
  } catch (error) {
    next(error);
  }
};

const getPeriods = async (req, res, next) => {
  try {
    let periods = await Transaction.aggregate()
      .group({ _id: '$yearMonth' })
      .sort({ _id: 1 });

    periods = periods.map((period) => {
      const { _id } = period;
      return _id;
    });

    res.send(periods);
    logger.info(`GET /transaction/getPeriods`);
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  remove,
  update,
  findByPeriod,
  getPeriods,
};
