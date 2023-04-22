const express = require('express');
const passport = require('passport');
const AuthService = require('./auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login', passport.authenticate('local', { session: false }), login);
router.post('/recover', recover);
router.post('/change-password', changePassword);

/**
 * Login function to authenticate the user by signing a token.
 */
async function login(req, res, next) {
	try {
		const user = req.user;
		res.status(201).json(service.signToken(user));
	} catch (error) {
		next(error);
	}
}

/**
 * Sends an email to the user with a link to recover the password.
 */
async function recover(req, res, next) {
	try {
		const { email } = req.body;
		const response = await service.sendRecovery(email);
		res.json(response);
	} catch (error) {
		next(error);
	}
}

/**
 * Changes the user's password with the recovery token.
 */
async function changePassword(req, res, next) {
	try {
		const { token, newPassword } = req.body;
		const response = await service.changePassword(token, newPassword);
		res.json(response);
	} catch (error) {
		next(error);
	}
}

module.exports = router;
