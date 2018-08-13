module.exports = {
    format (user) {
        return {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.lastname,
            city: user.city,
            country: user.country
        }
    }
}