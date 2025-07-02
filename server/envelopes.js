// Import Express and create envelope router
const envelopesRouter = require('express').Router();

// Import utility functions from db.js
const {
    addEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    updateEnvelopeById,
    deleteEnvelopeById,
    transferBudget
} = require('./db');

module.exports = envelopesRouter;

// Will run whenever /:envelopeId is a parameter to attach the correct envelope to req
envelopesRouter.param('envelopeId', (req, res, next, id) => {
    const envelope = getEnvelopeById(id);
    if (envelope) {
        req.envelope = envelope;
        next();
    } else {
        res.status(404).send();
    }
});

// GET all envelopes
envelopesRouter.get('/', (req, res, next) => {
    res.send(getAllEnvelopes());
});

// POST new envelope
envelopesRouter.post('/', (req, res, next) => {
    try {
        const newEnvelope = addEnvelope(req.body);
        res.status(201).send(newEnvelope);
    } catch (err) {
        next(err);
    }
});

// GET envelope by ID
envelopesRouter.get('/:envelopeId', (req, res, next) => {
    res.send(req.envelope);
});

// PUT new data into existing envelope
envelopesRouter.put('/:envelopeId', (req, res, next) => {
    try {
        const updatedEnvelope = updateEnvelopeById(req.params.envelopeId, req.body.envelopeName, req.body.budget);
        res.status(202).send(updatedEnvelope);
    } catch (err) {
        next(err);
    }
});

// DELETE envelope
envelopesRouter.delete('/:envelopeId', (req, res, next) => {
    const id = req.params.envelopeId;
    try {
        const deletedEnvelope = deleteEnvelopeById(id);
        res.status(202).send(deletedEnvelope);
    } catch (err) {
        next(err);
    }
});

// PUT (transfer) budget from one envelope to another
envelopesRouter.put('/:fromId/:toId', (req, res, next) => {
    if (Number(req.query.amount) > 0) {
        transferBudget(req.params.fromId, req.params.toId, req.query.amount);
        res.send();
    }
});
