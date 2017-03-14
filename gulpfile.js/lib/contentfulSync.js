var _                 = require('lodash')
var Promise           = require("bluebird")
var config            = require('config')
var contentful        = require('contentful-management')
var memoize           = require('memoizee')

var locale = config.get("contentful.locale")

// Get some userfriendly names out of the types (can sometimes be ids)
var getTypeNames = function(result) {
  return result.types.items.reduce(function(acc, val) {
    acc[val.sys.id] = val.name
    return acc
  }, {})
}

var isLink = function(item) {
  return _.has(item[locale], 'sys')
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

    var fields = Object.entries(val.fields).reduce(function(acc, [k, v]) {
        return Object.assign(acc, { [k]: v[locale] })
      }, {})

    acc[name].push(fields)
    return acc
  }, {})
}

var getData = memoize(function(cb) {
  var client = contentful.createClient({
    "accessToken": config.get("contentful.manageToken")
  })

  client.getSpace(config.get("contentful.space")).then(function(space) {
    Promise.props({
      "entries": space.getEntries(),
      "types": space.getContentTypes()
    }).then(function(result) {
      cb(undefined, { contentful: buildData(result) })})
  })

}, {
  async: true,
  maxAge: 500
})

module.exports = function(file, cb) {
  getData(cb)
}
