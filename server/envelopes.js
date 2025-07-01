const envelopesRouter = require('express').Router();

const {
    Envelope,
    addEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    updateEnvelopeById,
    deleteEnvelopeById,
    transferBudget
} = require('./db');

module.exports = envelopesRouter;

envelopesRouter.param('envelopeId', (req, res, next, id) => {
    const envelope = getEnvelopeById(id);
    if (envelope) {
        req.envelope = envelope;
        next();
    } else {
        res.status(404).send();
    }
});

envelopesRouter.get('/', (req, res, next) => {
    res.send(getAllEnvelopes());
});

envelopesRouter.post('/', (req, res, next) => {
    try {
        const newEnvelope = addEnvelope(req.body);
        res.status(201).send(newEnvelope);
    } catch (err) {
        next(err);
    }
});

envelopesRouter.get('/:envelopeId', (req, res, next) => {
    res.send(req.envelope);
});

envelopesRouter.put('/:envelopeId', (req, res, next) => {
    try {
        const updatedEnvelope = updateEnvelopeById(req.params.envelopeId, req.body.envelopeName, req.body.budget);
        res.status(202).send(updatedEnvelope);
    } catch (err) {
        next(err);
    }
});

envelopesRouter.delete('/:envelopeId', (req, res, next) => {
    const id = req.params.envelopeId;
    try {
        const deletedEnvelope = deleteEnvelopeById(id);
        res.status(202).send(deletedEnvelope);
    } catch (err) {
        next(err);
    }
});

// envelopesRouter.put('/:fromId/:toId', (req, res, next) => {
//     const fromId = Number(req.params.fromId);
//     const toId = Number(req.params.toId);
//     const amount = Number(req.query.amount);
//     if (amount > 0) {
//         transferBudget(req.params.fromId, req.params.toId, req.query.amount);
//         res.send();
//     }
// });
