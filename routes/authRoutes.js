const express = require('express');
const AuthController = require('../controllers/authController');

class AuthRoutes {
    constructor() {
        this.router = express.Router();
        this.authController = new AuthController();
        this.routes();
    }

    routes() {
        this.router.post('/login', this.authController.login);
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = AuthRoutes;
