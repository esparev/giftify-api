const boom = require('@hapi/boom');

/**
 * Checks if the user has the required role.
 * @param {object} user - user object
 * @param  {array} roles - roles to check
 */
function checkRole(user, roles) {
	if (!roles.includes(user.role)) {
		throw boom.unauthorized('No tienes permisos para realizar esta acción');
	}
}

module.exports = checkRole;
