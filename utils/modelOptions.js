/**
 * Defines the options for the sequelize configuration model.
 * 
 * #### Example
 * 
 * ```javascript
 * // With the table name as a string
 * const options = modelOptions(false, 'Gift', 'gift');
 * // With the table name as a variable
 * const options = modelOptions(false, 'Gift', GIFT_TABLE);
 * ```
 * 
 * @param {boolean} timestamp - if the model should have timestamps
 * @param {string} modelName - the model name
 * @param {string} tableName - the table name
 * @returns {object} the model's options
 */
const modelOptions = (timestamp, modelName, tableName) => {
	return {
		timestamp: timestamp || false,
		modelName: modelName,
		tableName: tableName,
	};
};

module.exports = modelOptions;
