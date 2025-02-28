const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Endpoint to get today's movie
router.get('/today', async (req, res) => {
	// get MST timezone date
	const date = new Date();
	date.setHours(date.getHours() - 7);
	const dateStr = date.toISOString().split('T')[0];
	try {
		const result = await db.query('SELECT * FROM movies WHERE game_date = $1', [
			dateStr,
		]);
		if (result.rows.length > 0) {
			res.json(result.rows[0]);
		} else {
			res.status(404).json({ message: 'No game available for today' });
		}
	} catch (err) {
		console.error("Error fetching today's game:", err);
		res.status(500).json({ error: 'Database error' });
	}
});

// Endpoint to get all movie names
router.get('/', async (req, res) => {
	try {
		const result = await db.query('SELECT name FROM movies');
		const movieNames = result.rows.map((row) => row.name);
		res.json(movieNames);
	} catch (err) {
		console.error('Error fetching movie names:', err);
		res.status(500).json({ error: 'Database error' });
	}
});

module.exports = router;
