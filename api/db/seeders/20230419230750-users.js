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
				password: '$2b$13$2EqoUWtBwOB/rVz6uvH/muS.OjgiDbQnhtSVjhjbSynTs4gyO1HhW',
				role: 'admin',
				avatar: 'https://i.imgur.com/koayjlm.jpg',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: 'b8f2b127-7c17-44e1-9f71-8d2077357ef2',
				username: 'lpaz',
				first_name: 'Lupita',
				last_name: 'Paz Rojas',
				email: 'lpaz@hotmail.com',
				password: '$2b$13$2EqoUWtBwOB/rVz6uvH/muS.OjgiDbQnhtSVjhjbSynTs4gyO1HhW',
				role: 'admin',
				avatar: 'https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/335621449_737109604813756_1202960422466277562_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFT8C-EfvHdLViHRsw284IS3elA14tFBRjd6UDXi0UFGGttTLZLLJTyqHBNADdVo2yWXL4MVExaNICWWp4ZgVPC&_nc_ohc=1-tbwnmOzXMAX_UmFTN&_nc_ht=scontent-qro1-2.xx&oh=00_AfCpL-vPTqhgqZDs8u2E1-tna31VnCXO4O9CSaAc3rwlWA&oe=646D6B31',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
			{
				id: '22a7a1c3-8f3e-40f9-9df8-4130b2687aa3',
				username: 'eljhonnyx',
				first_name: 'Jhonatan Brandon',
				last_name: 'Reyes Rodriguez',
				email: 'brandon@hotmail.com',
				password: '$2b$13$2EqoUWtBwOB/rVz6uvH/muS.OjgiDbQnhtSVjhjbSynTs4gyO1HhW',
				role: 'admin',
				avatar: 'https://scontent-qro1-2.xx.fbcdn.net/v/t1.6435-9/165639897_2305753316234666_4078483422244044778_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFPJRNAkbaVR9bYfxyY7Ezl6Wi6uyzjSbjpaLq7LONJuPy7PAJCq5NJZjK90zC2e7PrCb0ez-tik6Bu2SvIFPd1&_nc_ohc=anC3vbupRQoAX_08PdV&_nc_ht=scontent-qro1-2.xx&oh=00_AfAje_MjrSJtG62y48arbfCQ0qMhVqzt2wOlLyqZsmfdJg&oe=648F53B5',
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(USER_TABLE, null);
	},
};
