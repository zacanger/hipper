const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")|(`[^`]*`)/g
, comment = /\/\/[^\n]*/g
, kList   = [
  'as'
, 'async'
, 'await'
, 'break'
, 'case'
, 'catch'
, 'class'
, 'console'
, 'const'
, 'continue'
, 'debugger'
, 'default'
, 'delete'
, 'do'
, 'else'
, 'enum'
, 'export'
, 'extends'
, 'finally'
, 'for'
, 'from'
, 'function'
, 'if'
, 'implements'
, 'import'
, 'in'
, 'instanceof'
, 'interface'
, 'let'
, 'module'
, 'new'
, 'package'
, 'private'
, 'protected'
, 'public'
, 'require'
, 'return'
, 'static'
, 'super'
, 'switch'
, 'this'
, 'throw'
, 'try'
, 'typeof'
, 'var'
, 'void'
, 'while'
, 'with'
, 'yield'
]
, pList   = [
  'Array'
, 'ArrayBuffer'
, 'Boolean'
, 'DataView'
, 'Date'
, 'Error'
, 'EvalError'
, 'Float32Array'
, 'Float64Array'
, 'Function'
, 'Infinity'
, 'Int16Array'
, 'Int32Array'
, 'Int8Array'
, 'Intl'
, 'JSON'
, 'Map'
, 'Math'
, 'NaN'
, 'Number'
, 'Object'
, 'Promise'
, 'Proxy'
, 'RangeError'
, 'ReferenceError'
, 'Reflect'
, 'RegExp'
, 'Set'
, 'String'
, 'Symbol'
, 'SyntaxError'
, 'TypeError'
, 'URIError'
, 'Uint16Array'
, 'Uint32Array'
, 'Uint8Array'
, 'Uint8ClampedArray'
, 'WeakMap'
, 'WeakSet'
, 'arguments'
, 'clearInterval'
, 'clearTimeout'
, 'constructor'
, 'decodeURI'
, 'document'
, 'element'
, 'encodeURI'
, 'encodeURIComponent'
, 'escape'
, 'eval'
, 'false'
, 'global'
, 'isFinite'
, 'isNaN'
, 'isPrototypeOf'
, 'null'
, 'parseFloat'
, 'parseInt'
, 'prototype'
, 'setInterval'
, 'setTimeout'
, 'toString'
, 'true'
, 'undefined'
, 'unescape'
, 'valueOf'
, 'window'
]
, keyword = cs(kList)
, prim    = cs(pList)

exports.highlight = q => {
  q.wrap(rbrace  , styles.brightCyan)
  q.wrap(sbrace  , styles.brightYellow)
  q.wrap(cbrace  , styles.brightGreen)
  q.wrap(number  , styles.brightMagenta)
  q.wrap(prim    , styles.magenta)
  q.wrap(keyword , styles.brightBlue)
  q.wrap(comment , styles.grey)
  q.wrap(string  , styles.red)
}

exports.test = file => /\.(json|js|jsx)$/.test(file)
