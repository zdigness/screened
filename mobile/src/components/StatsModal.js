import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function StatsModal({
	showStatsModal,
	isStreakModalActive,
	toggleStreakModal,
	totalGames,
	oneGuessWins,
	twoGuessWins,
	threeGuessWins,
	fourGuessWins,
	streak,
	bestStreak,
}) {
	if (!showStatsModal) return null;

	const winPercentage = totalGames
		? (
				((oneGuessWins + twoGuessWins + threeGuessWins + fourGuessWins) /
					totalGames) *
				100
		  ).toFixed(0)
		: 0;

	const renderWinBar = (label, value) => {
		const barWidth = totalGames ? (value / totalGames) * 100 : 0;
		return (
			<View style={styles.winBarContainer}>
				<Text style={styles.barLabel}>{label}:</Text>
				<View style={[styles.winBar, { width: `${barWidth}%` }]}>
					<Text style={styles.barText}>{value}</Text>
				</View>
			</View>
		);
	};

	return (
		<Modal
			visible={isStreakModalActive}
			transparent={true}
			animationType='fade'
			onRequestClose={toggleStreakModal}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Your Stats</Text>
					<View style={styles.statsContainer}>
						<View style={styles.stat}>
							<Text style={styles.statValue}>{totalGames}</Text>
							<Text style={styles.statLabel}>Played</Text>
						</View>
						<View style={styles.stat}>
							<Text style={styles.statValue}>{winPercentage}%</Text>
							<Text style={styles.statLabel}>Win %</Text>
						</View>
						<View style={styles.stat}>
							<Text style={styles.statValue}>{streak}</Text>
							<Text style={styles.statLabel}>Streak</Text>
						</View>
						<View style={styles.stat}>
							<Text style={styles.statValue}>{bestStreak}</Text>
							<Text style={styles.statLabel}>Best Streak</Text>
						</View>
					</View>
					<Text style={styles.subTitle}>Win Distribution</Text>
					{renderWinBar('1', oneGuessWins)}
					{renderWinBar('2', twoGuessWins)}
					{renderWinBar('3', threeGuessWins)}
					{renderWinBar('4', fourGuessWins)}
					<TouchableOpacity
						style={styles.closeButton}
						onPress={toggleStreakModal}
					>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

StatsModal.propTypes = {
	showStatsModal: PropTypes.bool.isRequired,
	isStreakModalActive: PropTypes.bool.isRequired,
	toggleStreakModal: PropTypes.func.isRequired,
	totalGames: PropTypes.number.isRequired,
	oneGuessWins: PropTypes.number.isRequired,
	twoGuessWins: PropTypes.number.isRequired,
	threeGuessWins: PropTypes.number.isRequired,
	fourGuessWins: PropTypes.number.isRequired,
	streak: PropTypes.number.isRequired,
	bestStreak: PropTypes.number.isRequired,
};

export default StatsModal;

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		width: '90%',
		maxWidth: 400,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	stat: {
		alignItems: 'center',
	},
	statValue: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	statLabel: {
		fontSize: 16,
		color: '#555',
	},
	subTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	winBarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	barLabel: {
		width: 20,
		fontSize: 16,
		fontWeight: 'bold',
	},
	winBar: {
		flex: 1,
		height: 20,
		backgroundColor: '#555',
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
	},
	barText: {
		color: 'white',
		fontWeight: 'bold',
	},
	closeButton: {
		backgroundColor: '#007BFF',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		alignSelf: 'center',
		marginTop: 20,
	},
	closeButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
