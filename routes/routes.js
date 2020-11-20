import express from 'express';
import service from '../services/transactionService.js';
import { logger } from '../config/logger.js';

const app = express.Router();

app.post('/', service.create);
app.delete('/:id', service.remove);
app.put('/:id', service.update);
app.get('/', service.findByPeriod);
app.get('/getPeriods', service.getPeriods);

app.use((error, req, res, next) => {
  logger.error(
    `${req.method} ${req.baseUrl} - ${JSON.stringify(error.message)}`
  );
  res.status(500).send({ error: error.message });
});

export { app as transactionRouter };
