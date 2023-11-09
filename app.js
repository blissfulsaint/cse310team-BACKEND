const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./models');
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    })

app
    .use(cors())
    .use('/', require('./routes'));
    
// Example in Node.js using Express
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    // Add other headers as needed
    next();
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});