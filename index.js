const express = require('express');
const useGraphQL = require('./api/graphql');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const routerAuth = require('./auth');

require('./auth');

const {
	errorHandler,
	ormErrorHandler,
	boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3003;

const limiter = rateLimit({
	windowMs: 15 * 1000, // 15 seconds
	max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/', (req, res) => {
	res.send("Esparev's API");
});

routerAuth(app);
(async () => {
	await useGraphQL(app);
})();

app.use(errorHandler);
app.use(ormErrorHandler);
app.use(boomErrorHandler);

app.listen(port, () =>
	console.log(`Server running on http://localhost:${port}`)
);
