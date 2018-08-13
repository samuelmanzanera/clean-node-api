const bcrypt = require('bcrypt')

const UserNotFoundException = require('../exceptions/UserNotFound')
const InvalidCredentialsException = require('../exceptions/InvalidCredentials')

module.exports = class {

    constructor (userRepository, jwtFactory) {
        this.userRepository = userRepository
        this.jwtFactory = jwtFactory
    }

    async execute ({ email, password }) {
        const user = await this.userRepository.findUserByEmail(email)
        if (!user) {
            throw new UserNotFoundException('Invalid email')
        }
        await this.checkPassword(password, user.password)

        const token = await this.jwtFactory.createToken(user)
        return token
    
    }

    checkPassword (actualPassword, expectedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(actualPassword, expectedPassword, (err, ok) => {
                if (err) {
                    return reject(err)
                }
                if (!ok) {
                    throw new InvalidCredentialsException('Password does not match')
                }
                resolve()
            })
        })
    }
    
}