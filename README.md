# Sendit

Sendit is a polished, marketing website template for Nuxt. Browse through a [live demo](https://fleek-onion.cloudvent.net/).

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

## Setup

1. Get a workflow going to see your site's output (with [CloudCannon](https://app.cloudcannon.com/)
or Nuxt.js locally).

## Develop

Sendit is built with [Nuxt.js](https://nuxtjs.org/) (version `2.15.8`).

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build

# generate static project
$ npm run generate
```
## Editing

Sendit is set up for adding, updating and removing pages, components, posts, portfolio items, company details and footer elements in [CloudCannon](https://app.cloudcannon.com/).

### Posts

* Add, update or remove a post in the *Blog* collection.

### Nav/footer details

* Reused around the site to save multiple editing locations.
* Set in the *Data* section with respective names

### Theme colors

* Theme colors can be set in *Data* / *Theme*
* The main colors are set and variants of them are computed
* The colors will update on the next build

## Nuxt Content
* The project structure uses Nuxt Content's Document-driven system. Read their docs: https://content.nuxtjs.org/guide/writing/document-driven
* Components are added in a pages front matter under content_blocks.
* To place components we simply fetch the content_blocks array from the front matter of the page we are on, and loop through this array in a components tag

## SSG
* This site is build using Static Site Generation. As this template is configured for CloudCannon SSR feature's are disabled.
## Components
* Components code (HTML / JS) is stored in the components folder and are auto loaded into the project.
* The component-library directory is used for CloudCannon live editing. YAML files inside this directory matching the path as the components code will be used as a blue print for CloudCannon's live editing.

