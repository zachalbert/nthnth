# Getting started

- Get the keys from:
    - `APIs -> Content delivery / preview keys -> Website key`
    - [Management Key](https://www.contentful.com/developers/docs/references/authentication/#the-content-management-api) -> Getting OAuth Token

```bash
cp config/default.json config/development.json
# Edit and add contentful keys
npm install
npm start
```

# Debugging

## How do I see what variables are in the templates?

- When in development mode, you can access `__config__` from the console to see all defined variables at the top level.
- Are you in a macro or partial? Use `{{ this | dump }}` to see it on the page.

# Contentful

## Data Model

- site
  - title
  - description
  - styleClasses - added to `<body></body>`
  - canonicalLink - should be the hostname, used to construct a link for every page (based off path)
  - twitterUsername - username of the page (or site's) author
  - favicon - upload of the favicon
  - pages - the top level pages for the site

## Navigation

The navigation is constructed via. links from the root site object and goes down via. children.

    site -> pages -> children(pages)

## Integration with Netlify

- Create a webhook in Netlify, copy the url
- Go to `Settings -> Webhooks` in Contentful, paste the url

# Overview

Forked from [Gulp Starter](https://github.com/vigetlabs/gulp-starter.git), then
stuff was changed and added:

- Nunjucks for templating, located in `src/html`
- Content editing is done in markdown on prose.io
- Gulp will process all `*.md` docs in `src/content/*`
- Continuous deployment is set up through host netlify, which is watching the
repo for commits to `master`. `https://resolutebuilders.netlify.com/`
- As such, all dev should be done on branches and PR'ed into master. For now,
let's use the main `dev` branch.

## TODO

[ ] More robust image overlays that do color grading and correction
[ ] Go over H5BP optimizations

## Components
[x] Section
[x] Content blocks
[ ] Form builder; port forms from the base project to start

What follows is stuff from the original readme.

--

Features | Tools Used
------ | -----
**CSS** | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps
**JavaScript** | [Babel](http://babeljs.io/), [Webpack](http://webpack.github.io/)
**HTML** | [Nunjucks](https://mozilla.github.io/nunjucks/), [gulp-data](https://github.com/colynb/gulp-data), or bring your own
**Images** | Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin)
**Icons** | Auto-generated [SVG Sprites](https://github.com/w0rm/gulp-svgstore) and/or [Icon Fonts](https://www.npmjs.com/package/gulp-iconfont)
**Fonts** | Folder and `.sass` mixin for including WebFonts
**Live Updating** | [BrowserSync](http://www.browsersync.io/), [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware), [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
**Production Builds** | JS and CSS are [uglified](https://github.com/terinjokes/gulp-uglify) and [minified](http://cssnano.co/), [filename md5 hashing (reving)](https://github.com/sindresorhus/gulp-rev), [file size reporting](https://github.com/jaysalvat/gulp-sizereport), local production [Express](http://expressjs.com/) server for testing builds.
**JS Testing** | [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/), Example [Travis CI](https://travis-ci.org/) integration
**Deployment** | Quickly deploy `public` folder to gh-pages with [`gulp-gh-pages`](https://github.com/shinnn/gulp-gh-pages)

## Usage
Make sure Node installed. I recommend using [NVM](https://github.com/creationix/nvm) to manage versions.

This has been tested on Node `0.12.x` - `5.9.0`, and should work on newer versions as well. [File an issue](https://github.com/vigetlabs/gulp-starter/issues) if it doesn't!

#### Install Dependencies
```bash
npm install
```

#### Run development tasks:
```
npm start
```
Aliases: `npm run gulp`, `npm run development`

This is where the magic happens. The perfect front-end workflow. This runs the default gulp task, which starts compiling, watching, and live updating all our files as we change them. BrowserSync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional BrowserSync tools available on port 3001!

Why run this as an npm script? NPM scripts add ./node_modules/bin to the path when run, using the packages version installed with this project, rather than a globally installed ones. Never `npm install -g` and get into mis-matched version issues again. These scripts are defined in the `scripts` property of `package.json`.

#### Run in tests in watch mode:
```bash
npm run test:watch
```

#### Run tests once:
```bash
npm run test
```

#### Build production files:
```bash
npm run production
```

### Start compiling, serving, and watching files
```
npm run gulp
```

(or `npm run development`)

This runs `gulp` from `./node_modules/bin`, using the version installed with this project, rather than a globally installed instance. All commands in the package.json `scripts` work this way. The `gulp` command runs the `default` task, defined in `gulpfile.js/tasks/default.js`.

All files will compile in development mode (uncompressed with source maps). [BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers. Don't forget about the additional BrowserSync tools available on `localhost:3001`!

To run any other existing task, simply add the task name after the `gulp` command. Example:

```bash
npm run gulp production
```

## Additional Task Details

### Build production-ready files
```
npm run production
```

This will compile revisioned and compressed files to `./public`. To build production files and preview them locally, run

```
npm run demo
```

This will start a static server that serves your production files to http://localhost:5000. This is primarily meant as a way to preview your production build locally, not necessarily for use as a live production server.

### Deploy to gh-pages
```
npm run deploy
```
This task compiles production code and then uses [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages) to push the contents of your `dest.root` to a `gh-pages` (or other specified) branch, viewable at http://[your-username].github.io/[your-repo-name]. Be sure to update the `homepage` property in your `package.json`.

GitHub Pages isn't the most robust of hosting solutions (you'll eventually run into relative path issues), but it's a great place to quickly share in-progress work, and you get it for free.

[Surge.sh](http://surge.sh/) might be a good alternative for production-ready static hosting to check out, and is just as easy to deploy to. Where ever you're deploying to, all you need to do is `npm run gulp production` and transfer the contents of the `public` folder to your server however you see fit.

For non-static sites (Rails, Craft, etc.), make sure the `production` task runs as part of your deploy process.
