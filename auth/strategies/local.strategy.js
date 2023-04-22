const { Strategy } = require('passport-local');
const AuthService = require('../auth.service');
const service = new AuthService();

/**
 * Local passport strategy with various
 * validations to protect the user's account.
 */
const LocalStrategy = new Strategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async (email, password, done) => {
		try {
			const user = await service.getUser(email, password);
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = LocalStrategy;
