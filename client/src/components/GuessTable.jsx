import PropTypes from 'prop-types';

function GuessTable({ guessRows }) {
	return (
		<table className='guess-table'>
			<thead>
				<tr>
					<th>Release</th>
					<th>Rating</th>
					<th>Genre</th>
					<th>Director</th>
				</tr>
			</thead>
			<tbody>
				{guessRows.map((guess, idx) => (
					<tr key={idx}>
						<td>{guess?.release || '-'}</td>
						<td>{guess?.rating || '-'}</td>
						<td>{guess?.genre || '-'}</td>
						<td>{guess?.director || '-'}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
GuessTable.propTypes = {
	guessRows: PropTypes.array.isRequired,
};

export default GuessTable;
