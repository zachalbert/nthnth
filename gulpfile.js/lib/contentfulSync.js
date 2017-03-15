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

// Produce a data set that has all the items to be rendered:
// {
//   "entry_name": [ fields, fields]
// }
var buildData = function(space, entries) {

  var opts = {
    promise: true,
    maxAge: 500
  }
  var fns = {
    "Asset": memoize(space.getAsset, opts),
    "Entry": memoize(space.getEntry, opts)
  }

  var handleEntry = function(entry) {
    return Promise.reduce(Object.entries(entry.fields),
      function(acc, [name, field]) {
        var val = field[locale];

        var getLink = function(val) {
          return fns[val.sys.linkType](val.sys.id).then(handleEntry)
        }

        if (isEntry(val)) {
          return getLink(val).then(function(entry) {
            return Object.assign(acc, { [name]: entry })
          })
        }

        if (_.isArray(val) && val.length > 0 && isEntry(val[0])) {
          return Promise.map(val, getLink).then(function(entries) {
            return Object.assign(acc, { [name]: entries })
          })
        }

        return Object.assign(acc, { [name]: val })
      }, {}).catch(function() {
        console.log(arguments)
      })
  }

  return Promise.map(entries.items, function(item) {
    return handleEntry(item).then(function(entry) {
      return [item.sys.contentType.sys.id, entry]
    })
  })
}

var getData = memoize(function(cb) {
  var client = contentful.createClient({
    "accessToken": config.get("contentful.manageToken"),
    "resolveLinks": true
  })

  client.getSpace(config.get("contentful.space")).then(function(space) {

    space.getEntries().then(function(entries) {
      buildData(space, entries).then(function(data) {
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
