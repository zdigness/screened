import PropTypes from 'prop-types';
import { useEffect } from 'react';

function ArchiveModal({ isModalActive, toggleModal }) {
	useEffect(() => {
		if (isModalActive) {
			document.body.style.overflow = 'hidden'; // Prevent scrolling
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isModalActive]);

	return (
		<div
			className={`fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-[9999] transition-opacity duration-300 ${
				isModalActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			{/* Clickable Background to Close */}
			<div className='absolute inset-0' onClick={toggleModal}></div>

			{/* Modal Content */}
			<div
				className={`relative bg-white w-full h-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 transform ${
					isModalActive
						? 'translate-y-0 opacity-100'
						: 'translate-y-10 opacity-0'
				}`}
			>
				{/* Close Button - Moved Closer to Center */}
				<button
					className='absolute top-6 right-12 text-4xl font-bold text-gray-700 hover:text-gray-900'
					onClick={toggleModal}
				>
					&times;
				</button>

				{/* Modal Content */}
				<h2 className='text-4xl font-bold mb-6'>Archive</h2>
				<p className='text-lg text-gray-700'>Archive goes here</p>
			</div>
		</div>
	);
}

ArchiveModal.propTypes = {
	isModalActive: PropTypes.bool.isRequired,
	toggleModal: PropTypes.func.isRequired,
};

export default ArchiveModal;
