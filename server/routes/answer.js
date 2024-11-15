// In your Express server file, e.g., routes/movie.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const moment = require('moment-timezone');

router.post('/submit-answer', async (req, res) => {
	const guessedMovieName = req.body.answer;

	try {
		// Query for the movie details in the database based on the guessed name
		const movieResult = await db.query(
			'SELECT * FROM movies WHERE name = $1 LIMIT 1',
			[guessedMovieName]
		);

		// Query today's movie from the database
		const todayMovieResult = await db.query(
			'SELECT * FROM movies WHERE game_date = $1',
			[moment().tz('America/Denver').format('YYYY-MM-DD')]
		);

		if (movieResult.rows.length > 0) {
			const guessedMovie = movieResult.rows[0]; // Access the first row
			const correctMovie = todayMovieResult.rows[0]; // Access today's movie row

			// Check if the guessed movie matches today's game by comparing names or other criteria
			const isCorrect = guessedMovie.name === correctMovie.name;

			return res.json({
				correct: isCorrect,
				message: isCorrect ? 'Correct guess!' : 'Incorrect guess, try again.',
				guessedMovie: guessedMovie,
				correctMovie: correctMovie,
			});
		} else {
			return res.status(404).json({ message: 'Movie not found' });
		}
	} catch (error) {
		console.error('Error in /submit-answer:', error);
		return res.status(500).json({ error: 'Database error' });
	}
});

module.exports = router;
