const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")/g
, comment = /\/\/[^\n]*/g
, words   = [
  'String'
, 'abstract'
, 'as'
, 'assert'
, 'async'
, 'await'
, 'bool'
, 'break'
, 'case'
, 'catch'
, 'class'
, 'const'
, 'continue'
, 'default'
, 'deferred'
, 'do'
, 'double'
, 'dynamic'
, 'else'
, 'enum'
, 'export'
, 'extends'
, 'external'
, 'factory'
, 'false'
, 'final'
, 'finally'
, 'for'
, 'get'
, 'hide'
, 'if'
, 'implements'
, 'import'
, 'in'
, 'int'
, 'is'
, 'library'
, 'native'
, 'new'
, 'null'
, 'num'
, 'of'
, 'operator'
, 'part'
, 'rethrow'
, 'return'
, 'set'
, 'show'
, 'static'
, 'super'
, 'switch'
, 'this'
, 'throw'
, 'true'
, 'try'
, 'typedef'
, 'var'
, 'void'
, 'while'
, 'with'
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

exports.test = file => /\.dart$/.test(file)
