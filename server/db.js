// Function creates envelope objects
const Envelope = (id, envelopeName, budget) => {
    return {
        id: Number(id),
        envelopeName: envelopeName,
        budget: Number(budget)
    };
};

// Store envelopes
let envelopes = [];
let totalBudget = 0;

// Add new envelope to envelopes array
const addEnvelope = envelopeObject => {
    envelopes.push(Envelope(envelopeObject.id, envelopeObject.envelopeName, envelopeObject.budget));
    return envelopeObject;
}

// Return all envelopes
const getAllEnvelopes = () => envelopes;

const getEnvelopeById = id => {
    for (let envelope of envelopes) {
        if (envelope.id === Number(id)) {
            return envelope;
        }
    }
    return null;
}

const updateEnvelopeById = (id, title, budget) => {
    
};

module.exports = {
    Envelope,
    addEnvelope,
    getAllEnvelopes,
    getEnvelopeById
};