const filterTagList = (tags) => {
	return (tags || []).filter((tag) => ["all", "posts"].indexOf(tag) === -1);
};

export default filterTagList;
