'use strict';

const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(CATEGORY_TABLE, [
			{
				id: '06dfc59d-f9a6-4555-bfbe-5f5d5d5ec5f1',
				slug: 'cumpleanos',
				name: 'Cumpleaños',
				hex_color: '#D26500',
				image: 'https://i.imgur.com/D28D3F4.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: 'a44b660f-5f02-4cc5-9ccf-d9a15a09e8ab',
				slug: 'san-valentin',
				name: 'San Valentín',
				hex_color: '#981919',
				image: 'https://i.imgur.com/1gRSiRj.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: '954ddc5c-75fd-47e1-bded-5fc86b3fc031',
				slug: 'dia-de-la-madre',
				name: 'Día de la Madre',
				hex_color: '#A706C1',
				image: 'https://i.imgur.com/vNG9vE9.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: 'ed58da98-29d9-4e4b-8804-0d94c4f29d32',
				slug: 'graduacion',
				name: 'Graduación',
				hex_color: '#BB8600',
				image: 'https://i.imgur.com/gXZJegw.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: '3f2dd7fa-dc23-46e8-9e67-9a7a4c6c4f4d',
				slug: 'navidad',
				name: 'Navidad',
				hex_color: '#981919',
				image: 'https://i.imgur.com/1gRSiRj.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: '49f05c1d-67a7-4e36-8a06-94a0ac9d9245',
				slug: 'aniversario',
				name: 'Aniversario',
				hex_color: '#BB8600',
				image: 'https://i.imgur.com/gXZJegw.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: '8d417a34-0dc6-40b7-90a8-80c0fc08aeb6',
				slug: 'baby-shower',
				name: 'Baby Shower',
				hex_color: '#195498',
				image: 'https://i.imgur.com/kX9bLhI.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: 'a9a309cc-b9ed-4d51-a4b4-4dc10f31d60a',
				slug: 'dia-del-padre',
				name: 'Día del Padre',
				hex_color: '#D26500',
				image: 'https://i.imgur.com/D28D3F4.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: '1684d3df-3b20-4c1a-bd12-3c1e06b926a2',
				slug: 'pascua',
				name: 'Pascua',
				hex_color: '#3A9819',
				image: 'https://i.imgur.com/a4X9pNP.png',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(CATEGORY_TABLE, null);
	},
};
