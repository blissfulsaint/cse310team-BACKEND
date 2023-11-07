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

app
    .use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});