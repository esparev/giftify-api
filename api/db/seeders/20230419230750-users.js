'use strict';

const { USER_TABLE } = require('../models/user.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(USER_TABLE, [
			{
				id: '8a3bc3dc-eb62-4c0e-8f05-6deca9e9e1c1',
				username: 'esparev',
				first_name: 'Jose Maria',
				last_name: 'Esparza Arevalo',
				email: 'esparev@hotmail.com',
				password: 'password123',
				role: 'user',
				created_at: new Date().toISOString(),
			},
			{
				id: 'b8f2b127-7c17-44e1-9f71-8d2077357ef2',
				username: 'lpaz',
				first_name: 'Lupita',
				last_name: 'Paz Rojas',
				email: 'lpaz@hotmail.com',
				password: 'password123',
				role: 'user',
				created_at: new Date().toISOString(),
			},
			{
				id: '22a7a1c3-8f3e-40f9-9df8-4130b2687aa3',
				username: 'eljhonnyx',
				first_name: 'Jhonatan Brandon',
				last_name: 'Reyes Rodriguez',
				email: 'brandon@hotmail.com',
				password: 'password123',
				role: 'user',
				created_at: new Date().toISOString(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(USER_TABLE, null);
	},
};
