const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_jwt_secret_key';

class AuthRepository {
    generateToken = (user) => {
        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        return token;
    }

    verifyToken = (token) => {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

module.exports = AuthRepository;
