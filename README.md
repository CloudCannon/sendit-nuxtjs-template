# Sendit

Sendit is a polished marketing website template for Nuxt. Browse through a [live demo](https://fleek-onion.cloudvent.net/).

![Sendit template screenshot](/_screenshot.png)

[![Deploy to CloudCannon](https://buttons.cloudcannon.com/deploy.svg)](https://app.cloudcannon.com/register#sites/connect/github/CloudCannon/sendit-nuxtjs-template)

## Features

* Pre-built pages
* Pre-styled components
* Blog with pagination and category pages
* Configurable navigation and footer
* Multiple hero options
* Configurable theme colors
* Optimised for editing in [CloudCannon](https://cloudcannon.com/)

## Specifications

Sendit is built with [Nuxt 3](https://nuxtjs.org/).

Components are built with [Vue.js](https://vuejs.org/) using the [Composition API](https://vuejs.org/guide/introduction.html#composition-api), and are structured using [Bookshop](https://github.com/cloudcannon/bookshop).

This project uses the [Nuxt Content module](https://content.nuxtjs.org/) for handling Markdown content, with [Document-driven mode](https://content.nuxtjs.org/guide/writing/document-driven) for routing and for fetching page data.

## Setup

Clone this repository to your machine. The relevant build scripts can be found in the `package.json`:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build static site
$ npm run generate

# launch server with a preview of the built site
$ npm run preview
```

You can also add this site to [CloudCannon](https://app.cloudcannon.com/) by clicking the **Deploy to CloudCannon** button at the top of this page.

## Editing

Sendit is set up for adding, updating and removing pages, components, posts, company details and navigation elements in [CloudCannon](https://app.cloudcannon.com/).

### Components
* Pages are built using Vue components.
* Components are structured using the [Bookshop](https://github.com/cloudcannon/bookshop) system.

### Pages
* Set up for live editing in CloudCannon's Visual Editor.
* Changing the component data will re-render the page, letting you preview your changes without needing to rebuild.

### Posts

* Add, update and/or remove posts in the *Blog* collection.
* Edit posts' Markdown content in the WYSIWYG Content Editor.

### Nav/footer details

* Reused around the site to save multiple editing locations.
* Set in the *Data* section with respective names.

### Theme colors

* Theme colors can be set in *Data* / *Theme*.
* The main colors are set and variants of them are computed.
* The colors will update on the next build.

## SSG
* This site is build using the [Nuxt Content module](https://content.nuxtjs.org/) to generate a static site. SSR features are disabled.
* The project structure uses Nuxt Content's Document-driven mode. Read their docs here: https://content.nuxtjs.org/guide/writing/document-driven
* Page data is fetched with the `useContent()` composable.
* Page components are organized in an array named `content_blocks` within the page's front matter.
