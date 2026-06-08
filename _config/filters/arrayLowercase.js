const arrayLowercase = (array) => {
	if (!Array.isArray(array)) return array;
	return array.map((s) => s.toLowerCase());
};

export default arrayLowercase;
