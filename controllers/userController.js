const UserService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    getUserByEmailAndPassword = async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        try {
            const user = await this.userService.getUserByEmailAndPassword(email, password);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error in user controller: ' + error.message });
        }
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error in user controller: ' + error.message });
        }
    }

    getUserById = async (req, res) => {
        const userId = parseInt(req.params.id, 10);

        if (!userId) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        try {
            const user = await this.userService.getUserById(userId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error in user controller: ' + error.message });
        }
    }

    createUser = async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const newUser = await this.userService.createUser(name, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error in user controller: ' + error.message });
        }
    }
}

module.exports = UserController;
