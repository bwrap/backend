'use strict';

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test';

mongoose.Promise = require('bluebird');

mongoose.connect(MONGO_URL);

module.exports = mongoose;
