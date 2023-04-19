// Configuration file for the migration system files
const { config } = require('../../config');

module.exports = {
	development: {
		url: config.dbUrl,
		dialect: 'postgres',
	},
	production: {
		dialect: 'postgres',
		url: config.databaseUrl,
		dialect: 'postgres',
		dialectOptions: {
			ssl: { rejectUnauthorized: false },
		},
	},
};
