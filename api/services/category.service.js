const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

/**
 * Category Service class to manage the logic of the categories
 *
 * #### Example
 *
 * ```javascript
 * const service = new CategoryService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all categories in the array of objects
 * service.find();
 * // Finds the category with the provided id
 * service.findOne(id);
 * // Finds the category with the provided slug
 * service.findBySlug(slug);
 * // Creates a category with the provided data
 * service.create(data);
 * // Updates the category with the provided slug
 * service.update(slug, changes);
 * // Deletes the category with the provided slug
 * service.delete(slug);
 * ```
 */
class CategoryService {
	/**
	 * Finds all categories in the array of objects
	 * @returns {Array} Array with all categories
	 */
	async find() {
		const categories = await models.Category.findAll();
		return categories;
	}

	/**
	 * Finds the category with the provided id
	 * @param {id} id - id of the category
	 * @returns {Object} Object with the category
	 */
	async findOne(id) {
		const category = await models.Category.findByPk(id, {
			include: ['gifts'],
		});
		if (!category) {
			throw boom.notFound('Category not found');
		}
		return category;
	}

	/**
	 * Finds the category with the provided slug
	 * @param {string} slug - slug of the category
	 * @returns {Object} Object with the category
	 */
	async findBySlug(slug) {
		const category = await models.Category.findOne({
			where: { slug },
			include: ['gifts'],
		});
		if (!category) {
			throw boom.notFound('Category not found');
		}
		return category;
	}

	/**
	 * Creates a category with the provided data
	 * @param {*} data - data of the category
	 * @returns {Object} Object with the category created
	 */
	async create(data) {
		const category = await models.Category.create(data);
		return category;
	}

	/**
	 * Updates the category with the provided slug
	 * @param {slug} slug - slug of the category
	 * @param {*} changes - data of the category
	 * @returns {Object} Object with the category updated
	 */
	async update(slug, changes) {
		const category = await this.findBySlug(slug);
		const response = await category.update(changes);
		return response;
	}

	/**
	 * Deletes the category with the provided slug
	 * @param {slug} slug - slug of the category
	 * @returns {Object} Object with the category deleted
	 */
	async delete(slug) {
		const category = await this.findBySlug(slug);
		await category.destroy();
		return { slug };
	}
}

module.exports = CategoryService;
