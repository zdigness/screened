import { useState, useEffect } from 'react';
import './App.css'; // Ensure Tailwind and custom CSS are included

function App() {
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);
	const [answer, setAnswer] = useState('');
	const [allMovies, setAllMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [guesses, setGuesses] = useState(1);
	const [guessRows, setGuessRows] = useState([null, null, null, null]);
	const [flipStatus, setFlipStatus] = useState({}); // Track flip animations
	const [correctMovieData, setCorrectMovieData] = useState({
		genre: null,
		rating: null,
		director: null,
		title: null,
	}); // Store data for the correct movie

	useEffect(() => {
		// Fetch today's movie
		fetch('http://localhost:5000/api/movies/today')
			.then((response) => response.json())
			.then((data) => {
				setMovie(data);
				setCorrectMovieData({
					genre:
						data.genre.charAt(0).toUpperCase() +
						data.genre.slice(1).toLowerCase(),
					rating: data.average_rating,
					director: data.director,
					title: data.name,
				});
			})
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
				setAnswer(''); // Clear the input field

				// Temporary row data to update cell by cell with a delay
				const rowData = {
					genre:
						data.guessedMovie.genre.charAt(0).toUpperCase() +
						data.guessedMovie.genre.slice(1).toLowerCase(),
					rating: data.guessedMovie.average_rating,
					director: data.guessedMovie.director,
					title: data.guessedMovie.name,
				};

				const updatedGuessRows = [...guessRows];
				const newFlipStatus = { ...flipStatus };

				// Function to update each cell with a delay
				Object.keys(rowData).forEach((col, colIndex) => {
					setTimeout(() => {
						updatedGuessRows[guesses - 1] = {
							...updatedGuessRows[guesses - 1],
							[col]: rowData[col],
						};
						newFlipStatus[`${guesses - 1}-${col}`] = true;
						setFlipStatus({ ...newFlipStatus });
						setGuessRows([...updatedGuessRows]);
					}, colIndex * 500);
				});
				setGuesses(guesses + 1); // Move to the next guess after all cells are updated
			})
			.catch((error) => {
				console.error('Error submitting answer:', error);
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
					className='w-full p-2 border border-gray-300 rounded mb-0'
					type='text'
					value={answer}
					onChange={handleInputChange}
					placeholder={'Guess Today’s Movie ' + '																' + guesses + '/4'}
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
						<td className='w-1/4 p-4 border border-gray-400 rounded-l-lg'>
							Genre
						</td>
						<td className='w-1/4 p-4 border border-gray-400'>Rating</td>
						<td className='w-1/4 p-4 border border-gray-400'>Director</td>
						<td className='w-1/4 p-4 border border-gray-400 rounded-r-lg'>
							Title
						</td>
					</tr>
				</thead>
			</table>

			<table className='w-full mt-6 border-separate border-spacing-x-1 border-spacing-y-2'>
				<tbody>
					{guessRows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{['genre', 'rating', 'director', 'title'].map((col, colIndex) => (
								<td
									key={colIndex}
									className={`w-1/4 h-12 p-4 border-gray-200 rounded-lg text-black ${
										row &&
										correctMovieData &&
										row[col] === correctMovieData[col]
											? 'bg-green-500'
											: 'bg-white'
									} ${flipStatus[`${rowIndex}-${col}`] ? 'flip' : ''}`}
								>
									{row ? row[col] : ''}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
