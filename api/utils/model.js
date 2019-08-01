const mongoose = require('mongoose');
const model = mongoose.model;

const createModel = (name, schema) => {
    let mongooseModel = null;
    try {
        mongooseModel = model(name);
    } catch (error) {
        mongooseModel = model(name, schema);
    }
    return mongooseModel;
}

module.exports = createModel;