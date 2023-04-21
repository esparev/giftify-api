const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

/**
 * Payment Method Service class to manage the logic of the payment methods
 *
 * #### Example
 *
 * ```javascript
 * const service = new PaymentMethodService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all payment methods in the array of objects
 * service.find();
 * // Finds the payment method with the provided id
 * service.findOne(id);
 * // Creates a payment method with the provided data
 * service.create(data);
 * // Updates the payment method with the provided id
 * service.update(id, changes);
 * // Deletes the payment method with the provided id
 * service.delete(id);
 * ```
 */
class PaymentMethodService {
	/**
	 * Finds all payment methods in the array of objects
	 * @returns {Array} Array with all payment methods
	 */
	async find() {
		const paymentMethods = await models.PaymentMethod.findAll();
		return paymentMethods;
	}

	/**
	 * Finds the payment method with the provided id
	 * @param {id} id - id of the payment method
	 * @returns {Object} Object with the payment method
	 */
	async findOne(id) {
		const paymentMethod = await models.PaymentMethod.findByPk(id, {
			include: ['user'],
		});
		if (!paymentMethod) {
			throw boom.notFound('Payment method not found');
		}
		return paymentMethod;
	}

	/**
	 * Creates a payment method with the provided data
	 * @param {*} data - data of the payment method
	 * @returns {Object} Object with the payment method created
	 */
	async create(data) {
		const paymentMethod = await models.PaymentMethod.create(data);
		return paymentMethod;
	}

	/**
	 * Updates the payment method with the provided id
	 * @param {id} id - id of the payment method
	 * @param {*} changes - data of the payment method
	 * @returns {Object} Object with the payment method updated
	 */
	async update(id, changes) {
		const paymentMethod = await this.findOne(id);
		const response = await paymentMethod.update(changes);
		return response;
	}

	/**
	 * Deletes the payment method with the provided id
	 * @param {id} id - id of the payment method
	 * @returns {Object} Object with the payment method deleted
	 */
	async delete(id) {
		const paymentMethod = await this.findOne(id);
		await paymentMethod.destroy();
		return { id };
	}
}

module.exports = PaymentMethodService;
