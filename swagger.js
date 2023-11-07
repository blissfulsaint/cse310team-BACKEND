const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Prayer Selector API',
        description: 'This API allows for the user to get, update, add, and delete data from the Prayer Selector database',
    },
    // host: 'cse341-g8lt.onrender.com',
    // schemes: ['https'],
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () =>{
//     await import('./index.js');
// });