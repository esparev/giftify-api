const express = require('express');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const authRouter = require('./auth.router');
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);

const limiter = rateLimit({
	windowMs: 15 * 1000, // 15 seconds
	max: 3, // limit each IP to 100 requests per windowMs
  message: 'Has excedido el número de intentos, intenta de nuevo en 15 segundos'
});

function routerAuth(app) {
	const router = express.Router();

	app.use('/api/v1', router);
	router.use('/auth', limiter, authRouter);
}

module.exports = routerAuth;
