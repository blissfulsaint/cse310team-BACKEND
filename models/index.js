const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Class = require('./class.js');
db.User = require('./user.js');

module.exports = db;