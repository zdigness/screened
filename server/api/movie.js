const { Pool } = require('pg');

// Configure database connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL, // Set this in Vercel environment variables
	ssl: {
		rejectUnauthorized: false, // Required for SSL (e.g., Supabase)
	},
});

// Helper function to get MST timezone date
const getMSTDateString = () => {
	const date = new Date();
	date.setHours(date.getHours() - 7); // Adjust to MST (UTC-7)
	return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
};

// The main handler function
export default async function handler(req, res) {
	const { method, query } = req;

	if (method === 'GET') {
		if (query.route === 'today') {
			// Fetch today's movie
			const dateStr = getMSTDateString();
			try {
				const result = await pool.query(
					'SELECT * FROM movies WHERE game_date = $1',
					[dateStr]
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
		} else if (query.route === 'all') {
			// Fetch all movie names
			try {
				const result = await pool.query('SELECT name FROM movies');
				const movieNames = result.rows.map((row) => row.name);
				res.json(movieNames);
			} catch (err) {
				console.error('Error fetching movie names:', err);
				res.status(500).json({ error: 'Database error' });
			}
		} else {
			res.status(400).json({ error: 'Invalid route' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
