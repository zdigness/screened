const { Pool } = require('pg');
const cors = require('cors');

// Enable CORS
const corsMiddleware = cors({
	origin: 'https://screened.vercel.app',
	methods: ['POST'],
});

// Initialize database connection pool
const db = new Pool({
	connectionString: process.env.DATABASE_URL, // Ensure this environment variable is set in Vercel
});

export default async (req, res) => {
	// Apply CORS
	corsMiddleware(req, res, () => {
		if (req.method === 'OPTIONS') {
			return res.status(200).end();
		}
	});

	const { method, query } = req;

	// Get MST timezone date
	const date = new Date();
	date.setHours(date.getHours() - 7);
	const dateStr = date.toISOString().split('T')[0];

	try {
		if (method === 'GET') {
			if (query.endpoint === 'today') {
				// Get today's movie
				const result = await db.query(
					'SELECT * FROM movies WHERE game_date = $1',
					[dateStr]
				);
				if (result.rows.length > 0) {
					res.status(200).json(result.rows[0]);
				} else {
					res.status(404).json({ message: 'No game available for today' });
				}
			} else {
				// Get all movie names
				const result = await db.query('SELECT name FROM movies');
				const movieNames = result.rows.map((row) => row.name);
				res.status(200).json(movieNames);
			}
		} else {
			res.status(405).json({ error: 'Method not allowed' });
		}
	} catch (err) {
		console.error('Error handling request:', err);
		res.status(500).json({ error: 'Database error' });
	}
};
