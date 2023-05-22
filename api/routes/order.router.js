// @ts-check
const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.service');
const validatorHandler = require('../../middlewares/validator.handler');
const {
	checkRoles,
	belongsToUserById,
} = require('../../middlewares/auth.handler');

const router = express.Router();
const service = new OrderService();
const {
	getOrderSchema,
	createOrderSchema,
	updateOrderSchema,
} = require('../schemas/order.schema');

const getAllOrders = async (req, res, next) => {
	try {
		checkRoles(['admin']);
		const orders = await service.find();
		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};

const getOrders = async (req, res, next) => {
	try {
		const { id } = req.params;
		belongsToUserById(id);
		checkRoles(['admin']);
		const orders = await service.findByUser(id);
		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};

const getOrder = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const order = await service.findOne(id);
		res.status(200).json(order);
	} catch (error) {
		next(error);
	}
};

const createOrder = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const body = req.body;
		const newOrder = await service.create(body);
		res.status(201).json({ newOrder, message: 'order created' });
	} catch (error) {
		next(error);
	}
};

const updateOrder = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const body = req.body;
		const updatedOrder = await service.update(id, body);
		res.status(200).json({ updatedOrder, message: 'order updated' });
	} catch (error) {
		next(error);
	}
};

const deleteOrder = async (req, res, next) => {
	try {
		checkRoles(['admin', 'user']);
		const { id } = req.params;
		const deletedOrder = await service.delete(id);
		res.status(200).json({ deletedOrder, message: 'order deleted' });
	} catch (error) {
		next(error);
	}
};

router.get('/', passport.authenticate('jwt', { session: false }), getAllOrders);
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getOrderSchema, 'params'),
	getOrder
);
router.get(
	'/user/:id',
	passport.authenticate('jwt', { session: false }),
	getOrders
);
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(createOrderSchema, 'body'),
	createOrder
);
router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validatorHandler(getOrderSchema, 'params'),
	validatorHandler(updateOrderSchema, 'body'),
	updateOrder
);
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	deleteOrder
);

module.exports = router;
