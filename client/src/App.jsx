// imports
import './App.css'; // Ensure Tailwind and custom CSS are included

// components
import Header from './components/Header';
import CorrectGuessModal from './components/CorrectGuessModal';
import LoseModal from './components/LoseModal';
import StatsModal from './components/StatsModal';
import RulesModal from './components/RulesModal';
import SettingsModal from './components/SettingsModal';
import ArchiveModal from './components/ArchiveModal';
import Review from './components/Review';
import MovieGuessInput from './components/MovieInput';
import GuessLabels from './components/GuessLabels';
import GuessTable from './components/GuessTable';

// hooks
import useFetchMovies from './hooks/useFetchMovies';
import useFetchTodayMovie from './hooks/useFetchTodayMovie';
import useGameState from './hooks/useGameState';
import useLoadGame from './hooks/useLoadGame';
import useSaveGameState from './hooks/useSaveGameState';

// utils
import {
	handleInputChange,
	handleSelectMovie,
	submitAnswer,
} from './utils/inputUtils';

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
		isSettingsModalActive,
		setIsSettingsModalActive,
		isArchiveModalActive,
		setIsArchiveModalActive,
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

	// toggles
	const toggleModal = () => {
		setIsModalActive(!isModalActive);
	};

	const toggleStreakModal = () => {
		setIsStreakModalActive(!isStreakModalActive);
	};

	const toggleSettingsModal = () => {
		setIsSettingsModalActive(!isSettingsModalActive);
	};

	const toggleArchiveModal = () => {
		setIsArchiveModalActive(!isArchiveModalActive);
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
			{/* Header */}
			<Header
				toggleModal={toggleModal}
				toggleStreakModal={toggleStreakModal}
				revealHint={revealHint}
				correctMovieData={correctMovieData}
				hintRevealed={hintRevealed}
				toggleSettingsModal={toggleSettingsModal}
				toggleArchiveModal={toggleArchiveModal}
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
			<SettingsModal
				isModalActive={isSettingsModalActive}
				toggleModal={toggleSettingsModal}
			/>
			<ArchiveModal
				isModalActive={isArchiveModalActive}
				toggleModal={toggleArchiveModal}
			/>

			{/* Review */}
			<Review movie={movie} todayMovieError={todayMovieError} />

			{/* Movie Guess Input */}
			<MovieGuessInput
				answer={answer}
				handleInputChange={(e) =>
					handleInputChange(
						e,
						allMovies,
						guessRows,
						setAnswer,
						setFilteredMovies
					)
				}
				guessBoxMessage={guessBoxMessage}
				correctGuess={correctGuess}
				outOfGuesses={outOfGuesses}
				filteredMovies={filteredMovies}
				guessRows={guessRows}
				handleSelectMovie={(selectedMovie) => {
					handleSelectMovie(selectedMovie, setAnswer, setFilteredMovies);
					submitAnswer(
						selectedMovie,
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
					);
				}}
			/>

			{/* Guess Labels */}
			<GuessLabels />

			{/* Guess Table */}
			<GuessTable
				guessRows={guessRows}
				correctMovieData={correctMovieData}
				flipStatus={flipStatus}
			/>
		</div>
	);
}

export default App;
