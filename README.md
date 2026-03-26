# eleventy-base-blog v9

A starter repository showing how to build a blog with the [Eleventy](https://www.11ty.dev/) site generator (using the [v3.0 release](https://github.com/11ty/eleventy/releases/tag/v3.0.0)).

## Getting Started

- [Want a more generic/detailed getting started guide?](https://www.11ty.dev/docs/getting-started/)

1. Make a directory and navigate to it:

```
mkdir my-blog-name
cd my-blog-name
```

2. Clone this Repository

```
git clone https://github.com/11ty/eleventy-base-blog.git .
```

_Optional:_ Review `eleventy.config.js` and `_data/metadata.js` to configure the site’s options and data.

3. Install dependencies

```
npm install
```

4. Run Eleventy

Generate a production-ready build to the `_site` folder:

```
npx @11ty/eleventy
```

Or build and host on a local development server:

```
npx @11ty/eleventy --serve
```

Or you can run [debug mode](https://www.11ty.dev/docs/debugging/) to see all the internals.

## Features

- Using [Eleventy v3](https://github.com/11ty/eleventy/releases/tag/v3.0.0) with zero-JavaScript output.
  - Content is exclusively pre-rendered (this is a static site).
  - Can easily [deploy to a subfolder without changing any content](https://www.11ty.dev/docs/plugins/html-base/)
  - All URLs are decoupled from the content’s location on the file system.
  - Configure templates via the [Eleventy Data Cascade](https://www.11ty.dev/docs/data-cascade/)
- **Performance focused**: four-hundos Lighthouse score out of the box!
  - _0 Cumulative Layout Shift_
  - _0ms Total Blocking Time_
- Local development live reload provided by [Eleventy Dev Server](https://www.11ty.dev/docs/dev-server/).
- Content-driven [navigation menu](https://www.11ty.dev/docs/plugins/navigation/)
- Fully automated [Image optimization](https://www.11ty.dev/docs/plugins/image/)
  - Zero-JavaScript output.
  - Support for modern image formats automatically (e.g. AVIF and WebP)
  - Processes images on-request during `--serve` for speedy local builds.
  - Prefers `<img>` markup if possible (single image format) but switches automatically to `<picture>` for multiple image formats.
  - Automated `<picture>` syntax markup with `srcset` and optional `sizes`
  - Includes `width`/`height` attributes to avoid [content layout shift](https://web.dev/cls/).
  - Includes `loading="lazy"` for native lazy loading without JavaScript.
  - Includes [`decoding="async"`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding)
  - Images can be co-located with blog post files.
- Per page CSS bundles [via `eleventy-plugin-bundle`](https://github.com/11ty/eleventy-plugin-bundle).
- Built-in [syntax highlighter](https://www.11ty.dev/docs/plugins/syntaxhighlight/) (zero-JavaScript output).
- Draft content: use `draft: true` to mark any template as a draft. Drafts are **only** included during `--serve`/`--watch` and are excluded from full builds. This is driven by the `addPreprocessor` configuration API in `eleventy.config.js`. Schema validator will show an error if non-boolean value is set in data cascade.
- Blog Posts
  - Automated next/previous links
  - Accessible deep links to headings
- Generated Pages
  - Home, Archive, and About pages.
  - [Atom feed included (with easy one-line swap to use RSS or JSON)](https://www.11ty.dev/docs/plugins/rss/)
  - `sitemap.xml`
  - Zero-maintenance tag pages ([View on the Demo](https://eleventy-base-blog.netlify.app/tags/))
  - Content not found (404) page

## Demos

- [Netlify](https://eleventy-base-blog.netlify.app/)
- [Vercel](https://demo-base-blog.11ty.dev/)
- [Cloudflare Pages](https://eleventy-base-blog-d2a.pages.dev/)
- [GitHub Pages](https://11ty.github.io/eleventy-base-blog/)

## Deploy this to your own site

Deploy this Eleventy site in just a few clicks on these services:

- Read more about [Deploying an Eleventy project](https://www.11ty.dev/docs/deployment/) to the web.
- [Deploy this to **Netlify**](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/eleventy-base-blog)
- [Deploy this to **Vercel**](https://vercel.com/import/project?template=11ty%2Feleventy-base-blog)
- Look in `.github/workflows/gh-pages.yml.sample` for information on [Deploying to **GitHub Pages**](https://www.11ty.dev/docs/deployment/#deploy-an-eleventy-project-to-git-hub-pages).
- [Try it out on **Stackblitz**](https://stackblitz.com/github/11ty/eleventy-base-blog)

### Implementation Notes

- `content/about/index.md` is an example of a content page.
- `content/blog/` has the blog posts but really they can live in any directory. They need only the `posts` tag to be included in the blog posts [collection](https://www.11ty.dev/docs/collections/).
- Use the `eleventyNavigation` key (via the [Eleventy Navigation plugin](https://www.11ty.dev/docs/plugins/navigation/)) in your front matter to add a template to the top level site navigation. This is in use on `content/index.njk` and `content/about/index.md`.
- Content can be in _any template format_ (blog posts needn’t exclusively be markdown, for example). Configure your project’s supported templates in `eleventy.config.js` -> `templateFormats`.
- The `public` folder in your input directory will be copied to the output folder (via `addPassthroughCopy` in the `eleventy.config.js` file). This means `./public/css/*` will live at `./_site/css/*` after your build completes.
- This project uses three [Eleventy Layouts](https://www.11ty.dev/docs/layouts/):
  - `_includes/layouts/base.njk`: the top level HTML structure
  - `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  - `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
- `_includes/postslist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `content/index.njk` has an example of how to use it.

#### Content Security Policy

If your site enforces a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (as public-facing sites should), you have a few choices (pick one):

1. In `base.njk`, remove `<style>{% getBundle "css" %}</style>` and uncomment `<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">`
2. Configure the server with the CSP directive `style-src: 'unsafe-inline'` (less secure).

# Travel Safe Travel Smart — Design System

**Version 1.0** · Keeping Communities Safe Across the UK Rail Network

---

## Overview

This design system provides all CSS, JavaScript, Nunjucks templates and sample data needed to build the Travel Safe Travel Smart website using [Eleventy](https://www.11ty.dev/) with Nunjucks templating.

### Architecture

CSS follows **ITCSS** (Inverted Triangle CSS) — a methodology that orders stylesheets by specificity from broad to narrow. No preprocessor is required; everything is plain CSS using `@import` and custom properties.

```
css/
├── 01-settings/   → Design tokens (custom properties)
├── 02-tools/      → Fluid helpers, calculations
├── 03-generic/    → Reset, box-sizing
├── 04-elements/   → Bare HTML element styles
├── 05-objects/    → Layout primitives (o-container, o-grid, o-stack…)
├── 06-components/ → Designed UI components (c-btn, c-card, c-hero…)
├── 07-utilities/  → Override helpers (u-hidden, u-text-center…)
└── main.css       → Entry point (imports all layers in order)
```

Naming follows **BEM** for components (`c-block__element--modifier`) and **ITCSS namespace prefixes**:

| Prefix | Layer     | Example          |
| ------ | --------- | ---------------- |
| `o-`   | Object    | `o-container`    |
| `c-`   | Component | `c-btn--primary` |
| `u-`   | Utility   | `u-text-center`  |

---

## Quick Start

### 1. Copy into your Eleventy project

```
your-project/
├── _data/
│   ├── people.js        ← from data/people.js
│   └── news.js          ← from data/news.js
├── _includes/
│   ├── layouts/
│   │   └── base.njk     ← from components/layouts/
│   ├── partials/
│   │   ├── site-header.njk
│   │   ├── site-footer.njk
│   │   ├── hero.njk
│   │   ├── csm-finder.njk
│   │   ├── contact-form.njk
│   │   ├── breadcrumb.njk
│   │   └── pagination.njk
│   └── macros/
│       ├── card.njk
│       ├── feature.njk
│       ├── button.njk
│       └── alert.njk
├── assets/
│   ├── css/             ← entire css/ directory
│   └── js/
│       ├── navigation.js
│       └── csm-finder.js
├── index.njk
└── .eleventy.js
```

### 2. Reference the stylesheet

In `base.njk` the `<link>` tag points to `/assets/css/main.css`. This uses CSS `@import` which works natively in all modern browsers. For production you may want to bundle/concatenate the files.

### 3. Add Google Fonts

The design system uses **DM Serif Display** (headings) and **Source Sans 3** (body). Both are loaded via Google Fonts in `base.njk`.

---

## Design Tokens

All design tokens live in `css/01-settings/settings.css` as CSS custom properties. Change any value here and it propagates everywhere.

### Colours

| Token                 | Value     | Usage                      |
| --------------------- | --------- | -------------------------- |
| `--color-navy`        | `#073552` | Primary brand, headings    |
| `--color-navy-dark`   | `#052840` | Footer, deep backgrounds   |
| `--color-navy-light`  | `#0a4a72` | Hover states, accents      |
| `--color-yellow`      | `#E8BD48` | Secondary brand, CTAs      |
| `--color-yellow-dark` | `#d4a832` | Hover on yellow elements   |
| `--color-cream`       | `#F4F5EC` | Surface / card backgrounds |

### Typography

| Token                   | Value            |
| ----------------------- | ---------------- |
| `--font-family-heading` | DM Serif Display |
| `--font-family-body`    | Source Sans 3    |
| `--text-base`           | 1rem (16px)      |

Type scale uses a **Major Third** ratio (1.25×) from `--text-xs` (0.75rem) through `--text-5xl` (3.75rem).

### Spacing

An **8px-based** scale from `--space-1` (4px) to `--space-32` (128px). Fluid spacing tokens (`--fluid-space-sm`, `--fluid-space-lg`, etc.) use `clamp()` for responsive spacing.

---

## Layout Objects

### Container

```html
<div class="o-container">…</div>
<div class="o-container o-container--lg">…</div>
```

Max-width variants: `--sm` (640px), `--md` (768px), `--lg` (1024px), `--xl` (1280px, default), `--max` (1440px).

### Grid

```html
<div class="o-grid o-grid--3">
	<div>Column 1</div>
	<div>Column 2</div>
	<div>Column 3</div>
</div>

<!-- Auto-fit responsive grid -->
<div class="o-grid o-grid--auto">…</div>
```

### Stack (vertical rhythm)

```html
<div class="o-stack">
	<p>Paragraph 1</p>
	<p>Paragraph 2</p>
</div>
```

Variants: `o-stack--sm`, `o-stack--lg`, `o-stack--xl`.

### Section spacing

```html
<section class="o-section">…</section>
<section class="o-section o-section--lg">…</section>
```

---

## Components

### Button (`c-btn`)

```html
<a class="c-btn c-btn--primary" href="/contact/">Contact Us</a>
<button class="c-btn c-btn--secondary" type="submit">Submit</button>
<a class="c-btn c-btn--outline" href="/what-we-do/">Learn More</a>
<a class="c-btn c-btn--outline-inverse" href="…">On dark bg</a>
<button class="c-btn c-btn--ghost">Text only</button>
```

**Sizes:** `c-btn--sm`, `c-btn--lg`
**Full width:** `c-btn--full`

**Nunjucks macro:**

```nunjucks
{% from "macros/button.njk" import button %}
{{ button({ label: "Get in touch", url: "/contact/", style: "primary" }) }}
```

### Hero (`c-hero`)

```nunjucks
{% set heroData = {
  kicker: "Travel Safe Travel Smart",
  title:  "Keeping Communities Safe Across the UK Rail Network",
  summary: "Working together to reduce risk, raise awareness and build safer railway communities.",
  primaryBtn: { label: "What We Do", url: "/what-we-do/" },
  secondaryBtn: { label: "Contact Us", url: "/contact/" }
} %}
{% include "partials/hero.njk" %}
```

Variants: default (full), `compact: true` for inner pages.

### Card (`c-card`)

```nunjucks
{% from "macros/card.njk" import card %}

{{ card({
  url:     "/news/rail-safety-week/",
  kicker:  "News",
  title:   "Rail Safety Week 2025",
  text:    "Record engagement across Kent and Sussex...",
  image:   "/assets/img/news/rsw-2025.jpg",
  footer:  "15 Nov 2025"
}) }}
```

Variants: `featured: true`, `horizontal: true`.

### Feature Block (`c-feature`)

```nunjucks
{% from "macros/feature.njk" import feature %}

{{ feature({
  icon:     "🎓",
  title:    "Education & Outreach",
  text:     "We deliver engaging, age-appropriate rail safety sessions…",
  linkUrl:  "/what-we-do/#education-and-outreach",
  linkText: "Learn more"
}) }}
```

Use `inverse: true` on dark backgrounds.

### Alert

```nunjucks
{% from "macros/alert.njk" import alert %}
{{ alert({ type: "success", title: "Sent!", message: "Your message has been sent.", dismissible: true }) }}
```

Types: `info`, `success`, `warning`, `error`.

---

## CSM Finder Component

The centrepiece interactive component. Displays Community Safety Managers on a Leaflet map with GeoJSON coverage areas, a searchable list, and accessible fallbacks.

### Usage

1. **Set `useMap: true`** in your page's front matter:

```yaml
---
title: Contact Us
layout: base.njk
useMap: true
---
```

2. **Include the partial:**

```nunjucks
{% include "partials/csm-finder.njk" %}
```

This will:

- Render the map/list toggle, search bar, and interactive map
- Output `people` data from `_data/people.js` as a JSON `<script>` tag
- Provide a `<noscript>` fallback listing all CSMs without JavaScript
- Load Leaflet CSS/JS only on pages where `useMap` is set

### Accessibility Features

| Feature        | Implementation                                                         |
| -------------- | ---------------------------------------------------------------------- |
| No-JS fallback | `<noscript>` block renders a static list of all CSMs                   |
| List view      | Toggle to "List" view for a non-visual, keyboard-navigable alternative |
| Live region    | Search results count is announced via `aria-live="polite"`             |
| Map labelling  | Map container has `role="application"` and descriptive `aria-label`    |
| Keyboard nav   | Leaflet keyboard controls enabled; scroll-zoom disabled until click    |
| Focus styles   | All interactive elements have visible `:focus-visible` outlines        |
| Markers        | `title` and `alt` attributes on all map markers                        |

### People Data Shape

```js
// _data/people.js
module.exports = [
	{
		id: "jane-smith",
		name: "Jane Smith",
		role: "Community Safety Manager",
		area: "Kent",
		email: "jane.smith@networkrail.co.uk",
		phone: "07700 900123",
		photo: "/assets/img/people/jane-smith.jpg", // optional
		lat: 51.27,
		lng: 0.52,
		coverage: {
			/* GeoJSON Feature or FeatureCollection */
		},
	},
];
```

- People whose `role` contains "Community Safety" or "CSM" are shown in the finder
- People without `lat`/`lng` appear in the list but not on the map
- People with other roles (e.g. "Content Editor") are filtered out automatically

### Configuration

Edit `CONFIG` at the top of `js/csm-finder.js` to change:

- Tile provider URL / attribution
- Default map centre and zoom
- Coverage area styling (stroke, fill, opacity)
- Marker colours

---

## Forms

### Contact Form

```nunjucks
{% include "partials/contact-form.njk" %}
```

Includes fields for name, email, phone, organisation, enquiry type (radio group), message, and privacy consent. Uses semantic HTML with `autocomplete` attributes, `aria-required`, hint text, and error styling classes.

**Validation classes:**

- `c-form__input--error` — red border on invalid fields
- `c-form__error` — error message below a field
- `c-form__banner--success` / `c-form__banner--error` — form-level feedback

---

## Page Templates

### Homepage example

```nunjucks
---
title: Home
layout: base.njk
useMap: true
---

{% from "macros/feature.njk" import feature %}
{% from "macros/card.njk" import card %}

{% set heroData = {
  kicker: "Travel Safe Travel Smart",
  title:  "Keeping Communities Safe Across the UK Rail Network",
  summary: "Working together to reduce risk, raise awareness and build safer railway communities.",
  primaryBtn: { label: "What We Do", url: "/what-we-do/" },
  secondaryBtn: { label: "Find Your CSM", url: "#csm-finder-heading" }
} %}
{% include "partials/hero.njk" %}

<section class="o-section u-bg-cream">
  <div class="o-container">
    <div class="c-section-header c-section-header--center">
      <span class="c-section-header__kicker">What We Do</span>
      <h2 class="c-section-header__title">Community Safety Initiatives</h2>
    </div>
    <div class="o-grid o-grid--auto">
      {{ feature({ icon: "🎓", title: "Education & Outreach", text: "…", linkUrl: "/what-we-do/#education" }) }}
      {{ feature({ icon: "🤝", title: "Partnership Working", text: "…", linkUrl: "/what-we-do/#partnerships" }) }}
      {{ feature({ icon: "🚫", title: "Reducing Trespass & ASB", text: "…", linkUrl: "/what-we-do/#trespass" }) }}
      {{ feature({ icon: "🚨", title: "Incident Support", text: "…", linkUrl: "/what-we-do/#incidents" }) }}
      {{ feature({ icon: "🌍", title: "Community Initiatives", text: "…", linkUrl: "/what-we-do/#initiatives" }) }}
    </div>
  </div>
</section>

{% include "partials/csm-finder.njk" %}

<section class="o-section">
  <div class="o-container">
    <div class="c-section-header">
      <span class="c-section-header__kicker">Latest</span>
      <h2 class="c-section-header__title">News & Updates</h2>
    </div>
    <div class="o-grid o-grid--3">
      {%- for article in news | sort(true, false, "date") | head(3) %}
      {{ card({
        url: "/news/" + article.slug + "/",
        kicker: article.tags[0] | title,
        title: article.title,
        text: article.excerpt,
        footer: article.date | readableDate
      }) }}
      {%- endfor %}
    </div>
  </div>
</section>
```

---

## File Listing

```
design-system/
├── README.md                          ← This file
├── css/
│   ├── main.css                       ← Entry point (@import all layers)
│   ├── 01-settings/settings.css       ← Design tokens
│   ├── 02-tools/tools.css             ← Fluid helpers
│   ├── 03-generic/generic.css         ← Reset
│   ├── 04-elements/elements.css       ← HTML elements
│   ├── 05-objects/objects.css         ← Layout patterns
│   ├── 06-components/
│   │   ├── skip-link.css
│   │   ├── site-header.css
│   │   ├── hero.css
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── feature.css
│   │   ├── form.css
│   │   ├── csm-finder.css
│   │   ├── misc.css                   ← Tag, breadcrumb, pagination, section header
│   │   ├── news.css
│   │   ├── alert.css
│   │   └── site-footer.css
│   └── 07-utilities/utilities.css
├── js/
│   ├── navigation.js                  ← Mobile nav toggle
│   └── csm-finder.js                  ← Map + list + search component
├── components/
│   ├── layouts/
│   │   └── base.njk                   ← Root HTML layout
│   ├── partials/
│   │   ├── site-header.njk
│   │   ├── site-footer.njk
│   │   ├── hero.njk
│   │   ├── csm-finder.njk
│   │   ├── contact-form.njk
│   │   ├── breadcrumb.njk
│   │   └── pagination.njk
│   └── macros/
│       ├── card.njk
│       ├── feature.njk
│       ├── button.njk
│       └── alert.njk
└── data/
    ├── people.js                      ← Sample people data
    └── news.js                        ← Sample news data
```
