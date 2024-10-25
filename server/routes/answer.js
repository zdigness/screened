const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Endpoint to handle answer submission
router.post('/submit-answer', async (req, res) => {
	const { answer } = req.body;

	// Fetch today's movie from the database
	const result = await db.query(
		'SELECT * FROM movies WHERE game_date = CURRENT_DATE LIMIT 1'
	);
	const movie = result.rows[0];

	if (movie) {
		// Compare the guess to the correct movie name (ignoring case and trimming whitespace)
		if (answer.trim().toLowerCase() === movie.name.trim().toLowerCase()) {
			return res.json({
				correct: true,
				message: `Correct! The movie is "${movie.name}".`,
				movie, // Send movie details back
			});
		}
	}

	res.json({
		correct: false,
		message: 'Incorrect guess. Try again!',
	});
});

module.exports = router;
