const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
