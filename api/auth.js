const { Pool } = require('pg');

// Initialize database connection pool
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

const allowCors = (fn) => async (req, res) => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', 'https://screened.vercel.app');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, OPTIONS, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
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

	// Ensure the event is from Clerk
	const event = req.body;
	if (event.type !== 'user.created') {
		return res.status(400).json({ error: 'Invalid event type' });
	}

	const user = event.data;

	// Extract user details from Clerk event
	const clerkUserId = user.id;
	const email = user.email_addresses[0]?.email_address || null;
	const createdAt = new Date(user.created_at).toISOString(); // Convert timestamp

	try {
		// Insert user into the Supabase (PostgreSQL) database
		const query = `
            INSERT INTO users (clerk_id, email, created_at)
            VALUES ($1, $2, $3)
            ON CONFLICT (clerk_id) DO NOTHING;
        `;

		await pool.query(query, [clerkUserId, email, createdAt]);

		return res.status(200).json({ message: 'User added to Supabase' });
	} catch (error) {
		console.error('Error in Clerk webhook:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export default allowCors(handler);
