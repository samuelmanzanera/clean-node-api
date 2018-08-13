module.exports = class {

    constructor (db) {
        this.db = db
    }

    async createUser (userEntity) {
        const query = this.db.queryBuilder.insert(userEntity).into('user').toString()
        const result = await this.db.instance.execute(query)
        return Promise.resolve({ ID: result.insertedID })
    }

    async findUserByEmail (email) {
        const query = this.db.queryBuilder
            .select()
            .table('user')
            .where({ email: email })
            .toString()
        
        const results = await this.db.instance.query(query)
        return results[0]
    }

    async findUserById (userId) {
        const query = this.db.queryBuilder
            .select()
            .table('user')
            .where({ id: userId })
            .toString()
        
        const results = await this.db.instance.query(query)
        return results[0]
    }

    updateUser (userId, userData) {
        const query = this.db.queryBuilder('user')
            .where({ id: userId })
            .update({
                firstname: userData.firstname,
                lastname: userData.lastname,
                address: userData.address,
                city: userData.city,
                country: userData.country,
                email: userData.email
            })
            .toString()
        
        return this.db.instance.execute(query)
    }
}