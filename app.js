const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

var whitelist = [
    '157.201.96.100', // Brandon's Laptop
    'https://prayerselector.netlify.app' // Netlify app
]

var corsOptions = {
    // origin: '*', // Testing only, comment out before pushing
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

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

// Apply CORS middleware globally
app.use(cors(corsOptions));

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});