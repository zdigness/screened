export const getMSTDateStringYesterday = () => {
	const date = new Date();
	date.setHours(date.getHours() - 7);
	date.setDate(date.getDate() - 1);
	return date.toISOString().split('T')[0];
};
