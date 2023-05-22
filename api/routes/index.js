// @ts-check
const express = require('express');
const addressRouter = require('./address.router');
const cartRouter = require('./cart.router');
const categoryRouter = require('./category.router');
const giftRouter = require('./gift.router');
const orderRouter = require('./order.router');
const paymentMethodRouter = require('./payment-method.router');
const userRouter = require('./user.router');

function routerApi(app) {
	const router = express.Router();

	// Parent route
	app.use('/api/v1', router);
	// Children routes
	router.use('/addresses', addressRouter);
	router.use('/carts', cartRouter);
	router.use('/categories', categoryRouter);
	router.use('/gifts', giftRouter);
	router.use('/orders', orderRouter);
	router.use('/payment-methods', paymentMethodRouter);
	router.use('/users', userRouter);
}

module.exports = routerApi;
