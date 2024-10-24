import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('http://localhost:5000/api/movies/today')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				setMovie(data);
			})
			.catch((error) => {
				console.error("Error fetching today's movie:", error);
				setError("Error fetching today's game");
			});
	}, []);

	return (
		<>
			<div>
				<a href='https://vitejs.dev' target='_blank' rel='noopener noreferrer'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank' rel='noopener noreferrer'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				{error && <p>{error}</p>}
				{movie ? (
					<div>
						<h2>{movie.name}</h2>
						<p>Director: {movie.director}</p>
						<p>Average Rating: {movie.average_rating}</p>
						<p>Top Reviewer: {movie.reviewer_name}</p>
						<p>Review Rating: {movie.review_rating}</p>
						<p>Review: {movie.review_text}</p>
						<p>Release Date: {new Date(movie.release_date).toDateString()}</p>
					</div>
				) : (
					<p>Loading todays game...</p>
				)}
			</div>
			<p className='read-the-docs'>Click on the Vite and React</p>
		</>
	);
}

export default App;
