const util = require('util')
const logger = require('../../infrastructure/logger')

module.exports = {
    json (err, res) {
        const errorMessage = err.message || util.format(err)
        logger.log('error', 'api', errorMessage)
        return res.status(err.status || 500).json({ error: errorMessage })
    },

    fromValidation (err, res) {
        res.status(400).json({ error: error.details.map(d => d.message) })
    }
}