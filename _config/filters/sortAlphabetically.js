const sortAlphabetically = (strings) =>
	(strings || []).sort((b, a) => b.localeCompare(a));

export default sortAlphabetically;
