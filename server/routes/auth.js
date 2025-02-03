const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Adjust path as needed

router.post('/clerk-webhook', async (req, res) => {
	try {
		const event = req.body;

		// Ensure it's a Clerk user creation event
		if (event.type !== 'user.created') {
			return res.status(400).json({ error: 'Invalid event type' });
		}

		const user = event.data;

		// Extract user details
		const clerkUserId = user.id;
		const email = user.email_addresses[0]?.email_address || null;
		const createdAt = new Date(user.created_at).toISOString(); // Convert timestamp

		// Insert into Supabase (PostgreSQL)
		const query = `
            INSERT INTO users (clerk_id, email, created_at)
            VALUES ($1, $2, $3)
            ON CONFLICT (clerk_id) DO NOTHING;
        `;

		await db.query(query, [clerkUserId, email, createdAt]);

		return res.status(200).json({ message: 'User added to Supabase' });
	} catch (error) {
		console.error('Error in Clerk webhook:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
