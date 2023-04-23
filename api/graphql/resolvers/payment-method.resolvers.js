const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const { belongsToUserById } = require('../../../utils/belongsToUser');
const PaymentMethodService = require('../../services/payment-method.service');
const service = new PaymentMethodService();

/**
 * Finds all payment methods in the array of objects.
 * @returns {array} Array with all payment methods
 */
const allPaymentMethods = async (_, {}, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.find();
};

/**
 * Finds all user payment methods in the array of objects.
 * @returns {array} Array with all payment methods
 */
const paymentMethods = async (_, { userId }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	belongsToUserById(user, userId);
	return service.findByUser(userId);
};

/**
 * Finds the payment method with the provided id.
 * @param {id} id - id of the payment method
 * @returns {object} Object with the payment method
 */
const paymentMethod = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.findOne(id);
};

/**
 * Creates a payment method with the provided data.
 * @param {object} data - data of the payment method
 * @returns {object} Object with the payment method created
 */
const createPaymentMethod = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
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
	checkRole(user, ['admin', 'user']);
	return service.update(id, data);
};

/**
 * Deletes the payment method with the provided id.
 * @param {string} id - id of the payment method
 * @returns {object} Object with the payment method deleted
 */
const deletePaymentMethod = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	await service.delete(id);
	return id;
};

module.exports = {
	paymentMethod,
	paymentMethods,
	allPaymentMethods,
	createPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethod,
};
