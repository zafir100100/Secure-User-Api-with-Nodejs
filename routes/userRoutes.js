const express = require('express');
const UserController = require('../controllers/userController');

class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.routes();
    }

    routes() {
        this.router.get('/users', this.userController.getAllUsers);
        this.router.get('/users/:id', this.userController.getUserById);
        this.router.post('/users', this.userController.createUser);
        this.router.post('/users/login', this.userController.getUserByEmailAndPassword);  // Login route
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = UserRoutes;
