const UserNotFoundException = require('../exceptions/UserNotFound')

module.exports = class {

    constructor (userRepository) {
        this.userRepository = userRepository
    }

    async execute ({ id }) {
        const user = await this.userRepository.findUserById(id)
        if (!user) {
            throw new UserNotFoundException()
        }
        return user
    }

}