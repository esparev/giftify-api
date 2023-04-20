const express = require('express');
const useGraphQL = require('./api/graphql');
// const passport = require('passport');

// require('./api/utils/auth');

const {
	errorHandler,
	ormErrorHandler,
	boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
	res.send("Esparev's API");
});

// app.use(passport.initialize());
app.use(express.json());

(async () => {
	await useGraphQL(app);
})();

app.use(errorHandler);
app.use(ormErrorHandler);
app.use(boomErrorHandler);

app.listen(port, () =>
	console.log(`Server running on http://localhost:${port}`)
);
