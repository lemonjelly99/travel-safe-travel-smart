const highlightCurrentTag = (tags, currentTag) => {
	return (tags || []).map((tag) => ({
		...tag,
		type: tag === currentTag ? "primary" : tag.type,
	}));
};

export default highlightCurrentTag;
