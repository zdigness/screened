// config/dbConfig.js
require('dotenv').config(); // To load environment variables from .env
const { Pool } = require('pg');

// production
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

// development
// const pool = new Pool({
// 	user: process.env.DB_USER,
// 	host: process.env.DB_HOST,
// 	database: process.env.DB_NAME,
// 	password: process.env.DB_PASS,
// 	port: process.env.DB_PORT,
// });

module.exports = pool;
