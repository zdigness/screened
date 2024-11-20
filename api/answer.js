const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

// Middleware for CORS
const corsMiddleware = cors();

const handler = async (req, res) => {
	corsMiddleware(req, res, async () => {
		if (req.method === 'POST') {
			const { answer } = req.body;

			const date = new Date();
			date.setHours(date.getHours() - 7); // MST timezone
			const today = date.toISOString().split('T')[0];

			try {
				const guessedMovieQuery = await pool.query(
					'SELECT * FROM movies WHERE name = $1 LIMIT 1',
					[answer]
				);
				const todayMovieQuery = await pool.query(
					'SELECT * FROM movies WHERE game_date = $1',
					[today]
				);

				if (guessedMovieQuery.rows.length === 0) {
					res.status(404).json({ message: 'Movie not found' });
				} else {
					const guessedMovie = guessedMovieQuery.rows[0];
					const correctMovie = todayMovieQuery.rows[0];
					const isCorrect = guessedMovie.name === correctMovie.name;

					res.json({
						correct: isCorrect,
						message: isCorrect
							? 'Correct guess!'
							: 'Incorrect guess, try again.',
						guessedMovie,
						correctMovie,
					});
				}
			} catch (error) {
				console.error('Error in /submit-answer:', error);
				res.status(500).json({ error: 'Database error' });
			}
		} else {
			res.status(405).json({ error: 'Method not allowed' });
		}
	});
};

export default handler;
