const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

/**
 * Order Service class to manage the logic of the orders
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
	 * Finds all orders in the array of objects
	 * @returns {Array} Array with all orders
	 */
	async find() {
		const orders = await models.Order.findAll();
		return orders;
	}

	/**
	 * Finds the order with the provided id
	 * @param {id} id - id of the order
	 * @returns {Object} Object with the order
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
	 * Creates a order with the provided data
	 * @param {*} data - data of the order
	 * @returns {Object} Object with the order created
	 */
	async create(data) {
		const order = await models.Order.create(data);
		return order;
	}

	/**
	 * Updates the order with the provided id
	 * @param {id} id - id of the order
	 * @param {*} changes - data of the order
	 * @returns {Object} Object with the order updated
	 */
	async update(id, changes) {
		const order = await models.Order.update(id, changes);
		return order;
	}

	/**
	 * Deletes the order with the provided id
	 * @param {id} id - id of the order
	 * @returns {Object} Object with the order deleted
	 */
	async delete(id) {
		const order = await this.findOne(id);
		await order.destroy();
		return { id };
	}
}

module.exports = OrderService;
