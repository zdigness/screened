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
		if (req.method === 'GET') {
			if (req.query.route === 'today') {
				const date = new Date();
				date.setHours(date.getHours() - 7); // MST timezone
				const today = date.toISOString().split('T')[0];
				try {
					const result = await pool.query(
						'SELECT * FROM movies WHERE game_date = $1',
						[today]
					);
					if (result.rows.length > 0) {
						res.json(result.rows[0]);
					} else {
						res.status(404).json({ message: 'No game available for today' });
					}
				} catch (error) {
					console.error('Error fetching today’s movie:', error);
					res.status(500).json({ error: 'Database error' });
				}
			} else if (req.query.route === 'all') {
				try {
					const result = await pool.query('SELECT name FROM movies');
					const movieNames = result.rows.map((row) => row.name);
					res.json(movieNames);
				} catch (error) {
					console.error('Error fetching movie names:', error);
					res.status(500).json({ error: 'Database error' });
				}
			} else {
				res.status(400).json({ error: 'Invalid route' });
			}
		} else {
			res.status(405).json({ error: 'Method not allowed' });
		}
	});
};

export default handler;
