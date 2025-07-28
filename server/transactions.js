const { pool } = require('./db');

const transactionsRouter = require('express').Router();

module.exports = transactionsRouter;

// GET all transactions
transactionsRouter.get('/', (req, res, next) => {

    pool.query(
        'SELECT * FROM transaction',
        (error, results) => {
            if (error) {
                next(error);
            }
            res.status(200).json(results.rows);
        }
    );
});

// POST new transaction
transactionsRouter.post('/', (req, res, next) => {
    const { date, amount, recipient, envelope_id } = req.body;

    pool.query(
        'UPDATE envelope SET budget = budget - $1 WHERE id = $2',
        [amount, envelope_id],
        (error, results) => {
            if (error) {
                next(error);
            } else {
                pool.query(
                    'INSERT INTO transaction (date, amount, recipient, envelope_id) VALUES ($1, $2, $3, $4) RETURNING *',
                    [date, amount, recipient, envelope_id],
                    (error, results) => {
                        if (error) {
                            next(error);
                        }
                        res.status(201).send(`New transaction added with ID: ${results.rows[0].id}`);
                    }
                );
            }
        }
    );
});

// GET transaction by ID
transactionsRouter.get('/:transactionId', async (req, res, next) => {
    const id = parseInt(req.params.transactionId);

    pool.query(
        'SELECT * FROM transaction WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                next(error);
            } else if (!results.rows[0]) {
                res.status(404).send(`Transaction with ID: ${id} not found`)
            } else {
                res.status(200).json(results.rows);
            }
        }
    );
});

// PUT new data into existing transaction by ID
transactionsRouter.put('/:transactionId', async (req, res, next) => {
    const id = req.params.transactionId;
    const { date, amount, recipient, envelope_id } = req.body;

    const test_id = (await pool.query('SELECT * FROM transaction WHERE id = $1', [id])).rows[0];

    if (!test_id) {
        res.status(404).send(`Transaction with ID: ${id} not found`)
    } else {
        const original_amount = (await pool.query('SELECT amount FROM transaction WHERE id = $1', [id])).rows[0].amount;
        console.log(original_amount);

        let final_amount;

        if (original_amount !== amount) {
            final_amount = Math.abs(original_amount - amount);
        }

        pool.query(
            'UPDATE envelope SET budget = budget - $1 WHERE id = $2',
            [final_amount, id],
            (error, results) => {
                if (error) {
                    next(error);
                }
                pool.query(
                    'UPDATE transaction SET date = $1, amount = $2, recipient = $3, envelope_id = $4 WHERE id = $5',
                    [date, amount, recipient, envelope_id, id],
                    (error, results) => {
                        if (error) {
                            next(error);
                        }
                        res.status(200).send(`Transaction modified with ID: ${id}`);
                    }
                );
            }
        );
    }
});

// DELETE transaction by ID
transactionsRouter.delete('/:transactionId', async (req, res, next) => {
    const id = req.params.transactionId;

    const test_id = (await pool.query('SELECT * FROM transaction WHERE id = $1', [id])).rows[0];

    if (!test_id) {
        res.status(404).send(`Transaction with ID: ${id} not found`);
    } else {
        const transaction_amount = (await pool.query('SELECT amount FROM transaction WHERE id = $1', [id])).rows[0].amount;

        pool.query(
            'UPDATE envelope SET budget = budget + $1 WHERE id = $2',
            [transaction_amount, id],
            (error, results) => {
                if (error) {
                    next(error);
                }
                pool.query(
                    'DELETE FROM transaction WHERE id = $1',
                    [id],
                    (error, results) => {
                        if (error) {
                            next(error);
                        }
                        res.status(200).send(`Transaction deleted with ID: ${id}`);
                    }
                );
            }
        );
    }
});