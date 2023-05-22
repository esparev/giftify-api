// @ts-check
const express = require('express');
const passport = require('passport');
const CartService = require('../services/cart.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
	checkRoles,
	belongsToUserById,
} = require('../../middlewares/auth.handler');

const router = express.Router();
const service = new CartService();
const {
	getCartSchema,
	createCartSchema,
	updateCartSchema,
} = require('../schemas/cart.schema');

const getCarts = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const carts = await service.find();
		res.status(200).json(carts);
	} catch (error) {
		next(error);
	}
};

const getCart = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const cart = await service.findOne(id);
		res.status(200).json(cart);
	} catch (error) {
		next(error);
	}
};

const getUserCart = async (req, res, next) => {
	try {
		const { id } = req.params;
		belongsToUserById(id);
		checkRoles(['admin']);
		const cart = await service.findByUser(id);
		res.status(200).json(cart);
	} catch (error) {
		next(error);
	}
};

const createCart = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const body = req.body;
		const newCart = await service.create(body);
		res.status(201).json({ newCart, message: 'cart created' });
	} catch (error) {
		next(error);
	}
};

const updateCart = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const body = req.body;
		const updatedCart = await service.update(id, body);
		res.status(200).json({ updatedCart, message: 'cart updated' });
	} catch (error) {
		next(error);
	}
};

const deleteCart = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const deletedCart = await service.delete(id);
		res.status(200).json({ deletedCart, message: 'cart deleted' });
	} catch (error) {
		next(error);
	}
};

router.get('/', passport.authenticate('jwt', { session: false }), getCarts);
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getCartSchema, 'params'),
	getCart
);
router.get(
	'/user/:id',
	passport.authenticate('jwt', { session: false }),
	getUserCart
);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createCartSchema, 'body'),
	createCart
);
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getCartSchema, 'params'),
	validatorHandler(updateCartSchema, 'params'),
	updateCart
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	deleteCart
);

module.exports = router;
