const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

/**
 * Order Service class to manage the logic of the orders.
 *
 * #### Example
 *
 * ```javascript
 * const service = new OrderService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all orders in the array of objects
 * service.find();
 * // Finds the order with the provided id
 * service.findOne(id);
 * // Finds all orders with the provided userId
 * service.findByUser(userId);
 * // Creates an order with the provided data
 * service.create(data);
 * // Updates the order with the provided id
 * service.update(id, changes);
 * // Deletes the order with the provided id
 * service.delete(id);
 * ```
 */
class OrderService {
	/**
	 * Finds all orders in the array of objects.
	 * @returns {array} Array with all orders
	 */
	async find() {
		const orders = await models.Order.findAll();
		return orders;
	}

	/**
	 * Finds the order with the provided id.
	 * @param {string} id - id of the order
	 * @returns {object} Object with the order
	 */
	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: ['user', 'gifts', 'address', 'paymentMethod'],
		});
		if (!order) {
			throw boom.notFound('Order not found');
		}
		return order;
	}

	/**
	 * Finds the orders with the provided userId.
	 * @param {string} userId - userId of the orders
	 * @returns {array} Array with all orders
	 */
	async findByUser(userId) {
		const orders = await models.Order.findAll({
			where: { userId },
			include: ['user'],
		});
		return orders;
	}

	/**
	 * Creates a order with the provided data.
	 * @param {object} data - data of the order
	 * @returns {object} Object with the order created
	 */
	async create(data) {
		const order = await models.Order.create(data);
		return order;
	}

	/**
	 * Updates the order with the provided id.
	 * @param {string} id - id of the order
	 * @param {object} changes - data of the order
	 * @returns {object} Object with the order updated
	 */
	async update(id, changes) {
		const order = await this.findOne(id);
		const response = await order.update(changes);
		return response;
	}

	/**
	 * Deletes the order with the provided id.
	 * @param {string} id - id of the order
	 * @returns {object} Object with the order deleted
	 */
	async delete(id) {
		const order = await this.findOne(id);
		await order.destroy();
		return { id };
	}
}

module.exports = OrderService;
