const boom = require('@hapi/boom');

/**
 * Validates the input data of a request that is made
 * through a route matching the defined schema validation.
 */
function validatorHandler(schema, property) {
	return (req, res, next) => {
		const data = req[property];
		const { error } = schema.validate(data, { abortEarly: false });

		if (error) return next(boom.badRequest(error));

		next();
	};
}

module.exports = validatorHandler;
