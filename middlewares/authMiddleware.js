const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(403).send('Access denied');

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) return res.status(400).send('Invalid token format');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
