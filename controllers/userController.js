const UserService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        const userId = parseInt(req.params.id, 10);

        try {
            const user = await this.userService.getUserById(userId);
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async createUser(req, res) {
        const { name, email, password } = req.body;

        try {
            const newUser = await this.userService.createUser(name, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;
