const UserService = require('../../services/user.service');
const service = new UserService();

/**
 * Finds all users in the array of objects
 * @returns {Array} Array with all users
 */
const users = () => {
	return service.find();
};

/**
 * Finds the user with the provided username
 * @param {username} username - username of the user
 * @returns {Object} Object with the user
 */
const user = (_, { username }) => {
	return service.findByUsername(username);
};

/**
 * Creates a user with the provided data
 * @param {*} data - data of the user
 * @returns {Object} Object with the user created
 */
const createUser = (_, { data }) => {
	return service.create(data);
};

/**
 * Updates the user with the provided username
 * @param {username} username - username of the user
 * @param {data} changes - data of the user
 * @returns {Object} Object with the user updated
 */
const updateUser = (_, { username, data }) => {
	return service.update(username, data);
};

/**
 * Deletes the user with the provided username
 * @param {username} username - username of the user
 * @returns {Object} Object with the user deleted
 */
const deleteUser = async (_, { username }) => {
	await service.delete(username);
	return username;
};

module.exports = { users, user, createUser, updateUser, deleteUser };
