const checkJwt = require('../../../utils/checkJwt');
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
	return service.create(data);
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
	return service.update(id, data);
};

/**
 * Deletes the gift with the provided id.
 * @param {string} id - id of the gift
 * @returns {object} Object with the gift deleted
 */
const deleteGift = async (_, { id }, context) => {
	const user = await checkJwt(context);
	await service.delete(id);
	return id;
};

module.exports = { gifts, gift, createGift, updateGift, deleteGift };
