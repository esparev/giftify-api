const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');
const CartService = require('./cart.service');
const cartService = new CartService();

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
 * // Finds all gifts in the array of objects with the provided category
 * service.findByCategory(category);
 * // Finds all gifts in the array of objects with the provided search input
 * service.findBySearchInput(searchInput);
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
	 * Finds all gifts in the array of objects with the provided category.
	 * @param {string} category - category of the gift
	 * @returns {array} Array with all the filtered gifts
	 */
	async findByCategory(category) {
		const gifts = await models.Gift.findAll({ include: ['category'] });
		const filteredGifts = gifts.filter(
			(gift) => gift.category.name === category
		);
		return filteredGifts;
	}

	/**
	 * Finds all gifts in the array of objects with the provided search input.
	 * @param {string} searchInput
	 * @returns {array} Array with all the filtered gifts
	 */
	async findBySearchInput(searchInput) {
		const gifts = await models.Gift.findAll({ include: ['category'] });
		const filteredGifts = gifts.filter((gift) =>
			gift.name.toLowerCase().includes(searchInput.toLowerCase())
		);
		return filteredGifts;
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
	 * Adds a gift to the cart and updates the info on the cart.
	 * @param {object} data
	 */
	async addToCart(data) {
		const gift = await this.findOne(data.giftId);
		const cart = await cartService.findOne(data.cartId);
		const cartItem = await models.CartItem.findOne({
			where: { giftId: data.giftId, cartId: data.cartId },
		});
		let item;

		if (cartItem) {
			item = await cartItem.update({
				quantity: cartItem.dataValues.quantity + data.quantity,
			});
		} else {
			item = await models.CartItem.create(data);
		}

		const cartQuantity = cart.dataValues.quantity;
		const cartTotal = cart.dataValues.total;
		const giftPrice = gift.dataValues.price;

		await cart.update({
			quantity: cartQuantity + data.quantity,
			total: cartTotal + giftPrice * data.quantity,
		});

		return item;
	}

	/**
	 * Removes a gift from the cart and updates the info on the cart.
	 * @param {object} data
	 */
	async removeFromCart(data) {
		const gift = await this.findOne(data.giftId);
		const cart = await cartService.findOne(data.cartId);
		const cartItem = await models.CartItem.findOne({
			where: { giftId: data.giftId, cartId: data.cartId },
		});

		const cartQuantity = cart.dataValues.quantity;
		const cartTotal = cart.dataValues.total;
		const giftPrice = gift.dataValues.price;

		await cart.update({
			quantity: cartQuantity - data.quantity,
			total: cartTotal - giftPrice * data.quantity,
		});

		if (cartItem.dataValues.quantity > 1) {
			await cartItem.update({
				quantity: cartItem.dataValues.quantity - data.quantity,
			});
		} else {
			await cartItem.destroy();
		}

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
