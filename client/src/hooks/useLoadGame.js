import { useEffect } from 'react';
import {
	getMSTDateString,
	getMSTDateStringYesterday,
} from '../utils/dateUtils';

function useLoadGame({
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
}) {
	// load game
	useEffect(() => {
		// grab dates
		const todayDate = getMSTDateString();
		const lastPlayDate = localStorage.getItem('lastPlayDate');

		// check if its a new day
		if (lastPlayDate !== todayDate) {
			// reset streak data if it's a new day
			const savedStreakData = JSON.parse(localStorage.getItem('streakData'));
			const yesterday = getMSTDateStringYesterday();
			if (savedStreakData) {
				// if last play date isnt today or yesterday, reset streak
				console.log('lastPlayDate:', lastPlayDate);
				console.log('todayDate:', todayDate);
				console.log('yesterday:', yesterday);
				if (lastPlayDate !== todayDate && lastPlayDate !== yesterday) {
					// set streak to 0
					setStreak(0);
					localStorage.setItem(
						'streakData',
						JSON.stringify({
							streak: 0,
							bestStreak: savedStreakData.bestStreak,
							lastWinDate: savedStreakData.lastWinDate,
						})
					);
				}
			}

			// clear daily game data (new day)
			localStorage.removeItem('gameState');
			setGuesses(1);
			localStorage.removeItem('correctGuess');
			setCorrectGuess(false);
			localStorage.removeItem('outOfGuesses');
			setOutOfGuesses(false);
			setGuessRows([null, null, null, null]);

			// set new game date
			localStorage.setItem('lastPlayDate', todayDate);
		} else {
			// restore saved data for the current day
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

		// restore stats
		const savedStats = JSON.parse(localStorage.getItem('stats'));
		if (savedStats) {
			setTotalGames(savedStats.total || 0);
			setOneGuessWins(savedStats.oneGuess || 0);
			setTwoGuessWins(savedStats.twoGuess || 0);
			setThreeGuessWins(savedStats.threeGuess || 0);
			setFourGuessWins(savedStats.fourGuess || 0);
		}
	});
}

export default useLoadGame;
