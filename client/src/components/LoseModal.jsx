import PropTypes from 'prop-types';

function LoseModal({
	showOutOfGuessesModal,
	closeOutOfGuessesModal,
	correctMovieData,
}) {
	if (!showOutOfGuessesModal) return null;

	return (
		<div className='modal is-active'>
			<div className='modal-background' onClick={closeOutOfGuessesModal}></div>
			<div className='modal-content'>
				<div className='box flex flex-row gap-14 items-center'>
					<div className='poster'>
						<img src={correctMovieData.poster_url} alt='Movie Poster' />
					</div>
					<div className='info flex flex-col items-center gap-4 text-2xl'>
						<p>
							{correctMovieData.title}: {correctMovieData.release_date}
						</p>
						<p>Directed by: {correctMovieData.director}</p>
						<p>Starring: {correctMovieData.actor}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

LoseModal.propTypes = {
	showOutOfGuessesModal: PropTypes.bool.isRequired,
	closeOutOfGuessesModal: PropTypes.func.isRequired,
	correctMovieData: PropTypes.object.isRequired,
};

export default LoseModal;
