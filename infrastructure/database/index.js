const fs = require('fs')
const logger = require('../logger')
const SQLiteDatabase = require('./context/sqlite')
const SQLQueryBuilder = require('./queryBuilders/sql')

let _dbInstance, _queryBuilder

module.exports = class {

    constructor () {
        if (_dbInstance) {
            return
        }
        _dbInstance = new SQLiteDatabase()
        _queryBuilder = new SQLQueryBuilder({ dialect: 'sqlite' })
        this._createSchema()
    }

    get instance() {
        return _dbInstance
    }

    get queryBuilder () {
        return _queryBuilder.builder
    }

    async _createSchema () {
        const userSchemaQuery = _queryBuilder.generateSchema(fs.readFileSync(__dirname + '/schemas/user.yaml'))

        try {
            await Promise.all([
                _dbInstance.execute(userSchemaQuery)
            ])
            logger.log('info', 'database', 'Schema initialized')
        }
        catch (e) {
            logger.log('error', 'database', e)
        }
    }

}