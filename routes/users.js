const express = require('express');
const routes = express();

routes.use(express.json());

const db = require('../models');

// add routes here


module.exports = routes;