import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function Header({
	toggleModal,
	toggleStreakModal,
	toggleSettingsModal,
	toggleArchiveModal,
	revealHint,
	correctMovieData,
	hintRevealed,
}) {
	return (
		<div className=' w-full text-center flex justify-center items-center min-w-96 mr-4'>
			<div className='flex justify-center items-center p-10 mb-2'>
				<Button
					variant='contained'
					sx={{
						backgroundColor: '#ffffff',
						color: '#000000',
						border: '1px solid #000000',
						boxShadow: 'none',
						'&:hover': { backgroundColor: '#DFDFDF' },
						padding: '15px', // Increased padding for a bigger button
						fontSize: '1.25rem', // Larger text size
						minWidth: '150px', // Ensures the button is wider
						borderRadius: '100px', // Optional: rounded edges
					}}
					onClick={toggleArchiveModal}
				>
					Archive
				</Button>
			</div>

			<div className='flex flex-col items-center justify-center '>
				<div className='w-full text-center flex flex-col items-center'>
					<div className='flex justify-center items-center gap-2 mb-4'>
						<button
							className='w-fit h-fit inline-flex items-center justify-center bg-transparent rounded-full hover:bg-gray-200 p-2 transition hover:shadow-md focus:outline-none focus:ring-0'
							onClick={toggleModal}
							aria-label='Information about the game'
						>
							<img
								width='36'
								height='36'
								src='https://img.icons8.com/ios/100/help--v1.png'
								alt='help--v1'
								className='pointer-events-none'
							/>
						</button>

						<button
							className='w-fit h-fit inline-flex items-center justify-center bg-transparent rounded-full hover:bg-gray-200 p-1 pr-2 pl-2 transition hover:shadow-md'
							onClick={toggleStreakModal}
							aria-label='Streak Counter'
						>
							<img
								width='36'
								height='36'
								src='https://img.icons8.com/pastel-glyph/100/bar-chart--v2.png'
								alt='bar-chart--v2'
								className='pointer-events-none mb-2'
							/>
						</button>

						<button
							className='w-fit h-fit inline-flex items-center justify-center bg-transparent rounded-full hover:bg-gray-200 p-2 transition hover:shadow-md'
							onClick={toggleSettingsModal}
							aria-label='Settings'
						>
							<img
								width='36'
								height='36'
								src='https://img.icons8.com/ios/100/settings.png'
								alt='settings'
							/>
						</button>
					</div>

					{/* {!hintRevealed ? (
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-2'
							onClick={revealHint}
						>
							<p className='text-md font-semibold'>Reveal Hint</p>
						</button>
					) : (
						<div className='hint bg-gray-100 border border-gray-300 px-4 py-2 rounded shadow-md'>
							<p className='text-md font-semibold'>
								<span className='text-blue-600'>{correctMovieData.actor}</span>
							</p>
						</div>
					)} */}
				</div>
			</div>
		</div>
	);
}

Header.propTypes = {
	toggleModal: PropTypes.func.isRequired,
	toggleStreakModal: PropTypes.func.isRequired,
	revealHint: PropTypes.func.isRequired,
	correctMovieData: PropTypes.object.isRequired,
	hintRevealed: PropTypes.bool.isRequired,
	toggleSettingsModal: PropTypes.func.isRequired,
	toggleArchiveModal: PropTypes.func.isRequired,
};

export default Header;
