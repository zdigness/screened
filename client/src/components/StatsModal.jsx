import PropTypes from 'prop-types';

function StatsModal({
	showStatsModal,
	isStreakModalActive,
	toggleStreakModal,
	totalGames,
	oneGuessWins,
	twoGuessWins,
	threeGuessWins,
	fourGuessWins,
	streak,
	bestStreak,
}) {
	if (!showStatsModal) return null;

	return (
		<div className={`modal ${isStreakModalActive ? 'is-active' : ''}`}>
			<div
				className='modal-background'
				onClick={toggleStreakModal}
				aria-label='Close streak modal'
			></div>
			<div className='modal-content flex justify-center items-center'>
				<div className='box bg-white max-w-lg w-full rounded-lg sm:p-6 p-4 shadow-lg mr-2 ml-2'>
					<h2 className='text-2xl font-bold mb-4 text-center'>Your Stats</h2>
					<ul className='mb-4 flex items-center justify-center sm:gap-10 gap-10'>
						<li>
							<div className='text-lg'>{totalGames}</div>
							<div className='flex items-center'>Played</div>
						</li>
						<li>
							<div className='text-lg'>
								{(isNaN(
									((oneGuessWins +
										twoGuessWins +
										threeGuessWins +
										fourGuessWins) /
										totalGames) *
										100
								)
									? 0
									: ((oneGuessWins +
											twoGuessWins +
											threeGuessWins +
											fourGuessWins) /
											totalGames) *
									  100
								).toFixed(0)}
							</div>
							<div className='flex items-center'>Win %</div>
						</li>
						<li>
							<div className='text-lg'>{streak}</div>
							<div className='flex items-center'>Streak</div>
						</li>
						<li>
							<div className='text-lg'>{bestStreak}</div>
							<div className='flex items-center'>Best Streak</div>
						</li>
					</ul>
					<div className='flex flex-col text-left'>
						<h3 className='text-xl font-semibold mb-2'>Win Distribution</h3>
						<ul className='space-y-2'>
							<li className='flex items-center'>
								<span className='w-6'>1:</span>
								<div
									className='bg-gray-500 h-6 rounded-md flex items-center justify-center text-white font-bold min-w-10 sm:max-w-96 max-w-60'
									style={{
										width: `${(oneGuessWins / totalGames) * 700 + 20}px`,
									}}
								>
									{oneGuessWins}
								</div>
							</li>
							<li className='flex items-center'>
								<span className='w-6'>2:</span>
								<div
									className='bg-gray-500 h-6 rounded-md flex items-center justify-center text-white font-bold min-w-10 sm:max-w-96 max-w-60'
									style={{
										width: `${(twoGuessWins / totalGames) * 700 + 20}px`,
									}}
								>
									{twoGuessWins}
								</div>
							</li>
							<li className='flex items-center'>
								<span className='w-6'>3:</span>
								<div
									className='bg-gray-500 h-6 rounded-md flex items-center justify-center text-white font-bold min-w-10 sm:max-w-96 max-w-60'
									style={{
										width: `${(threeGuessWins / totalGames) * 700 + 20}px`,
									}}
								>
									{threeGuessWins}
								</div>
							</li>
							<li className='flex items-center'>
								<span className='w-6'>4:</span>
								<div
									className='bg-gray-500 h-6 rounded-md flex items-center justify-center text-white font-bold min-w-10 sm:max-w-96 max-w-60'
									style={{
										width: `${(fourGuessWins / totalGames) * 700 + 20}px`,
									}}
								>
									{fourGuessWins}
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<button
				className='modal-close is-large'
				onClick={toggleStreakModal}
				aria-label='Close'
			></button>
		</div>
	);
}

StatsModal.propTypes = {
	showStatsModal: PropTypes.bool.isRequired,
	isStreakModalActive: PropTypes.bool.isRequired,
	toggleStreakModal: PropTypes.func.isRequired,
	totalGames: PropTypes.number.isRequired,
	oneGuessWins: PropTypes.number.isRequired,
	twoGuessWins: PropTypes.number.isRequired,
	threeGuessWins: PropTypes.number.isRequired,
	fourGuessWins: PropTypes.number.isRequired,
	streak: PropTypes.number.isRequired,
	bestStreak: PropTypes.number.isRequired,
};

export default StatsModal;
