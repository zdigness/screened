// models/db.js
const pool = require('../config/dbConfig');

module.exports = {
	query: (text, params) => pool.query(text, params),
};
