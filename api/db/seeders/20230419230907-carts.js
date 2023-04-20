'use strict';

const { CART_TABLE } = require('../models/cart.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(CART_TABLE, [
			{
				id: 'afa67ed5-5d5b-4e62-954a-7e5b5f3e7cb3',
				quantity: 0,
				total: 0.0,
				created_at: new Date().toISOString(),
				user_id: '8a3bc3dc-eb62-4c0e-8f05-6deca9e9e1c1',
			},
			{
				id: 'e0a79e4c-4d12-4f22-8b9f-9c1edf16f13a',
				quantity: 0,
				total: 0.0,
				created_at: new Date().toISOString(),
				user_id: 'b8f2b127-7c17-44e1-9f71-8d2077357ef2',
			},
			{
				id: '6bf8d6d7-6c0e-45a7-8a5d-39d05802b5f5',
				quantity: 0,
				total: 0.0,
				created_at: new Date().toISOString(),
				user_id: '22a7a1c3-8f3e-40f9-9df8-4130b2687aa3',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(CART_TABLE, null);
	},
};
