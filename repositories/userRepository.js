const bcrypt = require('bcryptjs');
const fs = require('fs-extra');
const AuthService = require('../services/authService');

class UserRepository {
    constructor() {
        this.dbPath = './db/db.json';
        this.authService = new AuthService();
    }

    getUserByEmailAndPassword = async (email, password) => {
        try {
            const { users } = await fs.readJson(this.dbPath);
            const user = users.find(u => u.email === email);
            if (!user) throw new Error('User not found');
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('Invalid password');
            
            const token = this.authService.generateToken(user);
            return { token };
        } catch (error) {
            throw new Error('Error fetching user by email and password');
        }
    }

    getAllUsers = async () => {
        try {
            const { users } = await fs.readJson(this.dbPath);
            return users;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    }

    getUserById = async (userId) => {
        try {
            const { users } = await fs.readJson(this.dbPath);
            const user = users.find(u => u.id === userId);
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }

    createUser = async (name, email, password) => {
        if (!name || !email || !password) {
            throw new Error('Missing required fields');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const { users } = await fs.readJson(this.dbPath);
            const newUser = { id: users.length + 1, name, email, password: hashedPassword };
            users.push(newUser);
            await fs.writeJson(this.dbPath, { users });
            return newUser;
        } catch (error) {
            throw new Error('Error adding user');
        }
    }
}

module.exports = UserRepository;
