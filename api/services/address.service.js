const boom = require('@hapi/boom');
const { models } = require('../db/sequelize');

/**
 * Address Service class to manage the logic of the addresses
 *
 * #### Example
 *
 * ```javascript
 * const service = new AddressService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all addresses in the array of objects
 * service.find();
 * // Finds the address with the provided id
 * service.findOne(id);
 * // Finds all addresses with the provided userId
 * service.findByUser(userId);
 * // Creates a address with the provided data
 * service.create(data);
 * // Updates the address with the provided id
 * service.update(id, changes);
 * // Deletes the address with the provided id
 * service.delete(id);
 * ```
 */
class AddressService {
	/**
	 * Finds all addresses in the array of objects
	 * @returns {array} Array with all addresses
	 */
	async find() {
		const addresses = await models.Address.findAll();
		return addresses;
	}

	/**
	 * Finds the address with the provided id
	 * @param {string} id - id of the address
	 * @returns {object} Object with the address
	 */
	async findOne(id) {
		const address = await models.Address.findByPk(id, {
			include: ['user', 'orders'],
		});
		if (!address) {
			throw boom.notFound('Address not found');
		}
		return address;
	}

	/**
	 * Finds the addresses with the provided userId
	 * @param {string} userId - userId of the addresses
	 * @returns {array} Array with all addresses
	 */
	async findByUser(userId) {
		const addresses = await models.Address.findAll({
			where: { userId },
			include: ['user'],
		});
		return addresses;
	}

	/**
	 * Creates a address with the provided data
	 * @param {object} data - data of the address
	 * @returns {object} Object with the address created
	 */
	async create(data) {
		const address = await models.Address.create(data);
		return address;
	}

	/**
	 * Updates the address with the provided id
	 * @param {string} id - id of the address
	 * @param {object} changes - data of the address
	 * @returns {object} Object with the address updated
	 */
	async update(id, changes) {
		const address = await this.findOne(id);
		const response = await address.update(changes);
		return response;
	}

	/**
	 * Deletes the address with the provided id
	 * @param {string} id - id of the address
	 * @returns {object} Object with the address deleted
	 */
	async delete(id) {
		const address = await this.findOne(id);
		await address.destroy();
		return { id };
	}
}

module.exports = AddressService;
