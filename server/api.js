const express = require('express');
const apiRouter = express.Router();

const envelopesRouter = require('./envelopes');
const transactionsRouter = require('./transactions');

apiRouter.use('/envelopes', envelopesRouter);
apiRouter.use('/transactions', transactionsRouter);

module.exports = apiRouter;