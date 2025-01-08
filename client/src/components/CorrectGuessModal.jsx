import PropTypes from 'prop-types';

function CorrectGuessModal({
	showCorrectModal,
	closeCorrectModal,
	correctMovieData,
}) {
	if (!showCorrectModal) return null;

	return (
		<div className='modal is-active'>
			<div className='modal-background' onClick={closeCorrectModal}></div>
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

CorrectGuessModal.propTypes = {
	showCorrectModal: PropTypes.bool.isRequired,
	closeCorrectModal: PropTypes.func.isRequired,
	correctMovieData: PropTypes.object.isRequired,
};

export default CorrectGuessModal;
