module.exports = class extends Error {
    constructor (details = '') {
        super('User already exists. ' + details)
        this.status = 400
    }
}