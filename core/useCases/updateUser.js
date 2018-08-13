const UserEntity = require('../domain/UserEntity')

module.exports = class {

    constructor (userRepository) {
        this.userRepository = userRepository
    }

    async execute ({ userID, updateForm }) {
        const userDB = await this.userRepository.findUserById(userID)
        const userEntity = this.buildEntityFromDB(userDB)

        for (let field in updateForm) {
            userEntity[field] = updateForm[field]
        }

        return await this.userRepository.updateUser(userID, userEntity)
    }

    buildEntityFromDB (userDB) {
        return new UserEntity({
            id: userDB.ID,
            email: userDB.email,
            firstname: userDB.firstname,
            lastname: userDB.lastname,
            address: userDB.address,
            city: userDB.city,
            country: userDB.country
        })
    }
}