const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const CartService = require('../../services/cart.service');
const service = new CartService();
const { belongsToUserById } = require('../../../utils/belongsToUser');

/**
 * Finds all carts in the array of objects.
 */
const carts = async (_, {}, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.find();
};

/**
 * Finds the cart with the provided id.
 */
const cart = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.findOne(id);
};

/**
 * Finds the cart with the provided userId.
 */
const userCart = async (_, { userId }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	belongsToUserById(user, userId);
	return service.findByUser(userId);
};

/**
 * Creates a cart with the provided data.
 */
const createCart = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.create(data);
};

/**
 * Updates the cart with the provided id.
 */
const updateCart = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.update(id, data);
};

/**
 * Deletes the cart with the provided id.
 */
const deleteCart = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	await service.delete(id);
	return id;
};

module.exports = { carts, cart, userCart, createCart, updateCart, deleteCart };
