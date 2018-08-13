module.exports = class {

    constructor ({ id = null, email, password, firstname, lastname, address, city, country }) {
        this.id = id
        this.email = email
        this.password = password
        this.firstname = firstname
        this.lastname = lastname
        this.address = address
        this.city = city
        this.country = country
    }
}