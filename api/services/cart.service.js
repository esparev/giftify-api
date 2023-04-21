const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

/**
 * Cart Service class to manage the logic of the carts
 *
 * #### Example
 *
 * ```javascript
 * const service = new CartService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all carts in the array of objects
 * service.find();
 * // Finds the cart with the provided id
 * service.findOne(id);
 * // Creates a cart with the provided data
 * service.create(data);
 * // Updates the cart with the provided id
 * service.update(id, changes);
 * // Deletes the cart with the provided id
 * service.delete(id);
 * ```
 */
class CartService {
	/**
	 * Finds all carts in the array of objects
	 * @returns {Array} Array with all carts
	 */
	async find() {
		const carts = await models.Cart.findAll();
		return carts;
	}

	/**
	 * Finds the cart with the provided id
	 * @param {string} id - id of the cart
	 * @returns {Object} Object with the cart
	 */
	async findOne(id) {
		const cart = await models.Cart.findByPk(id, {
			include: ['user', 'gifts'],
		});
		if (!cart) {
			throw boom.notFound('Cart not found');
		}
		return cart;
	}

	/**
	 * Creates a cart with the provided data
	 * @param {*} data - data of the cart
	 * @returns {Object} Object with the cart created
	 */
	async create(data) {
		const cart = await models.Cart.create(data);
		return cart;
	}

	/**
	 * Updates the cart with the provided id
	 * @param {string} id - id of the cart
	 * @param {*} changes - data of the cart
	 * @returns {Object} Object with the cart updated
	 */
	async update(id, changes) {
		const cart = await this.findOne(id);
		const response = await cart.update(changes);
		return response;
	}

	/**
	 * Deletes the cart with the provided id
	 * @param {string} id - id of the cart
	 * @returns {Object} Object with the cart deleted
	 */
	async delete(id) {
		const cart = this.findOne(id);
		await cart.destroy();
		return { id };
	}
}

module.exports = CartService;
