export function getMSTDateString() {
	const date = new Date();
	const offsetMST = -7; // MST is UTC-7
	date.setHours(date.getHours() + offsetMST); // Adjust by -7 hours

	// Format to 'YYYY-MM-DD'
	return date.toISOString().split('T')[0];
}

export function getMSTDateStringYesterday() {
	const date = new Date();
	const offsetMST = -7; // MST is UTC-7
	date.setHours(date.getHours() + offsetMST); // Adjust by -7 hours
	date.setDate(date.getDate() - 1); // Get yesterday's date

	// Format to 'YYYY-MM-DD'
	return date.toISOString().split('T')[0];
}
