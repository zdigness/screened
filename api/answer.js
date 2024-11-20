const { Pool } = require('pg');

// Initialize database connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

const allowCors = (fn) => async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', 'https://screened.vercel.app');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}
	return await fn(req, res);
};

// Serverless function handler
const handler = async (req, res) => {
	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	// Handle only POST requests
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { answer } = req.body;

	if (!answer) {
		return res.status(400).json({ error: 'Answer is required' });
	}

	// Get today's date in MST timezone
	const date = new Date();
	date.setHours(date.getHours() - 7);
	const today = date.toISOString().split('T')[0];

	try {
		// Query to find the guessed movie
		const guessedMovieQuery = await pool.query(
			'SELECT * FROM movies WHERE name = $1 LIMIT 1',
			[answer]
		);

		// Query to find today's movie
		const todayMovieQuery = await pool.query(
			'SELECT * FROM movies WHERE game_date = $1',
			[today]
		);

		// Handle case where guessed movie is not found
		if (guessedMovieQuery.rows.length === 0) {
			return res.status(404).json({ message: 'Movie not found' });
		}

		// Extract results from queries
		const guessedMovie = guessedMovieQuery.rows[0];
		const correctMovie = todayMovieQuery.rows[0];

		// Check if the guess is correct
		const isCorrect = guessedMovie.name === correctMovie.name;

		return res.status(200).json({
			correct: isCorrect,
			message: isCorrect ? 'Correct guess!' : 'Incorrect guess, try again.',
			guessedMovie,
			correctMovie,
		});
	} catch (error) {
		console.error('Error in /submit-answer:', error);
		return res.status(500).json({ error: 'Database error' });
	}
};

export default allowCors(handler);
