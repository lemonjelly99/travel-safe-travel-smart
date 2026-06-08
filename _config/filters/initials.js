const initials = (string) => {
	if (!string) return string;
	return string
		.split(" ")
		.map((n) => n[0])
		.join("");
};

export default initials;
