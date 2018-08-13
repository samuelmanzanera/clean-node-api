const UserRepository = require('./userRepository')
const Database = require('../../../infrastructure/database')

const db = new Database()

module.exports = {
    UserRepository: new UserRepository(db)
}