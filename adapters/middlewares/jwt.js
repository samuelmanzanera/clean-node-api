const passport = require('passport')
const passportJWT = require("passport-jwt")

const ExtractJwt = passportJWT.ExtractJwt;  
const Strategy = passportJWT.Strategy;  

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_ISSUER
}

const { FindUserById } = require('../../core/useCases')
const { UserRepository } = require('../repositories')
const authHandler = new FindUserById(UserRepository)

passport.use(new Strategy(opts, async (jwt_payload, done) => {
    try {
        const user = await authHandler.execute({ id: jwt_payload.sub })
        if (!user) {
            return done(null, false)
        }
        done(null, user)
    }
    catch (e) {
        return done(e, false)
    }
}));

module.exports = {
    initialize: () => {
        return passport.initialize()
    },
    authenticate: () => {
        return passport.authenticate("jwt", { session: false })
    }
}