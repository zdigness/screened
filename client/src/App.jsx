// imports
import './App.css'; // Ensure Tailwind and custom CSS are included

// components
import Header from './components/Header';
import CorrectGuessModal from './components/CorrectGuessModal';
import LoseModal from './components/LoseModal';
import StatsModal from './components/StatsModal';
import RulesModal from './components/RulesModal';

// hooks
import useFetchMovies from './hooks/useFetchMovies';
import useFetchTodayMovie from './hooks/useFetchTodayMovie';
import useGameState from './hooks/useGameState';
import useLoadGame from './hooks/useLoadGame';
import useSaveGameState from './hooks/useSaveGameState';

function App() {
	// state
	const {
		answer,
		setAnswer,
		filteredMovies,
		setFilteredMovies,
		guesses,
		setGuesses,
		guessRows,
		setGuessRows,
		flipStatus,
		setFlipStatus,
		correctGuess,
		setCorrectGuess,
		outOfGuesses,
		setOutOfGuesses,
		guessBoxMessage,
		setGuessBoxMessage,
		isModalActive,
		setIsModalActive,
		isStreakModalActive,
		setIsStreakModalActive,
		streak,
		setStreak,
		bestStreak,
		setBestStreak,
		showCorrectModal,
		setShowCorrectModal,
		showOutOfGuessesModal,
		setShowOutOfGuessesModal,
		totalGames,
		setTotalGames,
		oneGuessWins,
		setOneGuessWins,
		twoGuessWins,
		setTwoGuessWins,
		threeGuessWins,
		setThreeGuessWins,
		fourGuessWins,
		setFourGuessWins,
		hintRevealed,
		setHintRevealed,
	} = useGameState();

	// fetch today's movie
	const {
		movie,
		correctMovieData,
		error: todayMovieError,
	} = useFetchTodayMovie();
	if (todayMovieError) {
		console.log("Error fetching today's movie:", todayMovieError);
	}

	// fetch all movies
	const { allMovies, error: moviesError } = useFetchMovies();
	if (moviesError) {
		console.log('Error fetching movies:', moviesError);
	}

	// load game state
	useLoadGame({
		setGuesses,
		setCorrectGuess,
		setOutOfGuesses,
		setGuessRows,
		setGuessBoxMessage,
		setStreak,
		setTotalGames,
		setOneGuessWins,
		setTwoGuessWins,
		setThreeGuessWins,
		setFourGuessWins,
	});

	// save game state
	useSaveGameState({
		guesses,
		guessRows,
		correctGuess,
		setStreak,
		setBestStreak,
		setTotalGames,
		setOneGuessWins,
		setTwoGuessWins,
		setThreeGuessWins,
		setFourGuessWins,
	});

	const getStarRating = (rating) => {
		const fullStars = Math.floor(rating);
		const halfStar = rating % 1 !== 0 ? '⭐️' : '';
		return '⭐️'.repeat(fullStars) + halfStar;
	};

	const handleInputChange = (e) => {
		const input = e.target.value;
		setAnswer(input);

		if (input.trim() === '') {
			setFilteredMovies([]);
			return;
		}

		// Extract guessed movie titles from guessRows
		const guessedMovies = guessRows
			.filter((row) => row && row.title)
			.map((row) => row.title);

		// Filter movies that start with the input string (case insensitive)
		const startsWithMatches = allMovies.filter(
			(movie) =>
				movie.toLowerCase().startsWith(input.toLowerCase()) &&
				!guessedMovies.includes(movie)
		);

		// Filter movies that contain the input string anywhere (case insensitive)
		const containsMatches = allMovies.filter((movie) => {
			const lowerCaseMovie = movie.toLowerCase();
			const lowerCaseInput = input.toLowerCase();

			return (
				lowerCaseMovie.includes(lowerCaseInput) &&
				!lowerCaseMovie.includes(` the ${lowerCaseInput}`) && // Exclude matches with ' the '
				!lowerCaseMovie.endsWith(` the`) && // Exclude matches ending in ' the'
				!guessedMovies.includes(movie) &&
				!startsWithMatches.includes(movie) // Avoid duplicates
			);
		});

		// Combine both matches, prioritizing the "starts with" matches
		setFilteredMovies([...startsWithMatches, ...containsMatches]);
	};

	const handleSelectMovie = (selectedMovie) => {
		setAnswer(selectedMovie);
		setFilteredMovies([]);
		submitAnswer(selectedMovie);
	};

	const submitAnswer = (selectedAnswer) => {
		// Extract all guessed movie titles from guessRows
		const guessedMovies = guessRows
			.filter((row) => row && row.title) // Ensure the row is not null and has a title
			.map((row) => row.title);

		// Check if the movie has already been guessed
		if (guessedMovies.includes(selectedAnswer)) {
			alert("You've already guessed this movie! Try another one.");
			return;
		}

		// dev
		fetch('http://localhost:5000/api/submit-answer', {
			//fetch(`${BASE_URL}/api/answer`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answer: selectedAnswer }),
		})
			.then((response) => response.json())
			.then((data) => {
				setAnswer('');

				const rowData = {
					release: data.guessedMovie.release_date,
					rating: data.guessedMovie.average_rating,
					genre_1: data.guessedMovie.genre_1,
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
						setShowCorrectModal(true);
						localStorage.setItem('correctGuess', JSON.stringify(true));

						// update stats
						const stats = JSON.parse(localStorage.getItem('stats')) || null;
						if (stats) {
							stats.total += 1;
							switch (guesses) {
								case 1:
									stats.oneGuess += 1;
									break;
								case 2:
									stats.twoGuess += 1;
									break;
								case 3:
									stats.threeGuess += 1;
									break;
								case 4:
									stats.fourGuess += 1;
									break;
								default:
									break;
							}
							localStorage.setItem('stats', JSON.stringify(stats));
						} else {
							const newStats = {
								total: 0,
								oneGuess: 0,
								twoGuess: 0,
								threeGuess: 0,
								fourGuess: 0,
							};
							newStats.total += 1;
							switch (guesses) {
								case 1:
									newStats.oneGuess += 1;
									break;
								case 2:
									newStats.twoGuess += 1;
									break;
								case 3:
									newStats.threeGuess += 1;
									break;
								case 4:
									newStats.fourGuess += 1;
									break;
								default:
									break;
							}
							localStorage.setItem('stats', JSON.stringify(newStats));
						}
					} else if (guesses === 4) {
						setOutOfGuesses(true);
						setGuessBoxMessage('Out of guesses, try again tomorrow!');
						setShowOutOfGuessesModal(true);
						localStorage.setItem('outOfGuesses', JSON.stringify(true));
						const stats = JSON.parse(localStorage.getItem('stats')) || null;
						if (stats) {
							// increment total
							stats.total += 1;
							localStorage.setItem('stats', JSON.stringify(stats));
						} else {
							const newStats = {
								total: 0,
								oneGuess: 0,
								twoGuess: 0,
								threeGuess: 0,
								fourGuess: 0,
							};
							newStats.total += 1;
							localStorage.setItem('stats', JSON.stringify(newStats));
						}
					} else {
						setGuesses(guesses + 1);
					}
				}, Object.keys(rowData).length * 600);
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
		setShowCorrectModal(false);
	};

	const closeOutOfGuessesModal = () => {
		setShowOutOfGuessesModal(false);
	};

	const revealHint = () => {
		setHintRevealed(true);
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			<Header
				toggleModal={toggleModal}
				toggleStreakModal={toggleStreakModal}
				revealHint={revealHint}
				correctMovieData={correctMovieData}
				hintRevealed={hintRevealed}
			/>

			{/* Modals */}
			<CorrectGuessModal
				showCorrectModal={showCorrectModal}
				closeCorrectModal={closeCorrectModal}
				correctMovieData={correctMovieData}
			/>
			<LoseModal
				showOutOfGuessesModal={showOutOfGuessesModal}
				closeOutOfGuessesModal={closeOutOfGuessesModal}
				correctMovieData={correctMovieData}
			/>
			<StatsModal
				showStatsModal={true}
				isStreakModalActive={isStreakModalActive}
				toggleStreakModal={toggleStreakModal}
				totalGames={totalGames}
				oneGuessWins={oneGuessWins}
				twoGuessWins={twoGuessWins}
				threeGuessWins={threeGuessWins}
				fourGuessWins={fourGuessWins}
				streak={streak}
				bestStreak={bestStreak}
			/>
			<RulesModal isModalActive={isModalActive} toggleModal={toggleModal} />

			<div className='max-w-3xl pl-10 pr-10 pt-4 pb-2 font-sans text-center bg-white rounded-lg shadow-md mt-8 mb-8 min-w-[360px]'>
				{todayMovieError && <p className='text-red-500'>{todayMovieError}</p>}
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
					<ul className='w-full max-h-48 border border-gray-300 rounded bg-white shadow-lg z-10 absolute top-full mt-1 overflow-y-auto min-w-80'>
						{/* Guessed Movies in Red */}
						{guessRows.map((guess, index) =>
							guess ? (
								<li
									key={`guessed-${index}`}
									className='p-2 cursor-default text-red-500 text-sm mb-2 border-b-2'
								>
									{guess.title}
								</li>
							) : null
						)}

						{/* Remaining Filtered Movies */}
						{filteredMovies
							.filter(
								(movie) => !guessRows.some((guess) => guess?.title === movie)
							)
							.map((movie, index) => (
								<li
									key={`filtered-${index}`}
									onClick={() => handleSelectMovie(movie)}
									className='p-2 cursor-pointer hover:bg-gray-200 text-black text-sm mb-2 border-b-2'
								>
									{movie}
								</li>
							))}
					</ul>
				)}
			</div>

			<table className='w-full mt-10 border-separate border-spacing-x-2 text-gray-300 min-w-[370px] mr-2 ml-2'>
				<thead>
					<tr className=''>
						<td className='w-1/4 p-4 border border-gray-400 rounded-l-lg'>
							Release
						</td>
						<td className='w-1/4 p-4 border border-gray-400'>Rating</td>
						<td className='w-1/4 p-4 border border-gray-400'>Genre</td>
						<td className='w-1/4 p-4 border border-gray-400 rounded-r-lg'>
							Director
						</td>
					</tr>
				</thead>
			</table>

			<table className='w-full mt-5 border-separate border-spacing-x-1 border-spacing-y-2 min-w-[370px] pr-2 pl-2'>
				<tbody>
					{guessRows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{['release', 'rating', 'genre_1', 'director'].map(
								(col, colIndex) => {
									let bgColor = 'bg-white';
									if (row && correctMovieData) {
										if (row[col] === correctMovieData[col]) {
											bgColor = 'bg-green-500';
										} else if (
											col === 'rating' &&
											Math.abs(row[col] - correctMovieData.rating) <= 0.2
										) {
											bgColor = 'bg-yellow-300';
										} else if (
											col == 'release' &&
											row[col] === correctMovieData.release_date
										) {
											bgColor = 'bg-green-500';
										} else if (
											col == 'release' &&
											Math.abs(
												new Date(row[col]).getFullYear() -
													new Date(correctMovieData.release_date).getFullYear()
											) <= 2
										) {
											bgColor = 'bg-yellow-300';
										}
									}
									return (
										<td
											key={colIndex}
											className={`w-1/4 h-16 xl:h-14 p-4 border-gray-200 rounded-lg text-black min-w-20 text-sm ${bgColor} ${
												flipStatus[`${rowIndex}-${col}`] ? 'flip' : ''
											}`}
										>
											<div className='flex justify-center items-center h-full text-center overflow-hidden text'>
												{row ? row[col] : ''}
											</div>
										</td>
									);
								}
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
