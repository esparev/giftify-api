const express = require('express');
const useGraphQL = require('./api/graphql');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const routerAuth = require('./auth');
const routerApi = require('./api/routes');

const {
	errorHandler,
	ormErrorHandler,
	boomErrorHandler,
} = require('./middlewares/error.handler');

/**
 * Creates an express app with all middlewares and routes configured
 */
const createApp = () => {
	const app = express();

	const limiter = rateLimit({
		windowMs: 15 * 1000, // 15 seconds
		max: 100, // limit each IP to 100 requests per windowMs
	});

	require('./auth');

	app.use(limiter);
	app.use(passport.initialize());
	app.use(express.json());
	app.use(bodyParser.json({ limit: '5mb' }));

	app.get('/', (req, res) => {
		res.send("Esparev's API");
	});

	routerAuth(app);
	routerApi(app);
	(async () => {
		await useGraphQL(app);
	})();

	app.use(boomErrorHandler);
	app.use(ormErrorHandler);
	app.use(errorHandler);

	return app;
};

module.exports = createApp;
