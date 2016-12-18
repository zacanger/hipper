const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")/g
, comment = /--[^\n]/g
, words   = [
  'alias'
, 'as'
, 'case'
, 'else'
, 'exposing'
, 'foreign'
, 'if'
, 'import'
, 'in'
, 'infix'
, 'infixl'
, 'infixr'
, 'input'
, 'let'
, 'loopback'
, 'module'
, 'of'
, 'output'
, 'then'
, 'type'
, 'where'
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

exports.test = file => /\.elm$/.test(file)
