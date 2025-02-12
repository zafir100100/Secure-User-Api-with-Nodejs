const UserRepository = require('../repositories/userRepository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    getUserByEmailAndPassword = async (email, password) => {
        try {
            const user = await this.userRepository.getUserByEmailAndPassword(email, password);
            return user;
        } catch (error) {
            throw new Error('Error in user service: ' + error.message);
        }
    }

    getAllUsers = async () => {
        try {
            const users = await this.userRepository.getAllUsers();
            return users;
        } catch (error) {
            throw new Error('Error in user service: ' + error.message);
        }
    }

    getUserById = async (userId) => {
        try {
            const user = await this.userRepository.getUserById(userId);
            return user;
        } catch (error) {
            throw new Error('Error in user service: ' + error.message);
        }
    }

    createUser = async (name, email, password) => {
        try {
            const newUser = await this.userRepository.createUser(name, email, password);
            return newUser;
        } catch (error) {
            throw new Error('Error in user service: ' + error.message);
        }
    }
}

module.exports = UserService;
