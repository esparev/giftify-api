const { ValidationError } = require('sequelize');

/**
 * Handles the general application errors and sends them to the client.
 */
function errorHandler(err, req, res, next) {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}

/**
 * Handles the application errors of type boom and sends them to the client.
 */
function boomErrorHandler(err, req, res, next) {
	if (err.isBoom) {
		const { output } = err;
		res.status(output.statusCode).json(output.payload);
	} else {
		next(err);
	}
}

/**
 * Handles the application errors of type Sequelize and sends them to the client.
 */
function ormErrorHandler(err, req, res, next) {
	if (err instanceof ValidationError) {
		res.status(409).json({
			statusCode: 409,
			message: err.name,
			stack: err.errors,
		});
	}
	next(err);
}

module.exports = { errorHandler, boomErrorHandler, ormErrorHandler };
