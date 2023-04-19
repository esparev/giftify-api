const GiftService = require('../../services/gift.service');
const service = new GiftService();

/**
 * Finds all gifts in the array of objects
 * @returns {Array} Array with all gifts
 */
const gifts = () => {
	return service.find();
};

/**
 * Finds the gift with the provided id
 * @param {id} id - id of the gift
 * @returns {Object} Object with the gift
 */
const gift = (_, { id }) => {
	return service.findOne(id);
};

/**
 * Creates a gift with the provided data
 * @param {*} data - data of the gift
 * @returns {Object} Object with the gift created
 */
const createGift = (_, { data }) => {
	return service.create(data);
};

/**
 * Updates the gift with the provided id
 * @param {id} id - id of the gift
 * @param {data} changes - data of the gift
 * @returns {Object} Object with the gift updated
 */
const updateGift = (_, { id, data }) => {
	return service.update(id, data);
};

/**
 * Deletes the gift with the provided id
 * @param {id} id - id of the gift
 * @returns {Object} Object with the gift deleted
 */
const deleteGift = async (_, { id }) => {
	await service.delete(id);
	return id;
};

module.exports = { gifts, gift, createGift, updateGift, deleteGift };
