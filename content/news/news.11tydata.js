export default {
	tags: ["posts"],
	layout: "layouts/post.njk",
	eleventyComputed: {
		authorData: (data) => {
			if (!data.author || !data.people) return null;
			return data.people.find((p) => p.id === data.author) || null;
		},
	},
};
