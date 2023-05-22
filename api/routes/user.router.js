// @ts-check
const express = require('express');
const passport = require('passport');
const UserService = require('../services/user.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();
const service = new UserService();
const {
	getUserSchema,
	createUserSchema,
	updateUserSchema,
} = require('../schemas/user.schema');

const getUsers = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const users = await service.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const getUser = async (req, res, next) => {
	try {
		const { username } = req.params;
		const user = await service.findByUsername(username);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	try {
		const body = req.body;
		const newUser = await service.create(body);
		res.status(201).json({ newUser, message: 'user created' });
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { username } = req.params;
		const body = req.body;
		const updatedUser = await service.update(username, body);
		res.status(200).json({ updatedUser, message: 'user updated' });
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { username } = req.params;
		const deletedUser = await service.delete(username);
		res.status(200).json({ deletedUser, message: 'user deleted' });
	} catch (error) {
		next(error);
	}
};

router.get('/', passport.authenticate('jwt', { session: false }), getUsers);
router.get(
	'/:username',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getUserSchema, 'params'),
	getUser
);
router.post('/', validatorHandler(createUserSchema, 'body'), createUser);
router.patch(
	'/:username',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getUserSchema, 'params'),
	validatorHandler(updateUserSchema, 'body'),
	updateUser
);
router.delete(
	'/:username',
	passport.authenticate('jwt', { session: false }),
	deleteUser
);

module.exports = router;
