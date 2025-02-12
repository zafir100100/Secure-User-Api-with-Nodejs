const jwt = require('jsonwebtoken');

class AuthMiddleware {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    authenticateToken = (req, res, next) => {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            return res.status(403).send('Access denied');
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(400).send('Invalid token format');
        }

        jwt.verify(token, this.secretKey, (err, user) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }
            req.user = user;
            next();
        });
    }
}

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const authMiddleware = new AuthMiddleware(SECRET_KEY);

module.exports = { authenticateToken: authMiddleware.authenticateToken };
