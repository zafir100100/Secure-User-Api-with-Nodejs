const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loadUsers } = require('../models/userModel');

const SECRET_KEY = 'your_jwt_secret_key';

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        try {
            const { users } = await loadUsers();
            const user = users.find(u => u.email === email);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Login error' });
        }
    }
}

module.exports = AuthController;
