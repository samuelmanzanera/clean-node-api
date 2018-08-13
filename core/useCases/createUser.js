const bcrypt = require('bcrypt')
const saltRounds = 10

const UserEntity = require('../domain/UserEntity')
const UserAlreadyExistException  = require('../exceptions/UserAlreadyExist')

module.exports = class {

    constructor (userRepository) {
        this.userRepository = userRepository
    }

    async execute ({ email, password, salt, firstname, lastname, address, city, country } = form) {
        const dbUser = await this.userRepository.findUserByEmail(email)
        if (dbUser) {
            throw new UserAlreadyExistException('This email is already assigned to an user')
        }
        
        const hashedPassword = await this.hashPassword(password)
        const userEntity = new UserEntity({ email, password: hashedPassword, salt, firstname, lastname, address, city, country })

        const dbResult = await this.userRepository.createUser(userEntity)
        return dbResult.ID
    }

    hashPassword (password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    return reject(err)
                }
                resolve(hash)
            })
        })
    }
}