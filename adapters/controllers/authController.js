const { AuthenticateUser } = require('../../core/useCases')
const { UserRepository } = require('../repositories')
const { errorSerializer, userSerializer }  = require('../serializers')
const jwtFactory = require('../security/jwtFactory')

module.exports = {

    async performAuth (req, res) {
        try {
            const handler = new AuthenticateUser(UserRepository, jwtFactory)
            const token = await handler.execute(req.body)
            return res.status(201).json({ token })
        }
        catch (e) {
            errorSerializer.json(e, res)
        }
    },

    getAuth (req, res) {
        return res.json(userSerializer.format(req.user))
    }
}