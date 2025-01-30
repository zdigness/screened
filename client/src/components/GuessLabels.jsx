import PropTypes from 'prop-types';

function GuessLabels() {
	return (
		<table className='w-full mt-10 border-separate border-spacing-x-2 text-gray-300 min-w-[370px] mr-2 ml-2'>
			<thead>
				<tr className=''>
					<td className='w-1/4 p-4 border border-gray-400 rounded-l-lg'>
						Release
					</td>
					<td className='w-1/4 p-4 border border-gray-400'>Rating</td>
					<td className='w-1/4 p-4 border border-gray-400'>Genre</td>
					<td className='w-1/4 p-4 border border-gray-400 rounded-r-lg'>
						Director
					</td>
				</tr>
			</thead>
		</table>
	);
}

GuessLabels.propTypes = {};

export default GuessLabels;
