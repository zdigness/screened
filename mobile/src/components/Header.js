import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Header({
	toggleModal,
	toggleStreakModal,
	revealHint,
	correctMovieData,
	hintRevealed,
}) {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.emoji}>🎥</Text>
				<Text style={styles.title}>Screened</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<View style={styles.iconButtons}>
					<TouchableOpacity
						style={styles.iconButton}
						onPress={toggleModal}
						accessibilityLabel='Information about the game'
					>
						<Text style={styles.iconText}>❔</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.iconButton}
						onPress={toggleStreakModal}
						accessibilityLabel='Streak Counter'
					>
						<Text style={styles.iconText}>🔥</Text>
					</TouchableOpacity>
				</View>
				{!hintRevealed ? (
					<TouchableOpacity style={styles.hintButton} onPress={revealHint}>
						<Text style={styles.hintButtonText}>Reveal Hint</Text>
					</TouchableOpacity>
				) : (
					<View style={styles.hintContainer}>
						<Text style={styles.hintText}>
							<Text style={styles.hintHighlight}>{correctMovieData.actor}</Text>
						</Text>
					</View>
				)}
			</View>
		</View>
	);
}

Header.propTypes = {
	toggleModal: PropTypes.func.isRequired,
	toggleStreakModal: PropTypes.func.isRequired,
	revealHint: PropTypes.func.isRequired,
	correctMovieData: PropTypes.object.isRequired,
	hintRevealed: PropTypes.bool.isRequired,
};

export default Header;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},
	titleContainer: {
		alignItems: 'center',
	},
	emoji: {
		fontSize: 40,
		color: '#FFD700',
		marginBottom: 10,
	},
	title: {
		fontSize: 30,
		color: '#FFD700',
		fontWeight: '300',
		textAlign: 'center',
	},
	buttonsContainer: {
		alignItems: 'center',
		marginTop: 10,
	},
	iconButtons: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	iconButton: {
		marginHorizontal: 10,
		backgroundColor: '#FFF',
		borderRadius: 10,
		padding: 10,
	},
	iconText: {
		fontSize: 24,
		color: '#000',
	},
	hintButton: {
		backgroundColor: '#007BFF',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	hintButtonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16,
	},
	hintContainer: {
		backgroundColor: '#F5F5F5',
		borderColor: '#D1D1D1',
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	hintText: {
		fontSize: 16,
		fontWeight: '600',
	},
	hintHighlight: {
		color: '#007BFF',
	},
});
