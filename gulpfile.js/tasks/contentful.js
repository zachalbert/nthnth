
var contentful   = require('contentful')
var config       = require("../../config")
var gulp         = require('gulp')

var contentfulTask = function(cb) {
  var client = contentful.createClient(config.contentful)
  client.getEntries().then(function(entries) {
    cb()
  })
}

gulp.task('contentful', contentfulTask)
module.exports = contentfulTask
