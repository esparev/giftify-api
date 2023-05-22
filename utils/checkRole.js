const boom = require('@hapi/boom');

/**
 * Checks if the user has the required role.
 * @param {object} user - user object
 * @param  {array} roles - roles to check
 */
function checkRole(user, roles) {
	if (!roles.includes(user.role)) {
		throw boom.forbidden('You do not have permissions to perform this action');
	}
}

module.exports = checkRole;
