export const fetchTodayMovie = async () => {
	const response = await fetch('http://localhost:5000/api/movie/today');
	if (!response.ok) throw new Error("Failed to fetch today's movie");
	return response.json();
};

export const fetchAllMovies = async () => {
	const response = await fetch('http://localhost:5000/api/movie/');
	if (!response.ok) throw new Error('Failed to fetch all movies');
	return response.json();
};

export const submitAnswer = async (selectedAnswer) => {
	const response = await fetch('http://localhost:5000/api/submit-answer', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ answer: selectedAnswer }),
	});
	if (!response.ok) throw new Error('Failed to submit answer');
	return response.json();
};
