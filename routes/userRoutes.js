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
        this.router.get('/users', authenticateToken, this.userController.getAllUsers);
        this.router.get('/users/:id', authenticateToken, this.userController.getUserById);
        this.router.post('/users', this.userController.createUser);
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = UserRoutes;
