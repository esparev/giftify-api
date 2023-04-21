const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../db/sequelize');

/**
 * User Service class to manage the logic of the users
 *
 * #### Example
 *
 * ```javascript
 * const service = new UserService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all users in the array of objects
 * service.find();
 * // Finds the user with the provided id
 * service.findOne(id);
 * // Finds the user with the provided username
 * service.findByUsername(username);
 * // Finds the user with the provided email
 * service.findByEmail(email);
 * // Creates a user with the provided data
 * service.create(data);
 * // Updates the user with the provided username
 * service.update(username, changes);
 * // Deletes the user with the provided username
 * service.delete(username);
 * ```
 */
class UserService {
	/**
	 * Finds all users in the array of objects
	 * @returns {Array} Array with all users
	 */
	async find() {
		const users = await models.User.findAll();
		return users;
	}

	/**
	 * Finds the user with the provided id
	 * @param {id} id - id of the user
	 * @returns {Object} Object with the user
	 */
	async findOne(id) {
		const user = await models.User.findByPk(id, {
			include: ['addresses', 'paymentMethods', 'orders', 'cart'],
		});
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	/**
	 * Finds the user with the provided username
	 * @param {string} username - username of the user
	 * @returns {Object} Object with the user
	 */
	async findByUsername(username) {
		const user = await models.User.findOne({
			where: { username },
			include: ['addresses', 'paymentMethods', 'orders', 'cart'],
		});
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	/**
	 * Finds the user with the provided email
	 * @param {string} email - email of the user
	 * @returns {Object} Object with the user
	 */
	async findByEmail(email) {
		const user = await models.User.findOne({
			where: { email },
			include: ['addresses', 'paymentMethods', 'orders', 'cart'],
		});
		if (!user) {
			throw boom.notFound('User not found');
		}
		return user;
	}

	/**
	 * Creates a user with the provided data
	 * @param {*} data - data of the user
	 * @returns {Object} Object with the user created
	 */
	async create(data) {
		const hash = await bcrypt.hash(data.password, 13);
		const user = await models.User.create({ ...data, password: hash });

		delete user.dataValues.password;
		delete user.dataValues.recoveryToken;
		return user;
	}

	/**
	 * Updates the user with the provided username
	 * @param {username} username - username of the user
	 * @param {*} changes - data of the user
	 * @returns {Object} Object with the user updated
	 */
	async update(username, changes) {
		const user = await models.User.update(username, changes);
		return user;
	}

	/**
	 * Deletes the user with the provided username
	 * @param {username} username - username of the user
	 * @returns {Object} Object with the user deleted
	 */
	async delete(username) {
		const user = await this.findByUsername(username);
		await user.destroy();
		return { username };
	}
}

module.exports = UserService;
