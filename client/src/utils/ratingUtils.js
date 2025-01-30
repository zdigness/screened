export function getStarRating(rating) {
	const fullStars = Math.floor(rating);
	const halfStar = rating % 1 !== 0 ? '⭐️' : '';
	return '⭐️'.repeat(fullStars) + halfStar;
}
