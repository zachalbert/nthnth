var Promise      = require("bluebird")
var contentful   = require('contentful')
var config       = require("../../config")
var gulp         = require('gulp')

var contentfulTask = function(cb) {
  var client = contentful.createClient(config.contentful)
  Promise.props({
    "entries": client.getEntries(),
    "types": client.getContentTypes()
  }).then(function(result) {
    cb()
  })
}

gulp.task('contentful', contentfulTask)
module.exports = contentfulTask
