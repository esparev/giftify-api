const checkJwt = require('../../../utils/checkJwt');
const PaymentMethodService = require('../../services/payment-method.service');
const service = new PaymentMethodService();

/**
 * Finds all payment methods in the array of objects.
 * @returns {array} Array with all payment methods
 */
const paymentMethods = () => {
	return service.find();
};

/**
 * Finds the payment method with the provided id.
 * @param {id} id - id of the payment method
 * @returns {object} Object with the payment method
 */
const paymentMethod = async (_, { id }, context) => {
	const user = await checkJwt(context);
	return service.findOne(id);
};

/**
 * Creates a payment method with the provided data.
 * @param {object} data - data of the payment method
 * @returns {object} Object with the payment method created
 */
const createPaymentMethod = async (_, { data }, context) => {
	const user = await checkJwt(context);
	return service.create(data);
};

/**
 * Updates the address with the provided id.
 * @param {object} params - id and data of the address
 * @param {string} params.id - id of the address
 * @param {object} params.data - data of the address
 * @returns {object} Object with the address updated
 */
const updatePaymentMethod = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	return service.update(id, data);
};

/**
 * Deletes the payment method with the provided id.
 * @param {string} id - id of the payment method
 * @returns {object} Object with the payment method deleted
 */
const deletePaymentMethod = async (_, { id }, context) => {
	const user = await checkJwt(context);
	await service.delete(id);
	return id;
};

module.exports = {
	paymentMethods,
	paymentMethod,
	createPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
};
