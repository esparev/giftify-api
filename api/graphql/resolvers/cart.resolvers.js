const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const CartService = require('../../services/cart.service');
const service = new CartService();

/**
 * Finds all carts in the array of objects.
 * @returns {array} Array with all carts
 */
const carts = async (_, {}, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.find();
};

/**
 * Finds the cart with the provided id.
 * @param {id} id - id of the cart
 * @returns {object} Object with the cart
 */
const cart = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.findOne(id);
};

/**
 * Creates a cart with the provided data.
 * @param {object} data - data of the cart
 * @returns {object} Object with the cart created
 */
const createCart = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.create(data);
};

/**
 * Updates the cart with the provided id.
 * @param {object} params - id and data of the cart
 * @param {string} params.id - id of the cart
 * @param {object} params.data - data of the cart
 * @returns {object} Object with the cart updated
 */
const updateCart = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.update(id, data);
};

/**
 * Deletes the cart with the provided id.
 * @param {string} id - id of the cart
 * @returns {object} Object with the cart deleted
 */
const deleteCart = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	await service.delete(id);
	return id;
};

module.exports = { carts, cart, createCart, updateCart, deleteCart };
