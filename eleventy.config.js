import pluginPlugins from "./_config/plugins.js";
import * as shortcodes from "./_config/shortcodes/index.js";
import * as filters from "./_config/filters/index.js";
import * as collections from "./_config/collections/index.js";

// https://www.11ty.dev/docs/config/
// https://www.11ty.dev/docs/config-shapes/

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
	// Watch CSS files Runs Eleventy when these files change: https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
	eleventyConfig.addWatchTarget("css/**/*.css");
	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");
	// watch csm finder js
	eleventyConfig.addWatchTarget("public/csm-finder/**/*");

	// Filters
	Object.keys(filters || {}).forEach((key) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		eleventyConfig.addFilter(key, filters[key]);
	});

	// Shortcodes
	Object.keys(shortcodes || {}).forEach((key) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		eleventyConfig.addShortcode(key, shortcodes[key]);
	});

	// Passthrough copy
	// Copy the contents of the `public` folder to the output folder. For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/assets/",
	});
	// Ensure resources are copoied over, but only the file types we care about. This is important for the image pipeline and other resources.
	eleventyConfig.addPassthroughCopy({
		"content/resources/": "/assets/resources/",
	});
	// If your passthrough copy gets heavy and cumbersome, add this line to emulate the file copy on the dev server. Learn more: https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve
	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	// Content and post types
	// Posts collection is automatic via tags but you can add custom ones

	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft) {
			data.title = `${data.title} (draft)`;
		}

		if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	// Collections
	Object.keys(collections || {}).forEach((key) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		eleventyConfig.addCollection(key, shortcodes[key]);
	});

	// Modular config
	eleventyConfig.addPlugin(pluginPlugins);
}

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content", // default: "."
		includes: "../_includes", // default: "_includes" (`input` relative)
		data: "../_data", // default: "_data" (`input` relative)
		output: "_site",
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};
