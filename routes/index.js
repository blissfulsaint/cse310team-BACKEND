const express = require('express');
const routes = express();

routes.get('/', (req, res) => {
    res.send('Hello World!');
});

routes.get('/about', (req, res) => {
    res.send('About us');
});

routes.use('/api-docs', require('./swagger'));
routes.use('/classes', require('./classes'));
routes.use('/users', require('./users'));



module.exports = routes;