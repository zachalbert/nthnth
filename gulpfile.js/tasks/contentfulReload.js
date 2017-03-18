var _  = require("lodash")
var config = require('config')
var gulp = require('gulp')
var tunnel = require('contentful-webhook-tunnel')

var reloadTask = function() {
  // This is a stupid hack because of the crappy library.
  process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN = config.get(
    "contentful.manageToken")

  var server = tunnel.createServer({
    "spaces": [ config.get("contentful.space") ]
  });

  var handle = _.debounce(function () {
    console.log("Triggered refresh...")
    setTimeout(function() { gulp.run('html') },
      config.get('contentful.refreshDelay') * 1000)
  }, config.get('contentful.refreshDelay') * 1000, {
    'leading': true,
    'trailing': false
  });

  server.on("publish", handle)
  server.on("unpublish", handle)

  server.listen();
}

gulp.task('contentfulReload', [], reloadTask)
module.exports = reloadTask
