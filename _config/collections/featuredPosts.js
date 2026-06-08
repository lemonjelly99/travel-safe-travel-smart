const featuredPosts = (collectionApi) => {
	return collectionApi
		.getFilteredByTag("posts")
		.filter((post) => post.data.featured)
		.reverse();
};

export default featuredPosts;
