import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import dayjs from 'dayjs';

function ArchiveModal({ isModalActive, toggleModal }) {
	// Clerk authentication
	const { isSignedIn } = useUser();
	const [daysInMonth, setDaysInMonth] = useState([]);
	const [firstDayOffset, setFirstDayOffset] = useState(0);

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

	// Generate only past days and today, correctly aligned
	useEffect(() => {
		const today = dayjs();
		const currentDay = today.date(); // Gets today's date (1-31)
		const firstDayOfMonth = today.startOf('month').day(); // 0 = Sunday, 6 = Saturday

		// Offset for the first day to align correctly
		setFirstDayOffset(firstDayOfMonth);

		// Generate day list
		const daysArray = Array.from({ length: currentDay }, (_, i) => ({
			day: i + 1,
			weekday: dayjs()
				.date(i + 1)
				.format('dd')[0], // Get first letter of weekday (M, T, W...)
		}));
		setDaysInMonth(daysArray);
	}, []);

	return (
		<div
			className={`fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-[9999] transition-opacity duration-300 ${
				isModalActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			{/* Clickable Background to Close */}
			<div className='absolute inset-0' onClick={toggleModal}></div>

			{/* Full-Screen Modal Content */}
			<div
				className={`relative bg-white w-full h-full flex flex-col items-center shadow-xl transition-all duration-300 transform pt-60 ${
					isModalActive
						? 'translate-y-0 opacity-100'
						: 'translate-y-10 opacity-0'
				}`}
			>
				{/* Close Button */}
				<button
					className='absolute top-6 right-12 text-4xl font-bold text-gray-700 hover:text-gray-900 pt-[215px] pr-[600px]'
					onClick={toggleModal}
				>
					&times;
				</button>

				{/* Content Based on Sign-in Status */}
				{isSignedIn ? (
					<>
						<h2 className='text-4xl font-bold mb-6'>Archive</h2>

						{/* Weekday Header (Sunday First) */}
						<div className='grid grid-cols-7 gap-3 w-full max-w-md mb-4 text-center text-gray-600 font-semibold border-b-[1px] border-black pb-3'>
							<span>S</span>
							<span>M</span>
							<span>T</span>
							<span>W</span>
							<span>T</span>
							<span>F</span>
							<span>S</span>
						</div>

						{/* Calendar Grid */}
						<div className='grid grid-cols-7 gap-3 w-full max-w-md'>
							{/* Empty placeholders for correct alignment */}
							{Array.from({ length: firstDayOffset }).map((_, index) => (
								<div key={`empty-${index}`} className='w-12 h-12'></div>
							))}

							{/* Actual days */}
							{daysInMonth.map(({ day }) => (
								<div key={day} className='flex flex-col items-center'>
									<button className='w-12 h-12 flex items-center justify-center border rounded-md bg-gray-200 hover:bg-gray-300 transition border-black'></button>
									<span className='text-sm font-medium mt-1'>{day}</span>
								</div>
							))}
						</div>
					</>
				) : (
					<>
						<h2 className='text-4xl font-bold mb-6'>Access Denied</h2>
						<p className='text-lg text-gray-700'>
							Please sign in to view the archive.
						</p>
					</>
				)}
			</div>
		</div>
	);
}

ArchiveModal.propTypes = {
	isModalActive: PropTypes.bool.isRequired,
	toggleModal: PropTypes.func.isRequired,
};

export default ArchiveModal;
