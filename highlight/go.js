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
  'append'
, 'bool'
, 'break'
, 'byte'
, 'cap'
, 'case'
, 'chan'
, 'close'
, 'complex'
, 'complex128'
, 'complex64'
, 'const'
, 'continue'
, 'copy'
, 'default'
, 'defer'
, 'else'
, 'error'
, 'fallthrough'
, 'false'
, 'float32'
, 'float64'
, 'for'
, 'func'
, 'go'
, 'goto'
, 'if'
, 'imag'
, 'import'
, 'int'
, 'int16'
, 'int32'
, 'int64'
, 'int8'
, 'interface'
, 'iota'
, 'len'
, 'make'
, 'map'
, 'new'
, 'nil'
, 'package'
, 'panic'
, 'print'
, 'println'
, 'range'
, 'real'
, 'recover'
, 'return'
, 'select'
, 'string'
, 'struct'
, 'switch'
, 'true'
, 'type'
, 'uint'
, 'uint16'
, 'uint32'
, 'uint64'
, 'uint8'
, 'uintptr'
, 'var'
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

exports.test = file => /\.go$/.test(file)
