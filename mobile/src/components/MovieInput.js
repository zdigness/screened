import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	TextInput,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

function MovieInput({ allMovies, guessRows, setGuessRows }) {
	const [inputValue, setInputValue] = useState('');
	const [filteredMovies, setFilteredMovies] = useState([]);

	const handleInputChange = (text) => {
		setInputValue(text);

		const matches = allMovies.filter((movie) =>
			movie.toLowerCase().includes(text.toLowerCase())
		);
		setFilteredMovies(matches);
	};

	const handleGuess = (guess) => {
		setGuessRows([...guessRows, guess]);
		setFilteredMovies([]);
		setInputValue('');
	};

	return (
		<View style={styles.container}>
			{/* Input Field */}
			<TextInput
				style={styles.input}
				value={inputValue}
				onChangeText={handleInputChange}
				placeholder="Guess today's movie"
				placeholderTextColor='#888'
			/>

			{/* Filtered Movie List */}
			{filteredMovies.length > 0 && (
				<FlatList
					data={filteredMovies}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.listItem}
							onPress={() => handleGuess(item)}
						>
							<Text style={styles.listItemText}>{item}</Text>
						</TouchableOpacity>
					)}
					style={styles.list}
				/>
			)}
		</View>
	);
}

MovieInput.propTypes = {
	allMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
	guessRows: PropTypes.arrayOf(PropTypes.string).isRequired,
	setGuessRows: PropTypes.func.isRequired,
};

export default MovieInput;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingHorizontal: 10,
		marginTop: 20,
	},
	input: {
		height: 40,
		borderColor: '#CCC',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		backgroundColor: '#FFF',
		color: '#333',
	},
	list: {
		marginTop: 10,
		backgroundColor: '#FFF',
		borderColor: '#CCC',
		borderWidth: 1,
		borderRadius: 5,
		maxHeight: 150,
	},
	listItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#EEE',
	},
	listItemText: {
		fontSize: 16,
		color: '#333',
	},
});
