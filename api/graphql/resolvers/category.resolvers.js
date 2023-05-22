const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const CategoryService = require('../../services/category.service');
const service = new CategoryService();

/**
 * Finds all categories in the array of objects.
 */
const categories =  () => {
	return service.find();
};

/**
 * Finds the category with the provided id.
 */
const category = (_, { id }) => {
	return service.findOne(id);
};

/**
 * Creates a category with the provided data.
 */
const createCategory = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.create(data);
};

/**
 * Updates the category with the provided id.
 */
const updateCategory = async (_, { slug, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.update(slug, data);
};

/**
 * Deletes the category with the provided slug.
 */
const deleteCategory = async (_, { slug }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	await service.delete(slug);
	return slug;
};

module.exports = { categories, category, createCategory, updateCategory, deleteCategory };
