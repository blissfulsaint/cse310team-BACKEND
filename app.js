const express = require('express');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

var whitelist = [
    'https://classroulette.netlify.app'
]

var corsOptions = {
    // origin: '*',
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

app.use(cors(corsOptions));

// // Allow Netlify app to access the render app
// app.use((req, res, next) => {
//     // res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Origin', 'https://classroulette.netlify.app');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});