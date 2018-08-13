const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:')
const logger = require('../../logger')

module.exports = class {

    constructor () {
        db.on('trace', sql => {
            logger.log('debug', 'database', sql)
        })
    }

    execute (sql) {
        return new Promise((resolve, reject) => {
            db.run(sql, function (err) {
                if (err) {
                    return reject(err)
                }
                resolve({
                    insertedID: this.lastID,
                    nbChanges: this.changes 
                })
            })
        })
    }

    query (sql) {
        return new Promise((resolve, reject) => {
            db.all(sql, (err, results) => {
                if (err) {
                    return reject(err)
                }
                resolve(results)
            })
        })
    }

}