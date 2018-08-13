const knex = require('knex')
const yaml2ddl = require('yaml2ddl')

module.exports = class {

    constructor ({ dialect }) {
        this.dialect = dialect
        this.builder = knex({ dialect })
    }

    generateSchema (schema) {
       return yaml2ddl.generate(schema, { dialect: this.dialect })
    }
}