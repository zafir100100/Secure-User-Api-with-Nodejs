const UserRepository = require('../repositories/userRepository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAllUsers() {
        try {
            return await this.userRepository.getAllUsers();
        } catch (error) {
            throw new Error('Service: Error fetching users');
        }
    }

    async getUserById(userId) {
        try {
            return await this.userRepository.getUserById(userId);
        } catch (error) {
            throw new Error('Service: Error fetching user');
        }
    }

    async createUser(name, email, password) {
        try {
            return await this.userRepository.createUser(name, email, password);
        } catch (error) {
            throw new Error('Service: Error creating user');
        }
    }
}

module.exports = UserService;
