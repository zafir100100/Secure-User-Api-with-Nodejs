const AuthRepository = require('../repositories/authRepository');

class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
    }

    generateToken = (user) => {
        return this.authRepository.generateToken(user);
    }

    verifyToken = (token) => {
        return this.authRepository.verifyToken(token);
    }
}

module.exports = AuthService;
