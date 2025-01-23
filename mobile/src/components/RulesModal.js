import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function RulesModal({ isModalActive, toggleModal }) {
	return (
		<Modal
			visible={isModalActive}
			transparent={true}
			animationType='fade'
			onRequestClose={toggleModal}
		>
			<View style={styles.modalBackground}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>How to Play</Text>

					{/* Release Date Section */}
					<View>
						<Text style={styles.sectionTitle}>Release Date</Text>
						<View style={styles.ruleItem}>
							<View style={styles.bullet}></View>
							<Text style={styles.ruleText}>
								Same year: <Text style={styles.greenText}>green</Text>
							</Text>
						</View>
						<View style={styles.ruleItem}>
							<View style={styles.bullet}></View>
							<Text style={styles.ruleText}>
								Within 2 years: <Text style={styles.yellowText}>yellow</Text>
							</Text>
						</View>
					</View>

					{/* Average Rating Section */}
					<View>
						<Text style={styles.sectionTitle}>Average Rating</Text>
						<View style={styles.ruleItem}>
							<View style={styles.bullet}></View>
							<Text style={styles.ruleText}>
								Same rating: <Text style={styles.greenText}>green</Text>
							</Text>
						</View>
						<View style={styles.ruleItem}>
							<View style={styles.bullet}></View>
							<Text style={styles.ruleText}>
								Within 0.2: <Text style={styles.yellowText}>yellow</Text>
							</Text>
						</View>
					</View>

					{/* Genre Section */}
					<View>
						<Text style={styles.sectionTitle}>Genre</Text>
						<View style={styles.ruleItem}>
							<View style={styles.bullet}></View>
							<Text style={styles.ruleText}>
								Same main genre: <Text style={styles.greenText}>green</Text>
							</Text>
						</View>
						<View style={styles.ruleItem}>
							<View style={styles.bullet}></View>
							<Text style={styles.ruleText}>
								Shares a minor genre:{' '}
								<Text style={styles.yellowText}>yellow</Text>
							</Text>
						</View>
					</View>

					{/* Director Section */}
					<View>
						<Text style={styles.sectionTitle}>Director</Text>
						<View style={styles.ruleItem}>
							<View style={styles.bullet}></View>
							<Text style={styles.ruleText}>
								Same director: <Text style={styles.greenText}>green</Text>
							</Text>
						</View>
					</View>

					<TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

RulesModal.propTypes = {
	isModalActive: PropTypes.bool.isRequired,
	toggleModal: PropTypes.func.isRequired,
};

export default RulesModal;

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
		alignItems: 'flex-start',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 10,
		alignSelf: 'center',
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 10,
	},
	ruleItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	bullet: {
		width: 8,
		height: 8,
		backgroundColor: 'black',
		borderRadius: 4,
		marginRight: 10,
	},
	ruleText: {
		fontSize: 16,
		color: '#333',
	},
	greenText: {
		color: 'green',
		fontWeight: 'bold',
	},
	yellowText: {
		color: 'orange',
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
