var Promise           = require("bluebird")
var contentful        = require('contentful')
var config            = require("../../config")
var memoize           = require('memoizee');

// Get some userfriendly names out of the types (can sometimes be ids)
var getTypeNames = function(result) {
  return result.types.items.reduce(function(acc, val) {
    acc[val.sys.id] = val.name
    return acc
  }, {})
}

// Produce a data set that has all the items to be rendered:
// {
//   "entry_name": [ fields, fields]
// }
var buildData = function(result) {
  var typeNames = getTypeNames(result)
  return result.entries.items.reduce(function(acc, val) {
    var name = typeNames[val.sys.contentType.sys.id]

    if (!(name in acc)) { acc[name] = [] }

    acc[name].push(val.fields)
    return acc
  }, {})
}

var getData = memoize(function(cb) {
  var client = contentful.createClient(config.contentful)

  Promise.props({
    "entries": client.getEntries(),
    "types": client.getContentTypes()
  }).then(function(result) { cb(undefined, { contentful: buildData(result) })})
}, { async: true })

module.exports = function(file, cb) {
  getData(cb)
}
