import PropTypes from 'prop-types';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/clerk-react';

function SettingsModal({ isModalActive, toggleModal }) {
	if (!isModalActive) return null;

	return (
		<div className={`modal ${isModalActive ? 'is-active' : ''}`}>
			<div className='modal-background' onClick={toggleModal}></div>
			<div className='modal-content'>
				<div className='box'>
					<div className='content'>
						<h2 className='mb-4'>Settings</h2>
						<p>Settings go here</p>
						<SignedIn>
							<UserButton />
						</SignedIn>
						<SignedOut>
							<SignInButton />
						</SignedOut>
					</div>
				</div>
			</div>
		</div>
	);
}

SettingsModal.propTypes = {
	isModalActive: PropTypes.bool.isRequired,
	toggleModal: PropTypes.func.isRequired,
};

export default SettingsModal;
