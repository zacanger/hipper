const types = [
  require('../highlight/c-like')
, require('../highlight/clojure')
, require('../highlight/coffeescript')
, require('../highlight/css')
, require('../highlight/dart')
, require('../highlight/elm')
, require('../highlight/go')
, require('../highlight/haskell')
, require('../highlight/html')
, require('../highlight/javascript')
, require('../highlight/lisps')
, require('../highlight/lua')
, require('../highlight/nginx')
, require('../highlight/php')
, require('../highlight/python')
, require('../highlight/ruby')
, require('../highlight/rust')
, require('../highlight/shell')
, require('../highlight/swift')
]

module.exports = function () {
  let rc   = this.config
  let file = rc.file

  if (rc.highlighting === false) {
    return
  }

  console.error(file, types)

  for (let i = 0; i < types.length; i++) {
    if (types[i].test(file)) {
      return this.renderers.push(types[i].highlight)
    }
  }
}
