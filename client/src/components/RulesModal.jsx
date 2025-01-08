import PropTypes from 'prop-types';

function RulesModal({ isModalActive, toggleModal }) {
	if (!isModalActive) return null;

	return (
		<div className={`modal ${isModalActive ? 'is-active' : ''}`}>
			<div className='modal-background' onClick={toggleModal}></div>
			<div className='modal-content flex justify-center items-center'>
				<div className='box p-6 bg-white max-w-lg w-full rounded-lg mr-2 ml-2'>
					<h2 className='text-2xl font-bold mb-4 text-center'>How to Play</h2>

					{/* Release Date Section */}
					<div className='text-left text-lg font-medium mb-2'>Release Date</div>
					<ul className='space-y-2'>
						<li className='flex items-center gap-2'>
							<div className='w-2 h-2 bg-black rounded-full'></div>
							<p>
								Same year:{' '}
								<span className='text-green-500 font-semibold'>green</span>
							</p>
						</li>
						<li className='flex items-center gap-2'>
							<div className='w-2 h-2 bg-black rounded-full'></div>
							<p>
								Within 2 years:{' '}
								<span className='text-yellow-300 font-semibold'>yellow</span>
							</p>
						</li>
					</ul>

					{/* Average Rating Section */}
					<div className='text-left text-lg font-medium mt-4 mb-2'>
						Average Rating
					</div>
					<ul className='space-y-2'>
						<li className='flex items-center gap-2'>
							<div className='w-2 h-2 bg-black rounded-full'></div>
							<p>
								Same rating:{' '}
								<span className='text-green-500 font-semibold'>green</span>
							</p>
						</li>
						<li className='flex items-center gap-2'>
							<div className='w-2 h-2 bg-black rounded-full'></div>
							<p>
								Within 0.2:{' '}
								<span className='text-yellow-300 font-semibold'>yellow</span>
							</p>
						</li>
					</ul>

					{/* Genre Section */}
					<div className='text-left text-lg font-medium mb-2 mt-4'>Genre</div>
					<ul className='space-y-2'>
						<li className='flex items-center gap-2'>
							<div className='w-2 h-2 bg-black rounded-full'></div>
							<p>
								Same main genre:{' '}
								<span className='text-green-500 font-semibold'>green</span>
							</p>
						</li>
						<li className='flex items-center gap-2'>
							<div className='w-2 h-2 bg-black rounded-full'></div>
							<p>
								Shares a minor genre:{' '}
								<span className='text-yellow-300 font-semibold'>yellow</span>
							</p>
						</li>
					</ul>

					{/* Director Section */}
					<div className='text-left text-lg font-medium mt-4 mb-2'>
						Director
					</div>
					<ul className='space-y-2'>
						<li className='flex items-center gap-2'>
							<div className='w-2 h-2 bg-black rounded-full'></div>
							<p>
								Same director:{' '}
								<span className='text-green-500 font-semibold'>green</span>
							</p>
						</li>
					</ul>
				</div>
			</div>
			<button
				className='modal-close is-large'
				onClick={toggleModal}
				aria-label='close'
			></button>
		</div>
	);
}

RulesModal.propTypes = {
	isModalActive: PropTypes.bool.isRequired,
	toggleModal: PropTypes.func.isRequired,
	showRulesModal: PropTypes.bool.isRequired,
};

export default RulesModal;
