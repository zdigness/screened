// In your Express server file, e.g., routes/movie.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/submit-answer', async (req, res) => {
	const guessedMovie = req.body.answer;

	try {
		// Query for the movie details in the database based on the guessed name
		const movieResult = await db.query(
			'SELECT * FROM movies WHERE name = $1 LIMIT 1',
			[guessedMovie]
		);

		// grab todays movie from the database
		const todayMovie = await db.query(
			'SELECT * FROM movies WHERE game_date = $1',
			[new Date().toISOString().split('T')[0]]
		);

		if (movieResult.rows.length > 0) {
			const guessedMovie = movieResult.rows[0];
			const correctMovie = todayMovie.rows[0];

			// if guess is correct then return the movie details
			// else return a message that the guess is incorrect

			// Check if the guessed movie is today's game
			const isCorrect =
				guessedMovie.release_date === new Date().toISOString().split('T')[0];

			return res.json({
				correct: isCorrect,
				message: isCorrect ? 'Correct guess!' : 'Incorrect guess',
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
