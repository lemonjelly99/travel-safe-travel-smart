import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import metadata from "../../_data/metadata.js";

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		// templateData: {
		//   eleventyNavigation: {
		//     key: "Feed",
		//     order: 4,
		//   },
		// },
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: metadata.title,
			subtitle: metadata.description,
			base: metadata.url,
			// author: {
			// 	name: "Nick Turner",
			// },
		},
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");
}
