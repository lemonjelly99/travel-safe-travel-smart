const csms = (collectionApi) => {
	// If people is global data, access it via the first item's data
	const people = collectionApi.getAll()[0]?.data?.people || [];
	return people.filter(
		(p) => p.role && p.role.toLowerCase().includes("community safety"),
	);
};

export default csms;
