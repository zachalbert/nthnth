var config       = require('../config')
if(!config.tasks.markdownToJSON) return

var browserSync    = require('browser-sync')
var gulp           = require('gulp')
var gutil          = require('gulp-util')
var marked         = require('marked')
var markdownToJSON = require('gulp-markdown-to-json')
var handleErrors   = require('../lib/handleErrors')
var path           = require('path')

var paths = {
  src: [path.join(config.root.src, config.tasks.markdownToJSON.src, '/**/*.{' + config.tasks.markdownToJSON.extensions + '}')],
  dest: path.join(config.root.dest, config.tasks.markdownToJSON.dest),
}

marked.setOptions({
  gfm: true,             // Github flavored markdown
  smartypants: true      // Smart quotes
});

var markdownToJSONTask = function() {

  return gulp.src(paths.src)
    .on('error', handleErrors)
    .pipe(gutil.buffer())
    .pipe(markdownToJSON(marked, config.tasks.markdownToJSON.output))
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)

}

gulp.task('markdownToJSON', markdownToJSONTask)
module.exports = markdownToJSONTask
