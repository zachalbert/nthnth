var config       = require('../config')
if(!config.tasks.markdown) return

var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var gulp         = require('gulp')
var markdown     = require('gulp-markdown')
var marked       = require('marked')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')
var exclude      = path.normalize('!**/{' + config.tasks.markdown.excludeFiles.join(',') + '}')

var paths = {
  src: [path.join(config.root.src, config.tasks.markdown.src, '/**/*.{' + config.tasks.markdown.extensions + '}'), exclude],
  dest: path.join(config.root.dest, config.tasks.markdown.dest),
}

marked.setOptions({
  gfm: true,             // Github flavored markdown
  smartypants: true      // Smart quotes
});

var markdownTask = function() {

  return gulp.src(paths.src)
    .on('error', handleErrors)
    .pipe(markdown())
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)

}

gulp.task('markdown', markdownTask)
module.exports = markdownTask
