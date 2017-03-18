var config = require('config')
var gulp = require('gulp')

var delay = function(cb) {
  setTimeout(function() { cb() }, config.get('contentful.refreshDelay') * 1000)
}

gulp.task('delayRefresh', [], delay)
module.exports = delay
