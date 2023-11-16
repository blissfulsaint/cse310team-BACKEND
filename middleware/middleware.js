// middleware.js
const jwt = require('jsonwebtoken');

// Replace 'your_secret_key' with a strong, unique secret key
// const secretKey = process.env.JWT_SECRET;
const secretKey = '8OwGhMAe6gb4iVzijqyqm5hAaQMXmVP1';

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    jwt,
    verifyToken,
    secretKey,
};
