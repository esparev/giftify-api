// @ts-check
const express = require('express');
const passport = require('passport');
const PaymentMethodService = require('../services/payment-method.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
	checkRoles,
	belongsToUserById,
} = require('../../middlewares/auth.handler');

const router = express.Router();
const service = new PaymentMethodService();
const {
	getPaymentMethodSchema,
	createPaymentMethodSchema,
	updatePaymentMethodSchema,
} = require('../schemas/payment-method.schema');

const getAllPaymentMethods = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const paymentMethods = await service.find();
		res.status(200).json(paymentMethods);
	} catch (error) {
		next(error);
	}
};

const getPaymentMethods = async (req, res, next) => {
	try {
		const { id } = req.params;
		belongsToUserById(id);
		checkRoles(['admin']);
		const paymentMethods = await service.findByUser(id);
		res.status(200).json(paymentMethods);
	} catch (error) {
		next(error);
	}
};

const getPaymentMethod = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const paymentMethod = await service.findOne(id);
		res.status(200).json(paymentMethod);
	} catch (error) {
		next(error);
	}
};

const createPaymentMethod = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const body = req.body;
		const newPaymentMethod = await service.create(body);
		res
			.status(201)
			.json({ newPaymentMethod, message: 'payment method created' });
	} catch (error) {
		next(error);
	}
};

const updatePaymentMethod = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const body = req.body;
		const updatedPaymentMethod = await service.update(id, body);
		res
			.status(200)
			.json({ updatedPaymentMethod, message: 'payment method updated' });
	} catch (error) {
		next(error);
	}
};

const deletePaymentMethod = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const deletedPaymentMethod = await service.delete(id);
		res
			.status(200)
			.json({ deletedPaymentMethod, message: 'payment method deleted' });
	} catch (error) {
		next(error);
	}
};

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	getAllPaymentMethods
);
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getPaymentMethodSchema, 'params'),
	getPaymentMethod
);
router.get(
	'/user/:id',
	passport.authenticate('jwt', { session: false }),
	getPaymentMethods
);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createPaymentMethodSchema, 'body'),
	createPaymentMethod
);
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getPaymentMethodSchema, 'params'),
	validatorHandler(updatePaymentMethodSchema, 'params'),
	updatePaymentMethod
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	deletePaymentMethod
);

module.exports = router;
