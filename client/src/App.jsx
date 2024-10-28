import { useState, useEffect } from 'react';
import './App.css'; // Ensure Tailwind is included

function App() {
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);
	const [answer, setAnswer] = useState('');
	const [message, setMessage] = useState('');
	const [allMovies, setAllMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [guessedMovieData, setGuessedMovieData] = useState(null); // Store data for guessed movie
	const [correctMovieData, setCorrectMovieData] = useState(null); // Store data for correct movie

	useEffect(() => {
		// Fetch today's movie
		fetch('http://localhost:5000/api/movies/today')
			.then((response) => response.json())
			.then((data) => setMovie(data))
			.catch((error) => {
				console.error("Error fetching today's movie:", error);
				setError("Error fetching today's game");
			});

		// Fetch all movie names for the autocomplete feature
		fetch('http://localhost:5000/api/movies')
			.then((response) => response.json())
			.then((data) => setAllMovies(data))
			.catch((error) => console.error('Error fetching all movies:', error));
	}, []);

	const getStarRating = (rating) => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 !== 0 ? '⭐️' : '';
		return '⭐️'.repeat(fullStars) + halfStar;
	};

	const todayDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const handleInputChange = (e) => {
		const input = e.target.value;
		setAnswer(input);

		if (input.trim() === '') {
			setFilteredMovies([]);
			return;
		}

		const filtered = allMovies.filter((movie) =>
			movie.toLowerCase().includes(input.toLowerCase())
		);
		setFilteredMovies(filtered);
	};

	const handleSelectMovie = (selectedMovie) => {
		setAnswer(selectedMovie);
		setFilteredMovies([]);
		submitAnswer(selectedMovie);
	};

	const submitAnswer = (selectedAnswer) => {
		fetch('http://localhost:5000/api/submit-answer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answer: selectedAnswer }),
		})
			.then((response) => response.json())
			.then((data) => {
				setMessage(data.message);
				setGuessedMovieData(data.guessedMovie); // Set the guessed movie data for display
				setCorrectMovieData(data.correctMovie); // Set the correct movie data for display
				setAnswer(''); // Clear the input field
			})
			.catch((error) => {
				console.error('Error submitting answer:', error);
				setMessage('Error submitting your answer');
			});
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='absolute top-20 w-full text-center mt-4'>
				<h2 className='text-4xl font-light text-yellow-500'>{todayDate}</h2>
			</div>

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

			<div className='w-full max-w-lg relative flex flex-col items-center'>
				<input
					type='text'
					value={answer}
					onChange={handleInputChange}
					placeholder='Guess Today’s Movie'
					className='w-full p-2 border border-gray-300 rounded mb-0'
				/>
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

			<table className='w-full mt-10 border-separate border-spacing-x-2'>
				<thead>
					<tr className=''>
						<td className='w-1/4 p-4  border border-gray-400 rounded-l-lg'>
							Title
						</td>
						<td className='w-1/4 p-4 border border-gray-400'>Director</td>
						<td className='w-1/4 p-4 border border-gray-400'>Genre</td>
						<td className='w-1/4 p-4 border border-gray-400 rounded-r-lg'>
							Rating
						</td>
					</tr>
				</thead>
			</table>

			<table className='w-full mt-6 border-separate border-spacing-x-1 border-spacing-y-2'>
				<thead>
					<tr className=''>
						<td className='h-10 p-4 bg-white border-gray-200 rounded-l-lg'></td>
						<td className='h-10 p-4 bg-white border-gray-200'></td>
						<td className='h-10 p-4 bg-white border-gray-200'></td>
						<td className='h-10 p-4 bg-white border-gray-200 rounded-r-lg'></td>
					</tr>
					<tr className=''>
						<th className='h-10 p-4 bg-white border-gray-200 rounded-l-lg'></th>
						<th className='h-10 p-4 bg-white border-gray-200'></th>
						<th className='h-10 p-4 bg-white border-gray-200'></th>
						<th className='h-10 p-4 bg-white border-gray-200 rounded-r-lg'></th>
					</tr>
					<tr className=''>
						<th className='h-10 p-4 bg-white border-gray-200 rounded-l-lg'></th>
						<th className='h-10 p-4 bg-white border-gray-200'></th>
						<th className='h-10 p-4 bg-white border-gray-200'></th>
						<th className='h-10 p-4 bg-white border-gray-200 rounded-r-lg'></th>
					</tr>
					<tr className=''>
						<th className='h-10 p-4 bg-white border-gray-200 rounded-l-lg'></th>
						<th className='h-10 p-4 bg-white border-gray-200'></th>
						<th className='h-10 p-4 bg-white border-gray-200'></th>
						<th className='h-10 p-4 bg-white border-gray-200 rounded-r-lg'></th>
					</tr>
				</thead>
			</table>

			{message && <p className='mt-4 text-green-500'>{message}</p>}
		</div>
	);
}

export default App;
