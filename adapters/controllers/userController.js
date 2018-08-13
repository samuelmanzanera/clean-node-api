const joi = require('joi')

const { errorSerializer } = require('../serializers')
const { UserRepository } = require('../repositories')
const { CreateUser, UpdateUser } = require('../../core/useCases')

module.exports = {

    async createUser (req, res) {
        try {
            const schema = {
                email: joi.string().required().email(),
                password: joi.string().required(),
                firstname: joi.string().required(),
                lastname: joi.string().required(),
                address: joi.string().required(),
                city: joi.string().required(),
                country: joi.string().required()
            }
            
            const { error } = joi.validate(req.body, schema)
            if (error) {
                return errorSerializer.fromValidation(error, res)
            }
            
            const handler = new CreateUser(UserRepository)
            const userID = await handler.execute(req.body)
            res.status(201).json({ ID: userID })
        }
        catch (e) {
            errorSerializer.json(e, res)
        }
    },

    async updateUser (req, res) {
        try {
            const schema = {
                firstname: joi.string(),
                lastname: joi.string(),
                email: joi.string().email(),
                password: joi.string(),
                address: joi.string(),
                city: joi.string(),
                country: joi.string()
            }
    
            const { error } = joi.validate(req.body, schema)
            if (error) {
                return errorSerializer.fromValidation(error, res)
            }

            const handler = new UpdateUser(UserRepository)
            await handler.execute({ userID: req.user.id, updateForm: req.body })
            res.end()
        }
        catch (e) {
            errorSerializer.json(e, res)
        }
    }

}