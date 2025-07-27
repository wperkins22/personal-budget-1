// Import Express and create envelope router
const envelopesRouter = require('express').Router();

// Import Pool for SQL queries
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'db_user',
    host: 'localhost',
    database: 'personal_budget',
    password: 'password',
    port: 5432
});

module.exports = envelopesRouter;

// GET all envelopes
envelopesRouter.get('/', (req, res, next) => {

    // Use pool to query database and retrieve all records of envelope table
    pool.query('SELECT * FROM envelope', (error, results) => {
        if (error) {
            next(error);
        }
        res.status(200).json(results.rows);
    });
});

// POST new envelope
envelopesRouter.post('/', (req, res, next) => {
    const {name, budget} = req.body;

    // Use pool to query database and insert new record
    pool.query('INSERT INTO envelope (name, budget) VALUES ($1, $2) RETURNING *', [name, budget], (error, results) => {
        if (error) {
            next(error);
        }
        res.status(201).send(`New budget added with ID: ${results.rows[0].id}`);
    });
});

// GET envelope by ID
envelopesRouter.get('/:envelopeId', (req, res, next) => {
    const id = parseInt(req.params.envelopeId);

    // Use pool to query database to select envelope by id
    pool.query('SELECT * FROM envelope WHERE id = $1', [id], (error, results) => {
        if (error) {
            next(error);
        }
        res.status(200).json(results.rows);
    });
});

// PUT new data into existing envelope
envelopesRouter.put('/:envelopeId', (req, res, next) => {
    const id = parseInt(req.params.envelopeId);
    const { name, budget } = req.body;

    // Use pool to query database to update envelope
    pool.query(
        'UPDATE envelope SET name = $1, budget = $2 WHERE id = $3',
        [name, budget, id],
        (error, results) => {
            if (error) {
                next(error);
            }
            res.status(200).send(`Budget modified with ID: ${id}`);
        }
    );
});

// DELETE envelope
envelopesRouter.delete('/:envelopeId', (req, res, next) => {
    const id = parseInt(req.params.envelopeId);

    // Use pool to query database to delete record
    pool.query(
        'DELETE FROM envelope WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                next(error);
            }
            res.status(200).send(`Envelope deleted with ID: ${id}`);
        }
    );
});

// PUT (transfer) budget from one envelope to another
envelopesRouter.put('/:fromId/:toId', (req, res, next) => {
    const from_id = parseInt(req.params.fromId);
    const to_id = parseInt(req.params.toId);
    const amount = parseFloat(req.query.amount);

    // Only want to perform transfer if amount is greater than 0
    if (amount > 0) {
        // Query to subtract budget from sender envelope
        pool.query(
            'UPDATE envelope SET budget = budget - $1 WHERE id = $2',
            [amount, from_id],
            (error, results) => {
                if (error) {
                    next(error);
                }
                // Query to add budget to recipient envelope
                pool.query(
                    'UPDATE envelope SET budget = budget + $1 WHERE id = $2',
                    [amount, to_id],
                    (error, results) => {
                        if (error) {
                            next(error);
                        }
                        res.status(200).send(`Transferred \$${amount} from envelope with ID ${from_id} to envelope with ID ${to_id}`);
                    }
                );
            }
        );
    }
});
