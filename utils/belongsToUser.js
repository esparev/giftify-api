const boom = require('@hapi/boom');

/**
 * Checks if the user has the required role and is the same user by username.
 * @param {object} user - user object
 */
function belongsToUser(user, username) {
	if (!(user.role === 'admin' || user.username === username)) {
		throw boom.unauthorized('No tienes permisos para realizar esta acción');
	}
}

/**
 * Checks if the user has the required role and is the same user by id.
 * @param {object} user - user object
 */
function belongsToUserById(user, id) {
	if (!(user.role === 'admin' || user.sub === id)) {
		throw boom.unauthorized('No tienes permisos para realizar esta acción');
	}
}

module.exports = { belongsToUser, belongsToUserById };
