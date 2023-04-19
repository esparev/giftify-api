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
 * // Creates a address with the provided data
 * service.create(data);
 * // Updates the address with the provided id
 * service.update(id, changes);
 * // Deletes the address with the provided id
 * service.delete(id);
 * ```
 */
class AddressService {
	constructor() {}

	/**
	 * Finds all addresses in the array of objects
	 * @returns {Array} Array with all addresses
	 */
	async find() {}

	/**
	 * Finds the address with the provided id
	 * @param {id} id - id of the address
	 * @returns {Object} Object with the address
	 */
	async findOne(id) {}

	/**
	 * Finds the address with the provided slug
	 * @param {string} slug - slug of the address
	 * @returns {Object} Object with the address
	 */
	async findBySlug(slug) {}

	/**
	 * Creates a address with the provided data
	 * @param {*} data - data of the address
	 * @returns {Object} Object with the address created
	 */
	async create(data) {}

	/**
	 * Updates the address with the provided id
	 * @param {id} id - id of the address
	 * @param {*} changes - data of the address
	 * @returns {Object} Object with the address updated
	 * @throws {Error} Error if the address is not found
	 */
	async update(id, changes) {}

	/**
	 * Deletes the address with the provided id
	 * @param {id} id - id of the address
	 * @returns {Object} Object with the address deleted
	 * @throws {Error} Error if the address is not found
	 */
	async delete(id) {}
}

module.exports = AddressService;
