const fs = require('fs-extra');

class UserModel {
    static async loadUsers() {
        return fs.readJson('./db/db.json');
    }

    static async saveUsers(users) {
        return fs.writeJson('./db/db.json', { users });
    }
}

module.exports = UserModel;
