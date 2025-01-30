import PropTypes from 'prop-types';

function GuessTable({ guessRows, correctMovieData, flipStatus }) {
	return (
		<table className='w-full mt-5 border-separate border-spacing-x-1 border-spacing-y-2 min-w-[370px] pr-2 pl-2'>
			<tbody>
				{guessRows.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{['release', 'rating', 'genre_1', 'director'].map(
							(col, colIndex) => {
								let bgColor = 'bg-white';
								if (row && correctMovieData) {
									if (row[col] === correctMovieData[col]) {
										bgColor = 'bg-green-500';
									} else if (
										col === 'rating' &&
										Math.abs(row[col] - correctMovieData.rating) <= 0.2
									) {
										bgColor = 'bg-yellow-300';
									} else if (
										col == 'release' &&
										row[col] === correctMovieData.release_date
									) {
										bgColor = 'bg-green-500';
									} else if (
										col == 'release' &&
										Math.abs(
											new Date(row[col]).getFullYear() -
												new Date(correctMovieData.release_date).getFullYear()
										) <= 2
									) {
										bgColor = 'bg-yellow-300';
									}
								}
								return (
									<td
										key={colIndex}
										className={`w-1/4 h-16 xl:h-14 p-4 border-gray-200 rounded-lg text-black min-w-20 text-sm ${bgColor} ${
											flipStatus[`${rowIndex}-${col}`] ? 'flip' : ''
										}`}
									>
										<div className='flex justify-center items-center h-full text-center overflow-hidden text'>
											{row ? row[col] : ''}
										</div>
									</td>
								);
							}
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
GuessTable.propTypes = {
	guessRows: PropTypes.array.isRequired,
	correctMovieData: PropTypes.object.isRequired,
	flipStatus: PropTypes.object.isRequired,
};

export default GuessTable;
