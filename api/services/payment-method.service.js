const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../db/sequelize');
const checkNetwork = require('../../utils/checkNetwork');

/**
 * Payment Method Service class to manage the logic of the payment methods.
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
 * // Finds all payment methods with the provided userId
 * service.findByUser(userId);
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
	 * Finds all payment methods in the array of objects.
	 * @returns {array} Array with all payment methods
	 */
	async find() {
		const paymentMethods = await models.PaymentMethod.findAll();
		return paymentMethods;
	}

	/**
	 * Finds the payment method with the provided id.
	 * @param {string} id - id of the payment method
	 * @returns {object} Object with the payment method
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
	 * Finds the paymentMethods with the provided userId.
	 * @param {string} userId - userId of the paymentMethods
	 * @returns {array} Array with all paymentMethods
	 */
	async findByUser(userId) {
		const paymentMethods = await models.PaymentMethod.findAll({
			where: { userId },
			include: ['user'],
		});
		return paymentMethods;
	}

	/**
	 * Creates a payment method with the provided data.
	 * @param {object} data - data of the payment method
	 * @returns {object} Object with the payment method created
	 */
	async create(data) {
		const hashedNumber = await bcrypt.hash(data.number, 13);
		const hashedCvv = await bcrypt.hash(data.cvv, 13);
		const last4 = data.number.slice(-4);
		const network = checkNetwork(data.number);

		const paymentMethod = await models.PaymentMethod.create({
			...data,
			last4: last4,
			number: hashedNumber,
			network: network,
			cvv: hashedCvv,
		});

		delete paymentMethod.dataValues.number;
		delete paymentMethod.dataValues.cvv;

		return paymentMethod;
	}

	/**
	 * Updates the payment method with the provided id.
	 * @param {string} id - id of the payment method
	 * @param {object} changes - data of the payment method
	 * @returns {object} Object with the payment method updated
	 */
	async update(id, changes) {
		const paymentMethod = await this.findOne(id);
		const response = await paymentMethod.update(changes);
		return response;
	}

	/**
	 * Deletes the payment method with the provided id.
	 * @param {string} id - id of the payment method
	 * @returns {object} Object with the payment method deleted
	 */
	async delete(id) {
		const paymentMethod = await this.findOne(id);
		await paymentMethod.destroy();
		return { id };
	}
}

module.exports = PaymentMethodService;
