import { useState, useEffect } from 'react';
import './App.css'; // Ensure Tailwind is included

function App() {
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);
	const [answer, setAnswer] = useState('');
	const [message, setMessage] = useState('');
	const [allMovies, setAllMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);

	useEffect(() => {
		// Fetch today's movie
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

		// Fetch all movie names for the autocomplete feature
		fetch('http://localhost:5000/api/movies')
			.then((response) => response.json())
			.then((data) => {
				setAllMovies(data);
			})
			.catch((error) => console.error('Error fetching all movies:', error));
	}, []);

	// Function to convert rating to star emojis
	const getStarRating = (rating) => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 !== 0 ? '⭐️' : '';
		return '⭐️'.repeat(fullStars) + halfStar;
	};

	// Get today's date in a readable format
	const todayDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const handleInputChange = (e) => {
		const input = e.target.value;
		setAnswer(input);

		// If the input is empty, show no movies
		if (input.trim() === '') {
			setFilteredMovies([]);
			return;
		}

		// Filter the movies based on the input
		const filtered = allMovies.filter((movie) =>
			movie.toLowerCase().includes(input.toLowerCase())
		);
		setFilteredMovies(filtered);
	};

	// Handle user selection from the dropdown
	const handleSelectMovie = (selectedMovie) => {
		setAnswer(selectedMovie);
		setFilteredMovies([]); // Clear the dropdown after selection

		// Automatically submit the selected answer
		submitAnswer(selectedMovie);
	};

	// Function to handle the answer submission
	const submitAnswer = (selectedAnswer) => {
		fetch('http://localhost:5000/api/submit-answer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ answer: selectedAnswer }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to submit answer');
				}
				return response.json();
			})
			.then((data) => {
				setMessage(data.message);
				setAnswer(''); // Clear the input field
				setFilteredMovies([]); // Clear the dropdown
			})
			.catch((error) => {
				console.error('Error submitting answer:', error);
				setMessage('Error submitting your answer');
			});
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			{/* Today's date positioned at the top */}
			<div className='absolute top-40 w-full text-center mt-4'>
				<h2 className='text-4xl font-light text-yellow-500'>{todayDate}</h2>
			</div>

			{/* Movie review content */}
			<div className='max-w-3xl p-6 font-sans text-center bg-white rounded-lg shadow-md mt-16 mb-8'>
				{error && <p className='text-red-500'>{error}</p>}
				{movie ? (
					<div>
						<span className='font-medium'>
							<p className='text-yellow-500 mb-4'>
								{movie.reviewer_name} {getStarRating(movie.review_rating)}
							</p>
						</span>
						<p className='mb-4 italic text-black'>
							&quot;{movie.review_text}&quot;
						</p>
					</div>
				) : (
					<p>Loading today&apos;s game...</p>
				)}
			</div>

			{/* Input field for autocomplete */}
			<div className='w-full max-w-lg relative flex flex-col items-center'>
				<input
					type='text'
					value={answer}
					onChange={handleInputChange}
					placeholder='Enter your answer'
					className='w-full p-2 border border-gray-300 rounded mb-0'
				/>
				{/* Dropdown for filtered movies */}
				{filteredMovies.length > 0 && (
					<ul className='w-full max-h-48 border border-gray-300 rounded bg-white shadow-lg z-10 absolute left-0 top-full mt-1 overflow-y-auto'>
						{filteredMovies.map((movie, index) => (
							<li
								key={index}
								onClick={() => handleSelectMovie(movie)}
								className='p-2 cursor-pointer hover:bg-gray-200'
							>
								<p className='text-black'>{movie}</p>
							</li>
						))}
					</ul>
				)}
			</div>
			{message && <p className='mt-4 text-green-500'>{message}</p>}
		</div>
	);
}

export default App;
