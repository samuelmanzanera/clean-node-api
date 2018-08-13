const jwt = require('jsonwebtoken')

module.exports = {

    createToken (userData) {
        return new Promise((resolve, reject) => {
            jwt.sign({ 
                sub: userData.id, 
                data: userData,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                aud: process.env.JWT_ISSUER,
                iss: process.env.JWT_ISSUER
            }, process.env.JWT_TOKEN, (err, token) => {
                if (err) {
                    return reject(err)
                }
                resolve(token)
            })
        })
    }

}