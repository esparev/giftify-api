const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../db/sequelize');
const CartService = require('./cart.service');
const OrderService = require('./order.service');
const AddressService = require('./address.service');
const PaymentMethodService = require('./payment-method.service');
const cartService = new CartService();
const orderService = new OrderService();
const addressService = new AddressService();
const paymentMethodService = new PaymentMethodService();

/**
 * User Service class to manage the logic of the users.
 *
 * #### Example
 *
 * ```javascript
 * const service = new UserService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all users in the array of objects
 * service.find();
 * // Finds the user with the provided id
 * service.findOne(id);
 * // Finds the user with the provided username
 * service.findByUsername(username);
 * // Finds the user with the provided email
 * service.findByEmail(email);
 * // Creates a user with the provided data
 * service.create(data);
 * // Updates the user with the provided username
 * service.update(username, changes);
 * // Deletes the user with the provided username
 * service.delete(username);
 * ```
 */
class UserService {
	/**
	 * Finds all users in the array of objects.
	 * @returns {array} Array with all users
	 */
	async find() {
		const users = await models.User.findAll();
		return users;
	}

	/**
	 * Finds the user with the provided id.
	 * @param {string} id - id of the user
	 * @returns {object} Object with the user
	 */
	async findOne(id) {
		const user = await models.User.findByPk(id, {
			include: ['addresses', 'paymentMethods', 'orders', 'cart'],
		});
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	/**
	 * Finds the user with the provided username.
	 * @param {string} username - username of the user
	 * @returns {object} Object with the user
	 */
	async findByUsername(username) {
		const user = await models.User.findOne({
			where: { username },
			include: ['addresses', 'paymentMethods', 'orders', 'cart'],
		});
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	/**
	 * Finds the user with the provided email.
	 * @param {string} email - email of the user
	 * @returns {object} Object with the user
	 */
	async findByEmail(email) {
		const user = await models.User.findOne({
			where: { email },
			include: ['addresses', 'paymentMethods', 'orders', 'cart'],
		});
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	/**
	 * Creates a user with the provided data and creates a cart for the user.
	 * @param {object} data - data of the user
	 * @returns {object} Object with the user created
	 */
	async create(data) {
		const hash = await bcrypt.hash(data.password, 13);
		const user = await models.User.create({ ...data, password: hash });

		delete user.dataValues.password;
		delete user.dataValues.recoveryToken;
		await cartService.create({ userId: user.id });

		return user;
	}

	/**
	 * Updates the user with the provided username.
	 * @param {username} username - username of the user
	 * @param {object} changes - data of the user
	 * @returns {object} Object with the user updated
	 */
	async update(username, changes) {
		const user = await this.findByUsername(username);
		const response = await user.update(changes);
		return response;
	}

	/**
	 * Deletes the user with the provided username
	 * and deletes all the addresses, payment methods,
	 * orders and cart of the user.
	 * @param {string} username - username of the user
	 * @returns {object} Object with the user deleted
	 */
	async delete(username) {
		const user = await this.findByUsername(username);
		const cart = await cartService.findByUser(user.id);
		const orders = await orderService.findByUser(user.id);
		const addresses = await addressService.findByUser(user.id);
		const paymentMethods = await paymentMethodService.findByUser(user.id);

		orders.map(async (order) => {
			await order.destroy();
		});
		addresses.map(async (address) => {
			await address.destroy();
		});
		paymentMethods.map(async (paymentMethod) => {
			await paymentMethod.destroy();
		});
		await cart.destroy();
		await user.destroy();

		return { username };
	}
}

module.exports = UserService;
