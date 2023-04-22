const checkJwt = require('../../../utils/checkJwt');
const AddressService = require('../../services/address.service');
const service = new AddressService();

/**
 * Finds all addresses in the array of objects.
 * @returns {array} Array with all addresses
 */
const addresses = () => {
	return service.find();
};

/**
 * Finds the address with the provided id.
 * @param {id} id - id of the address
 * @returns {object} Object with the address
 */
const address = async (_, { id }, context) => {
	const user = await checkJwt(context);
	return service.findOne(id);
};

/**
 * Creates a address with the provided data.
 * @param {object} data - data of the address
 * @returns {object} Object with the address created
 */
const createAddress = async (_, { data }, context) => {
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
const updateAddress = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	return service.update(id, data);
};

/**
 * Deletes the address with the provided id.
 * @param {string} id - id of the address
 * @returns {object} Object with the address deleted
 */
const deleteAddress = async (_, { id }, context) => {
	const user = await checkJwt(context);
	await service.delete(id);
	return id;
};

module.exports = { addresses, address, createAddress, updateAddress, deleteAddress };
