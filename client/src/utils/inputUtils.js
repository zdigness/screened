export const handleInputChange = (
	e,
	allMovies,
	guessRows,
	setAnswer,
	setFilteredMovies
) => {
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

export const handleSelectMovie = (
	selectedMovie,
	setAnswer,
	setFilteredMovies
) => {
	setAnswer(selectedMovie);
	setFilteredMovies([]);
};

export const submitAnswer = (
	selectedAnswer,
	guessRows,
	setGuessRows,
	setAnswer,
	setCorrectGuess,
	setOutOfGuesses,
	setGuesses,
	setFlipStatus,
	setGuessBoxMessage,
	setShowCorrectModal,
	setShowOutOfGuessesModal,
	flipStatus,
	guesses
) => {
	// Extract all guessed movie titles from guessRows
	const guessedMovies = guessRows
		.filter((row) => row && row.title) // Ensure the row is not null and has a title
		.map((row) => row.title);

	// Check if the movie has already been guessed
	if (guessedMovies.includes(selectedAnswer)) {
		alert("You've already guessed this movie! Try another one.");
		return;
	}

	// Fetch answer verification
	fetch('http://localhost:5000/api/submit-answer', {
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

					// Update stats
					const stats = JSON.parse(localStorage.getItem('stats')) || {
						total: 0,
						oneGuess: 0,
						twoGuess: 0,
						threeGuess: 0,
						fourGuess: 0,
					};

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
				} else if (guesses === 4) {
					setOutOfGuesses(true);
					setGuessBoxMessage('Out of guesses, try again tomorrow!');
					setShowOutOfGuessesModal(true);
					localStorage.setItem('outOfGuesses', JSON.stringify(true));

					const stats = JSON.parse(localStorage.getItem('stats')) || {
						total: 0,
						oneGuess: 0,
						twoGuess: 0,
						threeGuess: 0,
						fourGuess: 0,
					};
					stats.total += 1;
					localStorage.setItem('stats', JSON.stringify(stats));
				} else {
					setGuesses(guesses + 1);
				}
			}, Object.keys(rowData).length * 600);
		})
		.catch((error) => {
			console.error('Error submitting answer:', error);
		});
};
