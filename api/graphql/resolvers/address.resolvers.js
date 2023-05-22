const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const { belongsToUserById } = require('../../../utils/belongsToUser');
const AddressService = require('../../services/address.service');
const service = new AddressService();

/**
 * Finds all addresses in the array of objects.
 */
const allAddresses = async (_, {}, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.find();
};

/**
 * Finds all user addresses in the array of objects.
 */
const addresses = async (_, { userId }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	belongsToUserById(user, userId);
	return service.findByUser(userId);
};

/**
 * Finds the address with the provided id.
 */
const address = async (_, { id }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.findOne(id);
};

/**
 * Creates a address with the provided data.
 */
const createAddress = async (_, { data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.create(data);
};

/**
 * Updates the address with the provided id.
 */
const updateAddress = async (_, { id, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	return service.update(id, data);
};

/**
 * Deletes the address with the provided id.
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
