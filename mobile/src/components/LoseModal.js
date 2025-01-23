import React from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';

function LoseModal({
	showOutOfGuessesModal,
	closeOutOfGuessesModal,
	correctMovieData,
}) {
	return (
		<Modal
			visible={showOutOfGuessesModal}
			transparent={true}
			animationType='fade'
			onRequestClose={closeOutOfGuessesModal}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modalContent}>
					<View style={styles.box}>
						<Image
							source={{ uri: correctMovieData.poster_url }}
							style={styles.poster}
							resizeMode='cover'
						/>
						<View style={styles.info}>
							<Text style={styles.title}>
								{correctMovieData.title}: {correctMovieData.release_date}
							</Text>
							<Text style={styles.details}>
								Directed by: {correctMovieData.director}
							</Text>
							<Text style={styles.details}>
								Starring: {correctMovieData.actor}
							</Text>
						</View>
					</View>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={closeOutOfGuessesModal}
					>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

LoseModal.propTypes = {
	showOutOfGuessesModal: PropTypes.bool.isRequired,
	closeOutOfGuessesModal: PropTypes.func.isRequired,
	correctMovieData: PropTypes.shape({
		poster_url: PropTypes.string,
		title: PropTypes.string,
		release_date: PropTypes.string,
		director: PropTypes.string,
		actor: PropTypes.string,
	}).isRequired,
};

export default LoseModal;

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
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	box: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
		marginBottom: 20,
	},
	poster: {
		width: 100,
		height: 150,
		borderRadius: 8,
	},
	info: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		gap: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
		textAlign: 'center',
	},
	details: {
		fontSize: 16,
		color: '#555',
	},
	closeButton: {
		backgroundColor: '#007BFF',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	closeButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
