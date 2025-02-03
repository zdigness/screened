import { useState } from 'react';

function useGameState() {
	const [answer, setAnswer] = useState('');
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [guesses, setGuesses] = useState(() => {
		const savedState = JSON.parse(localStorage.getItem('gameState'));
		return savedState?.guesses || 1;
	});
	const [guessRows, setGuessRows] = useState(() => {
		const savedState = JSON.parse(localStorage.getItem('gameState'));
		return savedState?.guessRows || [null, null, null, null, null];
	});
	const [flipStatus, setFlipStatus] = useState({});
	const [correctGuess, setCorrectGuess] = useState(false);
	const [outOfGuesses, setOutOfGuesses] = useState(false);
	const [guessBoxMessage, setGuessBoxMessage] = useState("Guess Today's Movie");
	const [isModalActive, setIsModalActive] = useState(false);
	const [isStreakModalActive, setIsStreakModalActive] = useState(false);
	const [isSettingsModalActive, setIsSettingsModalActive] = useState(false);
	const [streak, setStreak] = useState(() => {
		const savedStreak = JSON.parse(localStorage.getItem('streakData'));
		return savedStreak?.streak || 0;
	});
	const [bestStreak, setBestStreak] = useState(() => {
		const savedStreak = JSON.parse(localStorage.getItem('streakData'));
		return savedStreak?.bestStreak || 0;
	});
	const [showCorrectModal, setShowCorrectModal] = useState(false);
	const [showOutOfGuessesModal, setShowOutOfGuessesModal] = useState(false);

	// total games
	const [totalGames, setTotalGames] = useState(() => {
		const savedStats = JSON.parse(localStorage.getItem('stats'));
		return savedStats?.total || 0;
	});

	// amount of guess wins
	const [oneGuessWins, setOneGuessWins] = useState(() => {
		const savedStats = JSON.parse(localStorage.getItem('stats'));
		return savedStats?.oneGuess || 0;
	});

	const [twoGuessWins, setTwoGuessWins] = useState(() => {
		const savedStats = JSON.parse(localStorage.getItem('stats'));
		return savedStats?.twoGuess || 0;
	});

	const [threeGuessWins, setThreeGuessWins] = useState(() => {
		const savedStats = JSON.parse(localStorage.getItem('stats'));
		return savedStats?.threeGuess || 0;
	});

	const [fourGuessWins, setFourGuessWins] = useState(() => {
		const savedStats = JSON.parse(localStorage.getItem('stats'));
		return savedStats?.fourGuess || 0;
	});

	// hint
	const [hintRevealed, setHintRevealed] = useState(false); // New state for hint visibility

	// modals
	const [isArchiveModalActive, setIsArchiveModalActive] = useState(false);

	return {
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
	};
}

export default useGameState;
