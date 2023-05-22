const Joi = require('joi');

const id = Joi.string().uuid({ version: 'uuidv4' });
const name = Joi.string();
const description = Joi.string();
const price = Joi.number().min(0);
const image = Joi.string().uri();
const rating = Joi.number().min(0).max(5);
const quantity = Joi.number().min(0);
const categoryId = Joi.string().uuid({ version: 'uuidv4' });

/**
 * Schema to validate the getGift request
 */
const getGiftSchema = Joi.object({
	id: id.required(),
});

/**
 * Schema to validate the createGift request
 */
const createGiftSchema = Joi.object({
	name: name.required(),
	description: description.required(),
	price: price.required(),
	image: image.required(),
	rating,
	quantity: quantity.required(),
	categoryId: categoryId.required(),
});

/**
 * Schema to validate the updateGift request
 */
const updateGiftSchema = Joi.object({
	name,
	description,
	price,
	image,
	rating,
	quantity,
});

module.exports = { getGiftSchema, createGiftSchema, updateGiftSchema };
