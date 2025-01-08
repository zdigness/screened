import PropTypes from 'prop-types';

function Header({
	toggleModal,
	toggleStreakModal,
	revealHint,
	correctMovieData,
	hintRevealed,
}) {
	return (
		<div className=' w-full text-center flex justify-center items-center min-w-96 mr-4'>
			<div className=''>
				<h2 className='lg:text-4xl text-3xl font-light text-yellow-500 mb-4 ml-10 mr-10 text-center'>
					🎥
				</h2>
				<h2 className='lg:text-3xl text-3xl font-light text-yellow-500 ml-10 mr-10 text-center'>
					Screened
				</h2>
			</div>
			<div className='flex flex-col items-center justify-center '>
				<div className='w-full text-center flex flex-col items-center'>
					<div className='flex justify-center items-center mb-4'>
						<button
							className='ml-2 text-lg lg:text-2xl text-black bg-white rounded-xl pr-3 pl-3 pt-3 pb-3'
							onClick={toggleModal}
							aria-label='Information about the game'
						>
							❔
						</button>
						<button
							className='ml-2 text-lg lg:text-2xl text-black bg-white rounded-xl pr-3 pl-3 pt-3 pb-3'
							onClick={toggleStreakModal}
							aria-label='Streak Counter'
						>
							🔥
						</button>
					</div>
					{!hintRevealed ? (
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
					)}
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
};

export default Header;
