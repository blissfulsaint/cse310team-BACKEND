const express = require('express');
const routes = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/', swaggerUi.serve);
routes.get('/', swaggerUi.setup(swaggerDocument));

module.exports = routes;