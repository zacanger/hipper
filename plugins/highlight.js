const types = [
  require('../highlight/javascript')
, require('../highlight/scheme')
, require('../highlight/python')
, require('../highlight/ruby')
, require('../highlight/html')
, require('../highlight/css')
, require('../highlight/clojure')
, require('../highlight/shell')
, require('../highlight/c-like')
, require('../highlight/haskell')
, require('../highlight/go')
, require('../highlight/lua')
, require('../highlight/elm')
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
