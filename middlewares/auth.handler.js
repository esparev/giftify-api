const boom = require('@hapi/boom');

/**
 * Checks if the user has the required role.
 */
function checkRoles(...roles) {
	return (req, res, next) => {
		const user = req.user;

		if (roles.includes(user.role)) {
			next();
		} else {
			next(
				boom.forbidden('You do not have permissions to perform this action')
			);
		}
	};
}

function belongsToUserById(userId) {
	return (req, res, next) => {
		const user = req.user;

		if (user.sub === userId || user.role === 'admin') {
			next();
		} else {
			next(
				boom.forbidden('You do not have permissions to perform this action')
			);
		}
	};
}

module.exports = { checkRoles, belongsToUserById };
