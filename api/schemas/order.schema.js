const Joi = require('joi');

const id = Joi.string().uuid({ version: 'uuidv4' });
const total = Joi.number().min(0);
const status = Joi.string().valid('pending', 'approved', 'rejected');
const userId = Joi.string().uuid({ version: 'uuidv4' });
const paymentMethodId = Joi.string().uuid({ version: 'uuidv4' });

/**
 * Schema to validate the getOrder request
 */
const getOrderSchema = Joi.object({
	id: id.required(),
});

/**
 * Schema to validate the createOrder request
 */
const createOrderSchema = Joi.object({
	total: total.required(),
	status: status.required(),
	userId: userId.required(),
	paymentMethodId: paymentMethodId.required(),
});

/**
 * Schema to validate the updateOrder request
 */
const updateOrderSchema = Joi.object({
	status,
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema };
