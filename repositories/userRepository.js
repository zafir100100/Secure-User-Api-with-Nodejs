const bcrypt = require('bcryptjs');
const fs = require('fs-extra');

class UserRepository {
    constructor() {
        this.dbPath = './db/db.json';
    }

    async getAllUsers() {
        try {
            const { users } = await fs.readJson(this.dbPath);
            return users;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    }

    async getUserById(userId) {
        try {
            const { users } = await fs.readJson(this.dbPath);
            const user = users.find(u => u.id === userId);
            if (!user) throw new Error('User not found');
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }

    async createUser(name, email, password) {
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
