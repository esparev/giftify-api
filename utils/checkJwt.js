const boom = require('@hapi/boom');

/**
 * Checks if the user is authenticated with a jwt.
 * @param {object} context
 * @returns {object} user
 */
async function checkJwt(context) {
	const { user } = await context.authenticate('jwt', { session: false });
	if (!user) {
		throw boom.unauthorized('No tienes permiso para realizar esta acción');
	}
	return user;
}

module.exports = checkJwt;
