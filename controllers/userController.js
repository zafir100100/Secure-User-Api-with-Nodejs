const bcrypt = require('bcryptjs');
const { loadUsers, saveUsers } = require('../models/userModel');

class UserController {
    async getAllUsers(req, res) {
        try {
            const { users } = await loadUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users' });
        }
    }

    async getUserById(req, res) {
        const userId = parseInt(req.params.id, 10);

        try {
            const { users } = await loadUsers();
            const user = users.find(u => u.id === userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user' });
        }
    }

    async createUser(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const { users } = await loadUsers();
            const newUser = { id: users.length + 1, name, email, password: hashedPassword };
            users.push(newUser);
            await saveUsers(users);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error adding user' });
        }
    }
}

module.exports = UserController;
