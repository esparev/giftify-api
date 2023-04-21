const AuthService = require('../../services/auth.service');
const service = new AuthService();

/**
 * Logins a user with the provided email and password
 * and returns a token with the user information
 * @returns {*} token
 */
const login = async (_, { email, password }, context) => {
	const { user } = await context.authenticate('graphql-local', {
		email,
		password,
	});
	return service.signToken(user);
};

module.exports = { login };
