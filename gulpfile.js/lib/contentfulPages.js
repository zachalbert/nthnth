
var Promise = require('bluebird');

var _      = require('lodash');
var Buffer = require('buffer').Buffer;
var config = require('../config')
var contentfulSync = require('./contentfulSync');
var File = require('gulp-util').File;
var path = require('path');
var readFile = Promise.promisify(require("fs").readFile);
var through = require('through2');

var createFile = function(data) {
  var fpath = path.join(
    __dirname,
    "../../",
    config.root.src,
    config.tasks.html.src,
    `layouts/${data.layout}.njk`)
  return readFile(fpath, "utf8").then(function(content) {
    return new File({
      path: data.name,
      contents: new Buffer(content)
    })
  })
}

var addPages = function() {

  var noop = function(chunk, enc, cb) { cb(null, chunk) }

  var flush = function(cb) {
    var _this = this;
    contentfulSync(null, function(err, data) {
      Promise.each(data.contentful.page, function(page) {
        return createFile(page).then(function(fobj) {
          fobj.data = { page: page }
          _this.emit('data', fobj)
        })
      }).then(function() { cb() })
    })
  }

  return through.obj(noop, flush)
}

module.exports = addPages
