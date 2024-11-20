const { Pool } = require('pg');

// Initialize database connection pool
const db = new Pool({
	connectionString: process.env.DATABASE_URL, // Ensure this environment variable is set in Vercel
});

export default async (req, res) => {
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (replace '*' with your frontend domain for better security)
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Specify allowed HTTP methods
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow necessary headers

	if (req.method === 'OPTIONS') {
		// Handle CORS preflight requests
		res.status(200).end();
		return;
	}
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
