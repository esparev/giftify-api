const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const GiftService = require('../../services/gift.service');
const service = new GiftService();

/**
 * Finds all gifts in the array of objects.
 */
const gifts = () => {
	return service.find();
};

/**
 * Finds all gifts in the array of objects with the provided category.
 */
const giftsByCategory = (_, { category }) => {
	return service.findByCategory(category);
};

/**
 * Finds all gifts in the array of objects with the provided search input.
 */
const giftsBySearchInput = (_, { searchInput }) => {
	return service.findBySearchInput(searchInput);
};

/**
 * Finds the gift with the provided id.
 */
const gift = (_, { id }) => {
	return service.findOne(id);
};

/**
 * Creates a gift with the provided data.
 */
const createGift = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.create(data);
};

/**
 * Adds a gift to the cart.
 */
const addToCart = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.addToCart(data);
};

/**
 * Removes a gift from the cart.
 */
const removeFromCart = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.removeFromCart(data);
};

/**
 * Updates the gift with the provided id.
 */
const updateGift = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.update(id, data);
};

/**
 * Deletes the gift with the provided id.
 */
const deleteGift = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	await service.delete(id);
	return id;
};

module.exports = {
	gifts,
	giftsByCategory,
	giftsBySearchInput,
	gift,
	addToCart,
	removeFromCart,
	createGift,
	updateGift,
	deleteGift,
};
