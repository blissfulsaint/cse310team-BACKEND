const express = require('express');
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

// Allow Netlify app to access the render app
app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'https://classroulette.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});