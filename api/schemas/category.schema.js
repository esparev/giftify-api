const Joi = require('joi');

const id = Joi.string().uuid({ version: 'uuidv4' });
const slug = Joi.string().min(3).max(30);
const name = Joi.string().min(3).max(30);
const hexColor = Joi.string().min(5).max(10);
const image = Joi.string().uri();

/**
 * Schema to validate the getCategory request
 */
const getCategorySchema = Joi.object({
	id: id.required(),
});

/**
 * Schema to validate the createCategory request
 */
const createCategorySchema = Joi.object({
	slug: slug.required(),
	name: name.required(),
	hexColor: hexColor.required(),
	image,
});

/**
 * Schema to validate the updateCategory request
 */
const updateCategorySchema = Joi.object({
	slug,
	name,
	hexColor,
	image,
});

module.exports = {
	getCategorySchema,
	createCategorySchema,
	updateCategorySchema,
};
