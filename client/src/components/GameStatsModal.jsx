import PropTypes from 'prop-types';

function GameStatsModal({ isVisible, onClose }) {
	if (!isVisible) return null;

	return (
		<div className='modal'>
			<div className='modal-content'>
				<h2>Game Stats</h2>
				<p>Your stats go here...</p>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
}

GameStatsModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default GameStatsModal;
