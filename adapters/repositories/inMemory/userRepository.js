module.exports = class {

    constructor () {
        this.users = []
    }

    createUser (userEntity) {
        userEntity.id = this.users.length + 1
        this.users.push(userEntity)
        return Promise.resolve({ ID: userEntity.id })
    }

    findUserByEmail (email) {
        return Promise.resolve(this.users.find(u => u.email === email))
    }

    findUserById (userId) {
        return Promise.resolve(this.users[userId]) 
    }

    updateUser (userId, userData) {
        this.users[userId] = userData
    }
}