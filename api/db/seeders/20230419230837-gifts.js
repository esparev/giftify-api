'use strict';

const { GIFT_TABLE } = require('../models/gift.model');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(GIFT_TABLE, [
			{
				id: '6948c40b-74c7-4660-a70d-8ae0505a5b5d',
				name: 'Bouquet de flores',
				description:
					'Un hermoso ramo de flores para demostrar tu amor y aprecio',
				price: 35.99,
				image: 'https://example.com/bouquet.jpg',
				rating: 4,
				quantity: 10,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: 'a44b660f-5f02-4cc5-9ccf-d9a15a09e8ab',
			},
			{
				id: 'a0a03e31-f822-4d99-a1b4-c4fbdbd35803',
				name: 'Taza personalizada',
				description:
					'Una taza con una foto o mensaje personalizado para empezar el día con una sonrisa',
				price: 14.99,
				image: 'https://example.com/mug.jpg',
				rating: 5,
				quantity: 20,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: 'a44b660f-5f02-4cc5-9ccf-d9a15a09e8ab',
			},
			{
				id: '31dabf7b-c56a-4d7b-9a58-cc8c0c82ed04',
				name: 'Collar de plata',
				description: 'Un elegante collar de plata para resaltar su belleza',
				price: 89.99,
				image: 'https://example.com/necklace.jpg',
				rating: 3,
				quantity: 5,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: '49f05c1d-67a7-4e36-8a06-94a0ac9d9245',
			},
			{
				id: 'c8969b07-2341-4c11-b33b-6a60a6f4b26d',
				name: 'Billetera de cuero',
				description:
					'Una billetera de cuero de alta calidad para llevar sus tarjetas y dinero en estilo',
				price: 49.99,
				image: 'https://example.com/wallet.jpg',
				rating: 4,
				quantity: 8,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: 'a9a309cc-b9ed-4d51-a4b4-4dc10f31d60a',
			},
			{
				id: '491f4666-f0f6-4ea6-9d9b-87cc84c5a025',
				name: 'Botella de vino',
				description:
					'Una botella de vino tinto de alta calidad para celebrar ocasiones especiales',
				price: 49.99,
				image: 'https://example.com/wine.jpg',
				rating: 4,
				quantity: 12,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: '49f05c1d-67a7-4e36-8a06-94a0ac9d9245',
			},
			{
				id: 'a4179f9d-18cc-4b99-a87d-620632e3dc57',
				name: 'Auriculares inalámbricos',
				description:
					'Auriculares inalámbricos con cancelación de ruido para disfrutar de la música sin interrupciones',
				price: 99.99,
				image: 'https://example.com/headphones.jpg',
				rating: 5,
				quantity: 7,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: '06dfc59d-f9a6-4555-bfbe-5f5d5d5ec5f1',
			},
			{
				id: 'c4f40ab7-7278-4c4d-8f28-9e7b84d8346d',
				name: 'Reloj de pulsera',
				description:
					'Un reloj de pulsera elegante y sofisticado para lucir en cualquier ocasión',
				price: 149.99,
				image: 'https://example.com/watch.jpg',
				rating: 4,
				quantity: 3,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: 'a9a309cc-b9ed-4d51-a4b4-4dc10f31d60a',
			},
			{
				id: '579ef9b7-5416-4d6d-ba6d-3f794cbf2a8a',
				name: 'Juego de mesa',
				description:
					'Un juego de mesa divertido para compartir con amigos y familiares',
				price: 39.99,
				image: 'https://example.com/boardgame.jpg',
				rating: 4,
				quantity: 6,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: '3f2dd7fa-dc23-46e8-9e67-9a7a4c6c4f4d',
			},
			{
				id: '4c53dc8e-5d06-4629-aecd-7a5315f5b5e3',
				name: 'Bolso de mano',
				description:
					'Un bolso de mano elegante y práctico para llevar lo esencial a cualquier parte',
				price: 79.99,
				image: 'https://example.com/handbag.jpg',
				rating: 3,
				quantity: 4,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: '954ddc5c-75fd-47e1-bded-5fc86b3fc031',
			},
			{
				id: 'ef1316ab-84a8-4c47-b118-173f10e67405',
				name: 'Ramita de salvia',
				description:
					'Una ramita de salvia para purificar el ambiente y limpiar energías negativas',
				price: 7.99,
				image: 'https://example.com/sage.jpg',
				rating: 5,
				quantity: 20,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
				category_id: '8d417a34-0dc6-40b7-90a8-80c0fc08aeb6',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(GIFT_TABLE, null);
	},
};
