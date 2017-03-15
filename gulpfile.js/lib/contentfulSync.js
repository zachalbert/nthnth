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

var isEntry = function(item) {
  return _.has(item, 'sys')
}

var handleEntry = function(space, entry) {
  return Promise.reduce(Object.entries(entry.fields),
    function(acc, [name, field]) {
      var val = field[locale];
      if (isEntry(val)) {
        return space[`get${val.sys.linkType}`](val.sys.id).then(
          _.curry(handleEntry)(space)).then(function(entry) {
            return Object.assign(acc, { [name]: entry })
          })
      }

      return Object.assign(acc, { [name]: val })
    }, {}).catch(function() {
      console.log(arguments)
    })
}


// Produce a data set that has all the items to be rendered:
// {
//   "entry_name": [ fields, fields]
// }
var buildData = function(space, result) {

  var typeNames = getTypeNames(result)
  return Promise.map(result.entries.items, function(item) {
    var name = typeNames[item.sys.contentType.sys.id]

    return handleEntry(space, item).then(function(entry) {
      return [name, entry]
    })
  })
}

var getData = memoize(function(cb) {
  var client = contentful.createClient({
    "accessToken": config.get("contentful.manageToken"),
    "resolveLinks": true
  })

  client.getSpace(config.get("contentful.space")).then(function(space) {

    Promise.props({
      "entries": space.getEntries(),
      "types": space.getContentTypes()
    }).then(function(result) {
      buildData(space, result).then(function(data) {
        var actual = data.reduce(function(acc, [name, val]) {
          acc[name] = _.get(acc, name, []).concat([val])
          return acc
        }, {})
        cb(undefined, { contentful: actual })
      })
    })
  })

}, {
  async: true,
  maxAge: 500
})

module.exports = function(file, cb) {
  getData(cb)
}
