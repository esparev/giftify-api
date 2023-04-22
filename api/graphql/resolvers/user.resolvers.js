const boom = require('@hapi/boom');
const UserService = require('../../services/user.service');
const service = new UserService();

/**
 * Finds all users in the array of objects.
 * @returns {array} Array with all users
 */
const users = () => {
	return service.find();
};

/**
 * Finds the user with the provided username.
 * @param {string} username - username of the user
 * @returns {object} Object with the user
 */
const user = (_, { username }) => {
	return service.findByUsername(username);
};

/**
 * Creates a user with the provided data.
 * @param {object} data - data of the user
 * @returns {object} Object with the user created
 */
const createUser = (_, { data }) => {
	return service.create(data);
};

/**
 * Updates the user with the provided username.
 * @param {object} params - username and data of the user
 * @param {string} params.username - username of the user
 * @param {object} params.data - data of the user
 * @returns {object} Object with the user updated
 */
const updateUser = async (_, { username, data }, context) => {
	const { user } = await context.authenticate('jwt', { session: false });
	if (!user) {
		throw boom.unauthorized('No tienes permiso para realizar esta acción');
	}
	return service.update(username, data);
};

/**
 * Deletes the user with the provided username.
 * @param {string} params - username of the user
 * @returns {object} Object with the user deleted
 */
const deleteUser = async (_, { username }, context) => {
	const { user } = await context.authenticate('jwt', { session: false });
	if (!user) {
		throw boom.unauthorized('No tienes permiso para realizar esta acción');
	}
	await service.delete(username);
	return username;
};

module.exports = { users, user, createUser, updateUser, deleteUser };
