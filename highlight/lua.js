const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")|(`[^`]*`)/g
, comment = /\/\/[^\n]*/g
, words   = [
  '_G'
, '_VERSION'
, 'and'
, 'assert'
, 'break'
, 'close'
, 'collectgarbage'
, 'coroutine.create'
, 'coroutine.resume'
, 'coroutine.running'
, 'coroutine.status'
, 'coroutine.wrap'
, 'coroutine.yield'
, 'debug.debug'
, 'debug.getfenv'
, 'debug.gethook'
, 'debug.getinfo'
, 'debug.getlocal'
, 'debug.getmetatable'
, 'debug.getregistry'
, 'debug.getupvalue'
, 'debug.setfenv'
, 'debug.sethook'
, 'debug.setlocal'
, 'debug.setmetatable'
, 'debug.setupvalue'
, 'debug.traceback'
, 'do'
, 'dofile'
, 'else'
, 'elseif'
, 'end'
, 'error'
, 'false'
, 'flush'
, 'for'
, 'function'
, 'getfenv'
, 'getmetatable'
, 'if'
, 'in'
, 'io.close'
, 'io.flush'
, 'io.input'
, 'io.lines'
, 'io.open'
, 'io.output'
, 'io.popen'
, 'io.read'
, 'io.stderr'
, 'io.stdin'
, 'io.stdout'
, 'io.tmpfile'
, 'io.type'
, 'io.write'
, 'ipairs'
, 'lines'
, 'load'
, 'loadfile'
, 'loadstring'
, 'local'
, 'math.abs'
, 'math.acos'
, 'math.asin'
, 'math.atan'
, 'math.atan2'
, 'math.ceil'
, 'math.cos'
, 'math.cosh'
, 'math.deg'
, 'math.exp'
, 'math.floor'
, 'math.fmod'
, 'math.frexp'
, 'math.huge'
, 'math.ldexp'
, 'math.log'
, 'math.log10'
, 'math.max'
, 'math.min'
, 'math.modf'
, 'math.pi'
, 'math.pow'
, 'math.rad'
, 'math.random'
, 'math.randomseed'
, 'math.sin'
, 'math.sinh'
, 'math.sqrt'
, 'math.tan'
, 'math.tanh'
, 'module'
, 'next'
, 'nil'
, 'not'
, 'or'
, 'os.clock'
, 'os.date'
, 'os.difftime'
, 'os.execute'
, 'os.exit'
, 'os.getenv'
, 'os.remove'
, 'os.rename'
, 'os.setlocale'
, 'os.time'
, 'os.tmpname'
, 'package.cpath'
, 'package.loaded'
, 'package.loaders'
, 'package.loadlib'
, 'package.path'
, 'package.preload'
, 'package.seeall'
, 'pairs'
, 'pcall'
, 'print'
, 'rawequal'
, 'rawget'
, 'rawset'
, 'read'
, 'repeat'
, 'require'
, 'return'
, 'seek'
, 'select'
, 'setfenv'
, 'setmetatable'
, 'setvbuf'
, 'string.byte'
, 'string.char'
, 'string.dump'
, 'string.find'
, 'string.format'
, 'string.gmatch'
, 'string.gsub'
, 'string.len'
, 'string.lower'
, 'string.match'
, 'string.rep'
, 'string.reverse'
, 'string.sub'
, 'string.upper'
, 'table.concat'
, 'table.insert'
, 'table.maxn'
, 'table.remove'
, 'table.sort'
, 'then'
, 'tonumber'
, 'tostring'
, 'true'
, 'type'
, 'unpack'
, 'until'
, 'while'
, 'write'
, 'xpcall'
]
, keyword = cs(words)

exports.highlight = q => {
  q.wrap(rbrace  , styles.brightCyan)
  q.wrap(sbrace  , styles.brightYellow)
  q.wrap(cbrace  , styles.brightGreen)
  q.wrap(number  , styles.brightMagenta)
  q.wrap(keyword , styles.brightBlue)
  q.wrap(comment , styles.grey)
  q.wrap(string  , styles.red)
}

exports.test = file => /\.lua/.test(file)