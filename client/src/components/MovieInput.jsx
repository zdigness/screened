import PropTypes from 'prop-types';

function MovieGuessInput({
	answer,
	handleInputChange,
	guessBoxMessage,
	correctGuess,
	outOfGuesses,
	filteredMovies,
	guessRows,
	handleSelectMovie,
}) {
	return (
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
	);
}

MovieGuessInput.propTypes = {
	answer: PropTypes.string.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	guessBoxMessage: PropTypes.string.isRequired,
	correctGuess: PropTypes.bool.isRequired,
	outOfGuesses: PropTypes.bool.isRequired,
	filteredMovies: PropTypes.array.isRequired,
	guessRows: PropTypes.array.isRequired,
	handleSelectMovie: PropTypes.func.isRequired,
};

export default MovieGuessInput;
