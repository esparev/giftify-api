const createApp = require('./app');
const port = process.env.PORT || 3003;

const app = createApp();

app.listen(port, () =>
	console.log(`Server running on http://localhost:${port}`)
);
