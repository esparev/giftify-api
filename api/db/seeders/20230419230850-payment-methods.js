'use strict';

const { PAYMENT_METHOD_TABLE } = require('../models/payment-method.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(PAYMENT_METHOD_TABLE, [
			{
				id: 'afa67ed5-5d5b-4e62-954a-7e5b5f3e7cb3',
				alias: 'My Visa',
				cardholder_name: 'Jose Maria Esparza Arevalo',
				number: '4242424242424242',
				last_4: '4242',
				network: 'visa',
				expiry_month: 12,
				expiry_year: 2025,
				cvv: '123',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				user_id: '8a3bc3dc-eb62-4c0e-8f05-6deca9e9e1c1',
			},
			{
				id: 'e0a79e4c-4d12-4f22-8b9f-9c1edf16f13a',
				alias: 'My Mastercard',
				cardholder_name: 'Maria Guadalupe Paz Rojas',
				number: '5555555555554444',
				last_4: '4444',
				network: 'mastercard',
				expiry_month: 12,
				expiry_year: 2025,
				cvv: '123',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				user_id: 'b8f2b127-7c17-44e1-9f71-8d2077357ef2',
			},
			{
				id: '6bf8d6d7-6c0e-45a7-8a5d-39d05802b5f5',
				alias: 'My American Express',
				cardholder_name: 'Jhonatan Brandon Reyes Rodriguez',
				number: '378282246310005',
				last_4: '0005',
				network: 'amex',
				expiry_month: 12,
				expiry_year: 2025,
				cvv: '1234',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				user_id: '22a7a1c3-8f3e-40f9-9df8-4130b2687aa3',
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(PAYMENT_METHOD_TABLE, null);
	},
};
