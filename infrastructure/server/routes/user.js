const { jwt } = require('../../../adapters/middlewares')
const userController = require('../../../adapters/controllers/userController')

module.exports = (router) => {
    router.post('/user', (req, res) => userController.createUser(req, res))
    router.put('/user', jwt.authenticate(), (req, res) => userController.updateUser(req, res))
}
