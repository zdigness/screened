const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Endpoint to get today's movie
router.get('/today', async (req, res) => {
	try {
		const result = await db.query(
			'SELECT * FROM movies WHERE release_date = CURRENT_DATE LIMIT 1'
		);
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

module.exports = router;
