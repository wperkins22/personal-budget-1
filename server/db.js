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

const calculateTotalBudget = () => {
    totalBudget = 0;
    for (let envelope of envelopes) {
        totalBudget += envelope.budget;
    }
    return totalBudget;
}

// Add new envelope to envelopes array
const addEnvelope = envelopeObject => {
    envelopes.push(Envelope(envelopeObject.id, envelopeObject.envelopeName, envelopeObject.budget));
    calculateTotalBudget();
    return envelopeObject;
}

// Return all envelopes
const getAllEnvelopes = () => envelopes;

const findEnvelopeArrayIndex = id => {
    let foundIndex = -1;
    for (let i = 0; i < envelopes.length; i++) {
        if (envelopes[i].id === Number(id)) {
            foundIndex = i;
        }
    }
    if (foundIndex === -1) {
        const err = new Error(`Envelope with ID ${id} not found.`);
        err.status = 404;
        throw err;
    } 
    return foundIndex;
}

// Return envelope based on id
const getEnvelopeById = id => {
    const envelopeIndex = findEnvelopeArrayIndex(id);
    if (envelopeIndex !== -1) {
        return envelopes[envelopeIndex];
    } else {
        return null;
    }
}

// Update envelope based on id
const updateEnvelopeById = (id, envelopeName = null, budget = null) => {
    const envelopeIndex = findEnvelopeArrayIndex(id);
    if (envelopeIndex !== -1) {
        if (envelopeName !== null) {
            envelopes[envelopeIndex].envelopeName = envelopeName;
        }
        if (budget !== null) {
            envelopes[envelopeIndex].budget = budget;
        }
        return envelopes[envelopeIndex];
    } else {
        return null;
    }
}

// Delete envelope based on id
const deleteEnvelopeById = id => {
    const envelopeIndex = findEnvelopeArrayIndex(id);
    if (envelopeIndex !== -1) {
        const deletedEnvelope = envelopes[envelopeIndex];
        envelopes.splice(envelopeIndex, 1);
        return deletedEnvelope;
    } else {
        return null;
    }
}

// Transfer budget from one envelope to another
const transferBudget = (fromId, toId, amount) => {
    const fromIndex = findEnvelopeArrayIndex(fromId);
    const toIndex = findEnvelopeArrayIndex(toId);
    amount = Number(amount);

    if (envelopes[fromIndex].budget >= amount) {
        envelopes[fromIndex].budget -= amount;
        envelopes[toIndex].budget += amount;
    }
}

// Export utility functions
module.exports = {
    Envelope,
    addEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    updateEnvelopeById,
    deleteEnvelopeById,
    transferBudget
};