module.exports = class extends Error {
    constructor (details = '') {
        super('Invalid credentials. ' + details)
        this.status = 400
    }
}