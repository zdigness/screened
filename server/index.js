require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Server is running');
});

const db = require('./models/db');

app.get('/test-db', async (req, res) => {
	try {
		const result = await db.query('SELECT NOW()');
		res.json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send('Database error');
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
