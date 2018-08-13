module.exports = class extends Error {
    constructor (details = '') {
        super('User not found. ' + details)
        this.status = 404
    }
}