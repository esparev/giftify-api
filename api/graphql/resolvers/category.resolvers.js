const boom = require('@hapi/boom');
const CategoryService = require('../../services/category.service');
const service = new CategoryService();

/**
 * Finds all categories in the array of objects
 * @returns {array} Array with all categories
 */
const categories = () => {
	return service.find();
};

/**
 * Finds the category with the provided id
 * @param {id} id - id of the category
 * @returns {object} Object with the category
 */
const category = (_, { id }) => {
	return service.findOne(id);
};

/**
 * Creates a category with the provided data
 * @param {object} data - data of the category
 * @returns {object} Object with the category created
 */
const createCategory = async (_, { data }, context) => {
	const { user } = await context.authenticate('jwt', { session: false });
	if (!user) {
		throw boom.unauthorized('No tienes permiso para realizar esta acción');
	}
	return service.create(data);
};

/**
 * Updates the category with the provided id
 * @param {object} params - id and data of the category
 * @param {string} params.id - id of the category
 * @param {object} params.data - data of the category
 * @returns {object} Object with the category updated
 */
const updateCategory = async (_, { slug, data }, context) => {
	const { user } = await context.authenticate('jwt', { session: false });
	if (!user) {
		throw boom.unauthorized('No tienes permiso para realizar esta acción');
	}
	return service.update(slug, data);
};

/**
 * Deletes the category with the provided slug
 * @param {string} slug - slug of the category
 * @returns {object} Object with the category deleted
 */
const deleteCategory = async (_, { slug }, context) => {
	const { user } = await context.authenticate('jwt', { session: false });
	if (!user) {
		throw boom.unauthorized('No tienes permiso para realizar esta acción');
	}
	await service.delete(slug);
	return slug;
};

module.exports = { categories, category, createCategory, updateCategory, deleteCategory };
