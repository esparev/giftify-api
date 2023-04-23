const request = require('supertest');
const createApp = require('../app');
const { models } = require('../api/db/sequelize');

describe('tests for /auth path', () => {
	let app = null;
	let server = null;
	let api = null;

	beforeAll(() => {
		app = createApp();
		server = app.listen(9000);
		api = request(app);
	});

	describe('POST /login', () => {
		test('should return a 201 login succesfull', async () => {
			const user = await models.User.findOne({
				where: { username: 'esparev' },
			});
			const inputData = {
				email: user.email,
				password: 'password123',
			};
			const { statusCode, body } = await api
				.post('/api/v1/auth/login')
				.send(inputData);
			expect(statusCode).toBe(201);
			expect(body.token).toBeTruthy();
			expect(body.user.email).toEqual(inputData.email);
			expect(body.user.password).toBeUndefined();
		});

		test('should return a 401 login not authorized', async () => {
			const inputData = {
				email: 'fake@email.com',
				password: 'notmypassword',
			};
			const { statusCode } = await api
				.post('/api/v1/auth/login')
				.send(inputData);
			expect(statusCode).toBe(401);
		});
	});

	afterAll(() => {
		server.close();
	});
});
