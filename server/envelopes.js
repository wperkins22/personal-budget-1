const envelopesRouter = require('express').Router();

const {
    Envelope,
    addEnvelope,
    getAllEnvelopes,
    getEnvelopeById
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
    
});
