import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList } from 'react-native';

function GuessTable({ guessRows }) {
	const renderRow = ({ item }) => (
		<View style={styles.row}>
			<Text style={styles.cell}>{item?.release || '-'}</Text>
			<Text style={styles.cell}>{item?.rating || '-'}</Text>
			<Text style={styles.cell}>{item?.genre || '-'}</Text>
			<Text style={styles.cell}>{item?.director || '-'}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			{/* Table Header */}
			<View style={styles.header}>
				<Text style={styles.headerCell}>Release</Text>
				<Text style={styles.headerCell}>Rating</Text>
				<Text style={styles.headerCell}>Genre</Text>
				<Text style={styles.headerCell}>Director</Text>
			</View>

			{/* Table Body */}
			<FlatList
				data={guessRows}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderRow}
				contentContainerStyle={styles.body}
			/>
		</View>
	);
}

GuessTable.propTypes = {
	guessRows: PropTypes.arrayOf(
		PropTypes.shape({
			release: PropTypes.string,
			rating: PropTypes.string,
			genre: PropTypes.string,
			director: PropTypes.string,
		})
	).isRequired,
};

export default GuessTable;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingHorizontal: 10,
	},
	header: {
		flexDirection: 'row',
		backgroundColor: '#EEE',
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#CCC',
	},
	headerCell: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		color: '#333',
	},
	body: {
		backgroundColor: '#FFF',
	},
	row: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#EEE',
		padding: 10,
	},
	cell: {
		flex: 1,
		fontSize: 14,
		textAlign: 'center',
		color: '#555',
	},
});
