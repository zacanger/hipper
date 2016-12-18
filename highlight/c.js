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
  'auto'
, 'bool'
, 'break'
, 'case'
, 'char'
, 'class'
, 'const'
, 'continue'
, 'default'
, 'define'
, 'do'
, 'double'
, 'else'
, 'endif'
, 'enum'
, 'error'
, 'extern'
, 'float'
, 'for'
, 'goto'
, 'if'
, 'ifdef'
, 'ifndef'
, 'include'
, 'int'
, 'long'
, 'register'
, 'return'
, 'short'
, 'signed'
, 'sizeof'
, 'static'
, 'struct'
, 'switch'
, 'typedef'
, 'undef'
, 'union'
, 'unsigned'
, 'void'
, 'volatile'
, 'while'
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

exports.test = file => /\.(c|cpp|h)$/.test(file)
