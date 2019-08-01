const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createModel = require('../utils/model');

module.exports = createModel(
    'Flower',
    new Schema(
        {
            name: String,
            petals: Array,
        }
    )
);