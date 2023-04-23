const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const { belongsToUserById } = require('../../../utils/belongsToUser');
const OrderService = require('../../services/order.service');
const service = new OrderService();

/**
 * Finds all orders in the array of objects.
 * @returns {array} Array with all orders
 */
const allOrders = async (_, {}, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.find();
};

/**
 * Finds all user orders in the array of objects.
 * @param {string} userId - id of the user
 * @returns {array} Array with all orders
 */
const orders = async (_, { userId }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	belongsToUserById(user, userId);
	return service.findByUser(userId);
};

/**
 * Finds the order with the provided id.
 * @param {id} id - id of the order
 * @returns {object} Object with the order
 */
const order = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.findOne(id);
};

/**
 * Creates a gift with the provided data.
 * @param {object} data - data of the gift
 * @returns {object} Object with the gift created
 */
const createOrder = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.create(data);
};

/**
 * Updates the order with the provided id.
 * @param {object} params - id and data of the order
 * @param {string} params.id - id of the order
 * @param {object} params.data - data of the order
 * @returns {object} Object with the order updated
 */
const updateOrder = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.update(id, data);
};

/**
 * Deletes the order with the provided id.
 * @param {string} id - id of the order
 * @returns {object} Object with the order deleted
 */
const deleteOrder = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	await service.delete(id);
	return id;
};

module.exports = {
	order,
	orders,
	allOrders,
	createOrder,
	updateOrder,
	deleteOrder,
};
