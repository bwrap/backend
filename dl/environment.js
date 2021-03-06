'use strict';

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

mongoose.Promise = require('bluebird');

mongoose.connect(MONGO_URL);

module.exports = mongoose;
