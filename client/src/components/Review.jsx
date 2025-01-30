// src/components/MovieReview.jsx
import PropTypes from 'prop-types';

function Review({ movie, todayMovieError, getStarRating }) {
	return (
		<div className='max-w-3xl pl-10 pr-10 pt-4 pb-2 font-sans text-center bg-white rounded-lg shadow-md mt-8 mb-8 min-w-[360px]'>
			{todayMovieError && <p className='text-red-500'>{todayMovieError}</p>}
			{movie ? (
				<div>
					<span className='font-medium'>
						<p className='text-yellow-500 mb-4'>
							{movie.reviewer_name} {getStarRating(movie.review_rating)}
						</p>
					</span>
					<p className='mb-4 italic text-black'>
						&quot;{movie.review_text}&quot;
					</p>
				</div>
			) : (
				<p>Loading today&apos;s game...</p>
			)}
		</div>
	);
}

Review.propTypes = {
	movie: PropTypes.arrayOf(PropTypes.string).isRequired,
	todayMovieError: PropTypes.arrayOf(PropTypes.string).isRequired,
	getStarRating: PropTypes.func.isRequired,
};

export default Review;
