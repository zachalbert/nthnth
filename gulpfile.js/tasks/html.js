var config         = require('../config')
if(!config.tasks.html) return

var browserSync    = require('browser-sync')
var theConfig      = require('config')
var contentfulSync = require("../lib/contentfulSync")
var contentfulPages = require("../lib/contentfulPages")
var data           = require('gulp-data')
var faker          = require('gulp-faker');
var fs             = require('fs')
var gulp           = require('gulp')
var gulpif         = require('gulp-if')
var handleErrors   = require('../lib/handleErrors')
var prettify       = require('gulp-jsbeautifier')
var path           = require('path')
var render         = require('gulp-nunjucks-render')
var exclude        = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [
    path.join(
      config.root.src,
      config.tasks.html.src,
      '/**/*.{' + config.tasks.html.extensions + '}'
    ),
    exclude
  ],
  dest: path.join(config.root.dest, config.tasks.html.dest),
}

var getData = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile)
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

var htmlTask = function() {

  return gulp.src(paths.src)
    .pipe(contentfulPages())
    .pipe(data(contentfulSync))
    .pipe(data(getData))
    .pipe(data(function(file) {
      return { path: file.relative }
    }))
    .pipe(faker())
    .on('error', handleErrors)
    .pipe(render({
      path: [path.join(config.root.src, config.tasks.html.src)],
      envOptions: {
        watch: false,
        autoescape: false
      },
      manageEnv: function(environment) {
        environment.addGlobal('getContext', function() {
          return this.ctx;
        });
        environment.addGlobal('getCanonicalLink', function(site, path) {
          return `//${ site.canonicalLink }/${ path }`
        });
        environment.addGlobal('config', theConfig);
        environment.addGlobal('getIframeSrc', function(src) {
          let url       = src.split(';src=')[1];
          let styleArgs = 'showTitle=0&amp;showNav=0&amp;showPrint=0&amp;showCalendars=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;';
          let iframeSrc = styleArgs + url;
          return src;
        })
      }
    }))
    .on('error', handleErrors)
    .pipe(prettify({
      "indent_size": 2,
      "preserve_newlines": true,
      "max_preserve_newlines": 0
    }))
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)

}

gulp.task('html', htmlTask)
module.exports = htmlTask
