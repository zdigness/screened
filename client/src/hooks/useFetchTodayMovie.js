import { useState, useEffect } from 'react';

function useFetchTodayMovie() {
	const [movie, setMovie] = useState(null);
	const [correctMovieData, setCorrectMovieData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('http://localhost:5000/api/movie/today', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((data) => {
				setMovie(data);
				setCorrectMovieData({
					actor: data.actor,
					release_date: data.release_date,
					genre_1: data.genre_1,
					genre_2: data.genre_2,
					rating: data.average_rating,
					director: data.director,
					title: data.name,
					poster_url: data.poster_url,
				});
			})
			.catch((error) => {
				console.error("Error fetching today's movie:", error);
				setError("Error fetching today's game");
			});
	}, []);

	return { movie, correctMovieData, error };
}

export default useFetchTodayMovie;
