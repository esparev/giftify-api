const AddressService = require('../../services/address.service');
const service = new AddressService();

/**
 * Finds all addresses in the array of objects
 * @returns {Array} Array with all addresses
 */
const addresses = () => {
	return service.find();
};

/**
 * Finds the address with the provided id
 * @param {id} id - id of the address
 * @returns {Object} Object with the address
 */
const address = (_, { id }) => {
	return service.findOne(id);
};

/**
 * Creates a address with the provided data
 * @param {*} data - data of the address
 * @returns {Object} Object with the address created
 */
const createAddress = (_, { data }) => {
	return service.create(data);
};

/**
 * Updates the address with the provided id
 * @param {id} id - id of the address
 * @param {data} changes - data of the address
 * @returns {Object} Object with the address updated
 */
const updateAddress = (_, { id, data }) => {
	return service.update(id, data);
};

/**
 * Deletes the address with the provided id
 * @param {id} id - id of the address
 * @returns {Object} Object with the address deleted
 */
const deleteAddress = async (_, { id }) => {
	await service.delete(id);
	return id;
};

module.exports = { addresses, address, createAddress, updateAddress, deleteAddress };
