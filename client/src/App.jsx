import { useState, useEffect } from 'react';
import './App.css'; // Ensure Tailwind and custom CSS are included

function App() {
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);
	const [answer, setAnswer] = useState('');
	const [allMovies, setAllMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [guesses, setGuesses] = useState(() => {
		const savedState = JSON.parse(localStorage.getItem('gameState'));
		return savedState?.guesses || 1;
	});
	const [guessRows, setGuessRows] = useState(() => {
		const savedState = JSON.parse(localStorage.getItem('gameState'));
		return savedState?.guessRows || [null, null, null, null];
	});
	const [flipStatus, setFlipStatus] = useState({});
	const [correctMovieData, setCorrectMovieData] = useState({
		genre: null,
		rating: null,
		director: null,
		title: null,
	});
	const [correctGuess, setCorrectGuess] = useState(false);
	const [outOfGuesses, setOutOfGuesses] = useState(false);
	const [guessBoxMessage, setGuessBoxMessage] = useState("Guess Today's Movie");
	const [isModalActive, setIsModalActive] = useState(false);
	const [isCorrectModalActive, setIsCorrectModalActive] = useState(false);
	const [isStreakModalActive, setIsStreakModalActive] = useState(false);
	const [streak, setStreak] = useState(() => {
		const savedStreak = JSON.parse(localStorage.getItem('streakData'));
		return savedStreak?.streak || 0;
	});

	useEffect(() => {
		const todayDate = getMSTDateString();
		const lastPlayDate = localStorage.getItem('lastPlayDate');

		// Check if it's a new day
		if (lastPlayDate !== todayDate) {
			// Clear only the game-related keys
			localStorage.removeItem('gameState');
			setGuesses(1);
			localStorage.removeItem('correctGuess');
			setCorrectGuess(false);
			localStorage.removeItem('outOfGuesses');
			setOutOfGuesses(false);
			setGuessRows([null, null, null, null]);
			// Set the new game date
			localStorage.setItem('lastPlayDate', todayDate); // Update last play date to today
		} else {
			// Restore any saved state for `correctGuess` or `outOfGuesses`
			const savedCorrectGuess = JSON.parse(
				localStorage.getItem('correctGuess')
			);
			if (savedCorrectGuess) {
				setGuessBoxMessage('Correct! 🎉');
				setCorrectGuess(true);
			}
			const savedOutOfGuesses = JSON.parse(
				localStorage.getItem('outOfGuesses')
			);
			if (savedOutOfGuesses) {
				setGuessBoxMessage('Out of guesses, try again tomorrow!');
				setOutOfGuesses(true);
			}
		}

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

		fetch('http://localhost:5000/api/movies')
			.then((response) => response.json())
			.then((data) => setAllMovies(data))
			.catch((error) => console.error('Error fetching all movies:', error));
	}, []);

	useEffect(() => {
		// add a timeout to prevent the state from being updated too quickly
		setTimeout(() => {
			const gameState = {
				guesses,
				guessRows,
				correctGuess,
			};
			localStorage.setItem('gameState', JSON.stringify(gameState));

			const streakData = JSON.parse(localStorage.getItem('streakData')) || {
				streak: 0,
				lastWinDate: null,
			};
			const today = getMSTDateString();

			if (correctGuess && streakData.lastWinDate !== today) {
				const newStreak = streak + 1;
				setStreak(newStreak);
				localStorage.setItem(
					'streakData',
					JSON.stringify({ streak: newStreak, lastWinDate: today })
				);
			} else if (guesses === 4 && !correctGuess) {
				setStreak(0);
				localStorage.setItem(
					'streakData',
					JSON.stringify({ streak: 0, lastWinDate: null })
				);
			}
		}, 500);
	}, [guesses, guessRows, correctGuess, streak]);

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
				setAnswer('');

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

				setTimeout(() => {
					if (data.message === 'Correct guess!') {
						setCorrectGuess(true);
						setGuessBoxMessage('Correct! 🎉');
						localStorage.setItem('correctGuess', JSON.stringify(true));
					} else if (guesses === 4) {
						setOutOfGuesses(true);
						setGuessBoxMessage('Out of guesses, try again tomorrow!');
						localStorage.setItem('outOfGuesses', JSON.stringify(true));
					} else {
						setGuesses(guesses + 1);
					}
				}, Object.keys(rowData).length * 600);

				setTimeout(() => {
					if (data.message === 'Correct guess!') {
						setIsCorrectModalActive(true);
					}
				}, 2500);
			})
			.catch((error) => {
				console.error('Error submitting answer:', error);
			});
	};

	const toggleModal = () => {
		setIsModalActive(!isModalActive);
	};

	const toggleStreakModal = () => {
		setIsStreakModalActive(!isStreakModalActive);
	};

	const closeCorrectModal = () => {
		setIsCorrectModalActive(false);
	};

	function getMSTDateString() {
		const date = new Date();
		const offsetMST = -7; // MST is UTC-7
		date.setHours(date.getHours() + offsetMST); // Adjust by -7 hours

		// Format to 'YYYY-MM-DD'
		return date.toISOString().split('T')[0];
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			<div className=' w-full text-center mt-4 flex justify-center items-center'>
				<h2 className='text-3xl font-light text-yellow-500 ml-10 text-center'>
					{todayDate}
				</h2>
				<button
					className='ml-10 text-2xl text-black bg-white rounded-xl pr-5 pl-5 pt-3 pb-3'
					onClick={toggleModal}
					aria-label='Information about the game'
				>
					?
				</button>
				<button
					className='ml-2 text-2xl text-black bg-white rounded-xl pr-3 pl-3 pt-3 pb-3'
					onClick={toggleStreakModal}
					aria-label='Streak Counter'
				>
					🔥
				</button>
			</div>

			{isStreakModalActive && (
				<div className={`modal ${isStreakModalActive ? 'is-active' : ''}`}>
					<div className='modal-background' onClick={toggleStreakModal}></div>
					<div className='modal-content'>
						<div className='box p-6'>
							<div className='text-2xl font-semibold mb-4'>Streak Counter</div>
							<p className='text-lg'>
								You have a streak of <span>{streak}</span> correct guesses!
							</p>
						</div>
					</div>
					<button
						className='modal-close is-large'
						onClick={toggleStreakModal}
						aria-label='close'
					></button>
				</div>
			)}

			{isModalActive && (
				<div className={`modal ${isModalActive ? 'is-active' : ''}`}>
					<div className='modal-background' onClick={toggleModal}></div>
					<div className='modal-content'>
						<div className='box p-6'>
							<div className='text-2xl font-semibold mb-4'>How to Play</div>

							{/* Genre Section */}
							<div className='text-left text-lg font-medium mb-2'>Genre</div>
							<ul className='space-y-2'>
								<li className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-black rounded-full'></div>
									<p>
										If the movie shares all the same genres, the tile will be{' '}
										<span className='text-green-500 font-semibold'>green</span>.
									</p>
								</li>
								<li className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-black rounded-full'></div>
									<p>
										If the movie shares at least one genres, the tile will be{' '}
										<span className='text-yellow-300 font-semibold'>
											yellow
										</span>
										.
									</p>
								</li>
							</ul>

							{/* Director Section */}
							<div className='text-left text-lg font-medium mt-4 mb-2'>
								Director
							</div>
							<ul className='space-y-2'>
								<li className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-black rounded-full'></div>
									<p>
										If the movie has the same director, the tile will be{' '}
										<span className='text-green-500 font-semibold'>green</span>.
									</p>
								</li>
							</ul>

							{/* Average Rating Section */}
							<div className='text-left text-lg font-medium mt-4 mb-2'>
								Average Rating
							</div>
							<ul className='space-y-2'>
								<li className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-black rounded-full'></div>
									<p>
										If the movie has the same average rating, the tile will be{' '}
										<span className='text-green-500 font-semibold'>green</span>.
									</p>
								</li>
								<li className='flex items-center gap-2'>
									<div className='w-2 h-2 bg-black rounded-full'></div>
									<p>
										If the average rating is within 0.2, the tile will be{' '}
										<span className='text-yellow-300 font-semibold'>
											yellow
										</span>
										.
									</p>
								</li>
							</ul>
						</div>
					</div>
					<button
						className='modal-close is-large'
						onClick={toggleModal}
						aria-label='close'
					></button>
				</div>
			)}

			{isCorrectModalActive && (
				<div className={`modal ${isCorrectModalActive ? 'is-active' : ''}`}>
					<div className='modal-background' onClick={closeCorrectModal}></div>
					<div className='modal-content'>
						<div className='box p-6'>
							<div className='text-2xl font-semibold mb-4'>
								Congratulations!
							</div>
							<p className='text-lg'>
								You guessed the movie correctly! You can try again tomorrow.
							</p>
						</div>
					</div>
					<button
						className='modal-close is-large'
						onClick={closeCorrectModal}
						aria-label='close'
					></button>
				</div>
			)}

			<div className='max-w-3xl pl-10 pr-10 pt-4 pb-2 font-sans text-center bg-white rounded-lg shadow-md mt-16 mb-8 min-w-80'>
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
					className='w-full p-2 border border-gray-300 rounded mb-0 text-white min-w-80'
					type='text'
					value={answer}
					onChange={handleInputChange}
					placeholder={`${guessBoxMessage}`}
					disabled={correctGuess || outOfGuesses} // Disable input if correct guess is true
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

			<table className='w-full mt-10 border-separate border-spacing-x-2 text-gray-300'>
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
							{['genre', 'rating', 'director', 'title'].map((col, colIndex) => {
								let bgColor = 'bg-white';
								if (row && correctMovieData) {
									if (row[col] === correctMovieData[col]) {
										bgColor = 'bg-green-500';
									} else if (
										col === 'rating' &&
										Math.abs(row[col] - correctMovieData.rating) <= 0.2
									) {
										bgColor = 'bg-yellow-300';
									}
								}
								return (
									<td
										key={colIndex}
										className={`w-1/4 h-14 p-4 border-gray-200 rounded-lg text-black min-w-20 ${bgColor} ${
											flipStatus[`${rowIndex}-${col}`] ? 'flip' : ''
										}`}
									>
										{row ? row[col] : ''}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
