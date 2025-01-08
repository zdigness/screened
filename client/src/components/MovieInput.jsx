import { useState } from 'react';
import PropTypes from 'prop-types';

function MovieInput({ allMovies, guessRows, setGuessRows }) {
	const [inputValue, setInputValue] = useState('');
	const [filteredMovies, setFilteredMovies] = useState([]);

	const handleInputChange = (e) => {
		const query = e.target.value.toLowerCase();
		setInputValue(query);

		const matches = allMovies.filter((movie) =>
			movie.toLowerCase().includes(query)
		);
		setFilteredMovies(matches);
	};

	const handleGuess = (guess) => {
		setGuessRows([...guessRows, guess]);
		setFilteredMovies([]);
		setInputValue('');
	};

	return (
		<div className='movie-input'>
			<input
				type='text'
				value={inputValue}
				onChange={handleInputChange}
				placeholder="Guess today's movie"
			/>
			{filteredMovies.length > 0 && (
				<ul>
					{filteredMovies.map((movie, idx) => (
						<li key={idx} onClick={() => handleGuess(movie)}>
							{movie}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

MovieInput.propTypes = {
	allMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
	guessRows: PropTypes.arrayOf(PropTypes.string).isRequired,
	setGuessRows: PropTypes.func.isRequired,
};

export default MovieInput;
