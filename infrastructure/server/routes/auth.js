const authController = require('../../../adapters/controllers/authController')
const { jwt } = require('../../../adapters/middlewares')

module.exports = (router) => {
    router.post('/auth', (req, res) => authController.performAuth(req, res))
    router.get('/auth', jwt.authenticate(), (req, res) => authController.getAuth(req, res))
}
