const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const GiftService = require('../../services/gift.service');
const service = new GiftService();

/**
 * Finds all gifts in the array of objects.
 * @returns {array} Array with all gifts
 */
const gifts = () => {
	return service.find();
};

/**
 * Finds all gifts in the array of objects with the provided category.
 * @param {string} category
 * @returns {array} Array with all the filtered gifts
 */
const giftsByCategory = (_, { category }) => {
	return service.findByCategory(category);
};

/**
 * Finds all gifts in the array of objects with the provided search input.
 * @param {*} searchInput
 * @returns {array} Array with all the filtered gifts
 */
const giftsBySearchInput = (_, { searchInput }) => {
	return service.findBySearchInput(searchInput);
};

/**
 * Finds the gift with the provided id.
 * @param {id} id - id of the gift
 * @returns {object} Object with the gift
 */
const gift = (_, { id }) => {
	return service.findOne(id);
};

/**
 * Creates a gift with the provided data.
 * @param {object} data - data of the gift
 * @returns {object} Object with the gift created
 */
const createGift = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.create(data);
};

/**
 * Adds a gift to the cart.
 * @param {object} data - data of the item to add to the cart
 * @returns {object} Object with the gift added to the cart
 */
const addToCart = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.addToCart(data);
};

/**
 * Updates the gift with the provided id.
 * @param {object} params - id and data of the gift
 * @param {string} params.id - id of the gift
 * @param {object} params.data - data of the gift
 * @returns {object} Object with the gift updated
 */
const updateGift = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.update(id, data);
};

/**
 * Deletes the gift with the provided id.
 * @param {string} id - id of the gift
 * @returns {object} Object with the gift deleted
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
	createGift,
	updateGift,
	deleteGift,
};
