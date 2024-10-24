// models/movieModel.js
const db = require('./db');

// Function to insert a movie into the database
const insertMovie = async (
	name,
	director,
	averageRating,
	reviewerName,
	reviewRating,
	reviewText
) => {
	const query = `
    INSERT INTO movies (name, director, average_rating, reviewer_name, review_rating, review_text)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
	const values = [
		name,
		director,
		averageRating,
		reviewerName,
		reviewRating,
		reviewText,
	];
	try {
		const result = await db.query(query, values);
		return result.rows[0];
	} catch (error) {
		console.error('Error inserting movie:', error);
		throw error;
	}
};

// Export the functions for use in controllers or routes
module.exports = {
	insertMovie,
};
