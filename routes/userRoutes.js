const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.routes();
    }

    routes() {
        // Bypassing authentication for login and signup routes
        this.router.post('/users', this.userController.createUser);  // Signup
        this.router.post('/users/login', this.userController.getUserByEmailAndPassword);  // Login

        // Apply authentication middleware globally for all routes except login/signup
        this.router.use(authenticateToken);

        // Routes that require authentication
        this.router.get('/users', this.userController.getAllUsers);
        this.router.get('/users/:id', this.userController.getUserById);
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = UserRoutes;
