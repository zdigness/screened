import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './src/components/Header'; // Header Component
import StatsModal from './src/components/StatsModal'; // StatsModal Component
import RulesModal from './src/components/RulesModal'; // RulesModal Component
import GuessTable from './src/components/GuessTable'; // GuessTable Component
import MovieInput from './src/components/MovieInput'; // MovieInput Component
import LoseModal from './src/components/LoseModal'; // LoseModal Component
import CorrectGuessModal from './src/components/CorrectGuessModal'; // CorrectGuessModal Component

export default function App() {
	const [isStreakModalActive, setIsStreakModalActive] = useState(false);
	const [showStatsModal, setShowStatsModal] = useState(false);
	const [showLoseModal, setShowLoseModal] = useState(false);
	const [showCorrectModal, setShowCorrectModal] = useState(false);
	const [guessRows, setGuessRows] = useState([]);
	const [totalGames, setTotalGames] = useState(10);
	const [oneGuessWins, setOneGuessWins] = useState(2);
	const [twoGuessWins, setTwoGuessWins] = useState(4);
	const [threeGuessWins, setThreeGuessWins] = useState(3);
	const [fourGuessWins, setFourGuessWins] = useState(1);
	const [streak, setStreak] = useState(5);
	const [bestStreak, setBestStreak] = useState(7);
	const [hintRevealed, setHintRevealed] = useState(false);

	const correctMovieData = {
		poster_url: 'https://example.com/poster.jpg',
		title: 'Inception',
		release_date: '2010',
		director: 'Christopher Nolan',
		actor: 'Leonardo DiCaprio',
	};

	const toggleStreakModal = () => setIsStreakModalActive(!isStreakModalActive);
	const toggleStatsModal = () => setShowStatsModal(!showStatsModal);
	const closeLoseModal = () => setShowLoseModal(false);
	const closeCorrectModal = () => setShowCorrectModal(false);
	const revealHint = () => setHintRevealed(true);

	return (
		<View style={styles.container}>
			{/* Header */}
			<Header
				toggleModal={toggleStatsModal}
				toggleStreakModal={toggleStreakModal}
				revealHint={revealHint}
				correctMovieData={correctMovieData}
				hintRevealed={hintRevealed}
			/>

			{/* Modals */}
			<StatsModal
				showStatsModal={showStatsModal}
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
			<RulesModal
				isModalActive={showStatsModal}
				toggleModal={toggleStatsModal}
			/>
			<LoseModal
				showOutOfGuessesModal={showLoseModal}
				closeOutOfGuessesModal={closeLoseModal}
				correctMovieData={correctMovieData}
			/>
			<CorrectGuessModal
				showCorrectModal={showCorrectModal}
				closeCorrectModal={closeCorrectModal}
				correctMovieData={correctMovieData}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		padding: 20,
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginTop: 20,
	},
	button: {
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
