require('dotenv').config();
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movie');
const answerRoutes = require('./routes/answer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use Express's built-in JSON parser
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Use routes
app.use('/api/movie', movieRoutes);
app.use('/api', answerRoutes);

app.get('/', (req, res) => {
	res.send('Server is running');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
