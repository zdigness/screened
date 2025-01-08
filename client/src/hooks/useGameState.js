import { useState, useEffect } from 'react';

export const useGameState = () => {
	const [gameState, setGameState] = useState(() => {
		const savedState = JSON.parse(localStorage.getItem('gameState'));
		return savedState || { guesses: 1, guessRows: [] };
	});

	useEffect(() => {
		localStorage.setItem('gameState', JSON.stringify(gameState));
	}, [gameState]);

	return [gameState, setGameState];
};
