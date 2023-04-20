'use strict';

const { ADDRESS_TABLE } = require('../models/address.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(ADDRESS_TABLE, [
			{
				id: 'd1f93e8c-4c4a-4d60-85b6-8b9c1f432d87',
				street_name: 'Calle Francisco I. Madero',
				street_number: '203',
				postal_code: '58000',
				locality: 'Centro',
				city: 'Morelia',
				area: 'Michoacán',
				country: 'México',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				user_id: '8a3bc3dc-eb62-4c0e-8f05-6deca9e9e1c1',
			},
			{
				id: 'db9f94df-cb19-43e8-8c12-1b305aa947c6',
				street_name: 'Avenida Acueducto',
				street_number: '345',
				postal_code: '58140',
				locality: 'Tres Marías',
				city: 'Morelia',
				area: 'Michoacán',
				country: 'México',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				user_id: 'b8f2b127-7c17-44e1-9f71-8d2077357ef2',
			},
			{
				id: 'cd37610d-ff7b-45e3-bc9a-0c08938c7a3a',
				street_name: 'Calle Ignacio López Rayón',
				street_number: '43',
				postal_code: '58290',
				locality: 'Félix Ireta',
				city: 'Morelia',
				area: 'Michoacán',
				country: 'México',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				user_id: '22a7a1c3-8f3e-40f9-9df8-4130b2687aa3',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(ADDRESS_TABLE, null);
	},
};
