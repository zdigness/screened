import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function GameStatsModal({ isVisible, onClose }) {
	return (
		<Modal
			visible={isVisible}
			transparent={true}
			animationType='slide'
			onRequestClose={onClose}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Game Stats</Text>
					<Text style={styles.bodyText}>Your stats go here...</Text>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

GameStatsModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default GameStatsModal;

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
		width: '80%',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 15,
	},
	bodyText: {
		fontSize: 16,
		color: '#555',
		textAlign: 'center',
		marginBottom: 20,
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
