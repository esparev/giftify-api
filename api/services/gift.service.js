/**
 * Gift Service class to manage the logic of the gifts
 *
 * #### Example
 *
 * ```javascript
 * const service = new GiftService();
 * ```
 *
 * #### Functions
 *
 * ```javascript
 * // Finds all gifts in the array of objects
 * service.find();
 * // Finds the gift with the provided id
 * service.findOne(id);
 * // Creates a gift with the provided data
 * service.create(data);
 * // Updates the gift with the provided id
 * service.update(id, changes);
 * // Deletes the gift with the provided id
 * service.delete(id);
 * ```
 */
class GiftService {
	constructor() {}

	/**
	 * Finds all gifts in the array of objects
	 * @returns {Array} Array with all gifts
	 */
	async find() {}

	/**
	 * Finds the gift with the provided id
	 * @param {id} id - id of the gift
	 * @returns {Object} Object with the gift
	 */
	async findOne(id) {}

	/**
	 * Finds the gift with the provided slug
	 * @param {string} slug - slug of the gift
	 * @returns {Object} Object with the gift
	 */
	async findBySlug(slug) {}

	/**
	 * Creates a gift with the provided data
	 * @param {*} data - data of the gift
	 * @returns {Object} Object with the gift created
	 */
	async create(data) {}

	/**
	 * Updates the gift with the provided id
	 * @param {id} id - id of the gift
	 * @param {*} changes - data of the gift
	 * @returns {Object} Object with the gift updated
	 * @throws {Error} Error if the gift is not found
	 */
	async update(id, changes) {}

	/**
	 * Deletes the gift with the provided id
	 * @param {id} id - id of the gift
	 * @returns {Object} Object with the gift deleted
	 * @throws {Error} Error if the gift is not found
	 */
	async delete(id) {}
}

module.exports = GiftService;
