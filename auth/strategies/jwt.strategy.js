const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../config');

/**
 * Passport JWT strategy options
 */
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwtSecret,
};

/**
 * Passport strategy to authenticate user with JWT
 */
const JwtStrategy = new Strategy(options, (payload, done) => {
	return done(null, payload);
});

module.exports = JwtStrategy;
