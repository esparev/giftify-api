const Joi = require('joi');

const id = Joi.string().uuid({ version: 'uuidv4' });
const quantity = Joi.number().integer().min(0).default(0);
const total = Joi.number().min(0).default(0);
const userId = Joi.string().uuid({ version: 'uuidv4' });

/**
 * Schema to validate the getCart request
 */
const getCartSchema = Joi.object({
	id: id.required(),
});

/**
 * Schema to validate the createCart request
 */
const createCartSchema = Joi.object({
	quantity,
	total,
	userId: userId.required(),
});

/**
 * Schema to validate the updateCart request
 */
const updateCartSchema = Joi.object({
	quantity,
	total,
});

module.exports = { getCartSchema, createCartSchema, updateCartSchema };
