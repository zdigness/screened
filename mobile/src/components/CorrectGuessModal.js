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

function CorrectGuessModal({
	showCorrectModal,
	closeCorrectModal,
	correctMovieData,
}) {
	if (!showCorrectModal) return null;

	return (
		<Modal
			visible={showCorrectModal}
			transparent={true}
			animationType='fade'
			onRequestClose={closeCorrectModal}
		>
			<TouchableOpacity
				style={styles.modalBackground}
				onPress={closeCorrectModal}
			>
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
				</View>
			</TouchableOpacity>
		</Modal>
	);
}

CorrectGuessModal.propTypes = {
	showCorrectModal: PropTypes.bool.isRequired,
	closeCorrectModal: PropTypes.func.isRequired,
	correctMovieData: PropTypes.shape({
		poster_url: PropTypes.string,
		title: PropTypes.string,
		release_date: PropTypes.string,
		director: PropTypes.string,
		actor: PropTypes.string,
	}).isRequired,
};

export default CorrectGuessModal;

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
	},
	box: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
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
});
