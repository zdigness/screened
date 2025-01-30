// src/hooks/useFetchMovies.js
import { useState, useEffect } from 'react';

function useFetchMovies() {
	const [allMovies, setAllMovies] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('http://localhost:5000/api/movie/', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				const uniqueTitles = new Set();
				const uniqueMovies = [];

				data.forEach((movie) => {
					if (!uniqueTitles.has(movie)) {
						uniqueTitles.add(movie);
						uniqueMovies.push(movie);
					}
				});

				setAllMovies(uniqueMovies);
			})
			.catch((error) => {
				console.error('Error fetching all movies:', error);
				setError('Error fetching movies');
			});
	}, []);

	return { allMovies, error };
}

export default useFetchMovies;
