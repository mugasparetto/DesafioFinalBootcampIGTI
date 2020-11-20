import mongoose from 'mongoose';
import TransactionModel from './TransactionModel.js';

const db = {};
db.transaction = TransactionModel(mongoose);

export { db };
