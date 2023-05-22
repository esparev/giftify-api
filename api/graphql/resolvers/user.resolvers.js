const checkJwt = require('../../../utils/checkJwt');
const checkRole = require('../../../utils/checkRole');
const { belongsToUser } = require('../../../utils/belongsToUser');
const UserService = require('../../services/user.service');
const service = new UserService();

/**
 * Finds all users in the array of objects.
 */
const users = async (_, {}, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin']);
	return service.find();
};

/**
 * Finds the user with the provided username.
 */
const user = async (_, { username }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	belongsToUser(user, username);
	return service.findByUsername(username);
};

/**
 * Creates a user with the provided data.
 */
const createUser = (_, { data }) => {
	return service.create(data);
};

/**
 * Updates the user with the provided username.
 */
const updateUser = async (_, { username, data }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	belongsToUser(user, username);
	return service.update(username, data);
};

/**
 * Deletes the user with the provided username.
 */
const deleteUser = async (_, { username }, context) => {
	const user = await checkJwt(context);
	checkRole(user, ['admin', 'user']);
	belongsToUser(user, username);
	await service.delete(username);
	return username;
};

module.exports = { users, user, createUser, updateUser, deleteUser };
