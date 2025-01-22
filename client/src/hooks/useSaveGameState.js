import { useEffect } from 'react';
import { getMSTDateString } from '../utils/dateUtils';

function useSaveGameState({
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
}) {
	useEffect(() => {
		const saveGameState = () => {
			const gameState = {
				guesses,
				guessRows,
				correctGuess,
			};
			localStorage.setItem('gameState', JSON.stringify(gameState));

			const today = getMSTDateString();

			const streakData = JSON.parse(localStorage.getItem('streakData')) || {
				streak: 0,
				bestStreak: 0,
				lastWinDate: null,
			};

			if (correctGuess && streakData.lastWinDate !== today) {
				const yesterday = new Date();
				yesterday.setDate(yesterday.getDate() - 1);
				const yesterdayDate = yesterday.toISOString().split('T')[0];

				let newStreak = 1;

				if (streakData.lastWinDate === yesterdayDate) {
					newStreak = streakData.streak + 1;
				}

				setStreak(newStreak);
				const updatedBestStreak = Math.max(newStreak, streakData.bestStreak);
				setBestStreak(updatedBestStreak);

				localStorage.setItem(
					'streakData',
					JSON.stringify({
						streak: newStreak,
						bestStreak: updatedBestStreak,
						lastWinDate: today,
					})
				);

				const stats = JSON.parse(localStorage.getItem('stats')) || null;
				setTotalGames(stats.total || 0);
				setOneGuessWins(stats.oneGuess || 0);
				setTwoGuessWins(stats.twoGuess || 0);
				setThreeGuessWins(stats.threeGuess || 0);
				setFourGuessWins(stats.fourGuess || 0);
			} else if (!correctGuess && guesses === 4) {
				setStreak(0);
				localStorage.setItem(
					'streakData',
					JSON.stringify({
						streak: 0,
						bestStreak: streakData.bestStreak,
						lastWinDate: null,
					})
				);
			}
		};

		const timeout = setTimeout(saveGameState, 500);
		return () => clearTimeout(timeout);
	}, [
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
	]);
}

export default useSaveGameState;
