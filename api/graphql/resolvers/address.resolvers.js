const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const { belongsToUserById } = require('../../../utils/belongsToUser');
const AddressService = require('../../services/address.service');
const service = new AddressService();

/**
 * Finds all addresses in the array of objects.
 * @returns {array} Array with all addresses
 */
const allAddresses = async (_, {}, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.find();
};

/**
 * Finds all user addresses in the array of objects.
 * @param {string} userId - id of the user
 * @returns {array} Array with all addresses
 */
const addresses = async (_, { userId }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	belongsToUserById(user, userId);
	return service.findByUser(userId);
};

/**
 * Finds the address with the provided id.
 * @param {string} id - id of the address
 * @returns {object} Object with the address
 */
const address = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.findOne(id);
};

/**
 * Creates a address with the provided data.
 * @param {object} data - data of the address
 * @returns {object} Object with the address created
 */
const createAddress = async (_, { data }, context) => {
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
const updateAddress = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.update(id, data);
};

/**
 * Deletes the address with the provided id.
 * @param {string} id - id of the address
 * @returns {object} Object with the address deleted
 */
const deleteAddress = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	await service.delete(id);
	return id;
};

module.exports = {
	address,
	addresses,
	allAddresses,
	createAddress,
	updateAddress,
	deleteAddress,
};
