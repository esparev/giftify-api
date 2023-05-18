const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

/**
 * Gift Service class to manage the logic of the gifts.
 *
 * #### Example
 *
 * ```javascript
 * const service = new GiftService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all gifts in the array of objects
 * service.find();
 * // Finds the gift with the provided id
 * service.findOne(id);
 * // Creates a gift with the provided data
 * service.create(data);
 * // Adds a gift to the cart
 * service.addToCart(data);
 * // Updates the gift with the provided id
 * service.update(id, changes);
 * // Deletes the gift with the provided id
 * service.delete(id);
 * ```
 */
class GiftService {
	/**
	 * Finds all gifts in the array of objects.
	 * @returns {array} Array with all gifts
	 */
	async find() {
		const gifts = await models.Gift.findAll({ include: ['category'] });
		return gifts;
	}

	/**
	 * Finds the gift with the provided id.
	 * @param {string} id - id of the gift
	 * @returns {object} Object with the gift
	 */
	async findOne(id) {
		const gift = await models.Gift.findByPk(id, {
			include: ['category', 'orders', 'carts'],
		});
		if (!gift) {
			throw boom.notFound('Gift not found');
		}
		return gift;
	}

	/**
	 * Creates a gift with the provided data.
	 * @param {object} data - data of the gift
	 * @returns {object} Object with the gift created
	 */
	async create(data) {
		const gift = await models.Gift.create(data);
		return gift;
	}

	/**
	 * Adds a gift to the cart.
	 * @param {object} data
	 */
	async addToCart(data) {
		const cartItem = await models.CartItem.create(data);
		return cartItem;
	}

	/**
	 * Updates the gift with the provided id.
	 * @param {string} id - id of the gift
	 * @param {object} changes - data of the gift
	 * @returns {object} Object with the gift updated
	 */
	async update(id, changes) {
		const gift = await this.findOne(id);
		const response = await gift.update(changes);
		return response;
	}

	/**
	 * Deletes the gift with the provided id.
	 * @param {string} id - id of the gift
	 * @returns {object} Object with the gift deleted
	 */
	async delete(id) {
		const gift = await this.findOne(id);
		await gift.destroy();
		return { id };
	}
}

module.exports = GiftService;
