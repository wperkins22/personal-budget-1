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

// Return envelope based on id
const getEnvelopeById = id => {
    for (let envelope of envelopes) {
        if (envelope.id === Number(id)) {
            return envelope;
        }
    }
    return null;
}

const updateEnvelopeById = (id, envelopeName = null, budget = null) => {
    for (let envelope of envelopes) {
        if (envelope.id === Number(id)) {
            if (envelopeName !== null){
                envelope.envelopeName = envelopeName;
            }
            if (budget !== null) {
                envelope.budget = budget;
            }
            return envelope;
        }
    }
    return null;
}

const deleteEnvelopeById = id => {
    let foundIndex; 
    for (let i = 0; i < envelopes.length; i++) {
        if (envelopes[i].id === Number(id)) {
            foundIndex = i;
        }
    }
    if (foundIndex) {
        const deletedEnvelope = envelopes[foundIndex];
        envelopes.splice(foundIndex, 1);
        return deletedEnvelope;
    } else {
        return null;
    }
}

// const transferBudget = (fromId, toId, amount) => {
//     if (envelopes[fromId].budget >= amount) {
//         envelopes[fromId].budget -= amount;
//         envelopes[toId].budget += amount;
//     }
// }

module.exports = {
    Envelope,
    addEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    updateEnvelopeById,
    deleteEnvelopeById,
    transferBudget
};