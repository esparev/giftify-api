const request = require('supertest');
const createApp = require('../app');

describe('tests for app', () => {
	let app = null;
	let server = null;
	let api = null;

	beforeEach(() => {
		app = createApp();
		server = app.listen(9000);
		api = request(app);
	});

	afterEach(() => {
		server.close();
	});
});
