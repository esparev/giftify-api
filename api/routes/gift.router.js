// @ts-check
const express = require('express');
const passport = require('passport');
const GiftService = require('../services/gift.service');
const validatorHandler = require('../../middlewares/validator.handler');
const { checkRoles } = require('../../middlewares/auth.handler');

const router = express.Router();
const service = new GiftService();
const {
	getGiftSchema,
	createGiftSchema,
	updateGiftSchema,
} = require('../schemas/gift.schema');

const getGifts = async (req, res, next) => {
	try {
		console.log(req.query.category);
		const gifts = await service.find(req.query);
		res.status(200).json(gifts);
	} catch (error) {
		next(error);
	}
};

const getGift = async (req, res, next) => {
	try {
		const { id } = req.params;
		const gift = await service.findOne(id);
		res.status(200).json(gift);
	} catch (error) {
		next(error);
	}
};

const createGift = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const body = req.body;
		const newGift = await service.create(body);
		res.status(201).json({ newGift, message: 'gift created' });
	} catch (error) {
		next(error);
	}
};

const updateGift = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const { id } = req.params;
		const body = req.body;
		const updatedGift = await service.update(id, body);
		res.status(200).json({ updatedGift, message: 'gift updated' });
	} catch (error) {
		next(error);
	}
};

const deleteGift = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const { id } = req.params;
		const deletedGift = await service.delete(id);
		res.status(200).json({ deletedGift, message: 'gift deleted' });
	} catch (error) {
		next(error);
	}
};

const addToCart = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const body = req.body;
		const addToCart = await service.addToCart(body);
		res.status(201).json({ addToCart, message: 'gift added to cart' });
	} catch (error) {
		next(error);
	}
};

const removeFromCart = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const body = req.body;
		const removeFromCart = await service.removeFromCart(body);
		res.status(200).json({ removeFromCart, message: 'gift removed from cart' });
	} catch (error) {
		next(error);
	}
};

router.get('/', getGifts);
router.get('/:id', validatorHandler(getGiftSchema, 'params'), getGift);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createGiftSchema, 'body'),
	createGift
);
router.post(
	'/add-to-cart',
	passport.authenticate('jwt', { session: false }),
	addToCart
);
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getGiftSchema, 'params'),
	validatorHandler(updateGiftSchema, 'params'),
	updateGift
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	deleteGift
);
router.post(
	'/remove-from-cart',
	passport.authenticate('jwt', { session: false }),
	removeFromCart
);

module.exports = router;
