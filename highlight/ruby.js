const
  styles  = require('../lib/styles')
, makeRe  = require('./make-keyword-regex').caseSensitive
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")/g
, comment = /#[^\n]/g
, words   = [
  'BEGIN'
, 'END'
, 'ENCODING'
, 'FILE'
, 'LINE'
, 'alias'
, 'and'
, 'begin'
, 'break'
, 'case'
, 'class'
, 'def'
, 'defined'
, 'do'
, 'else'
, 'elsif'
, 'end'
, 'ensure'
, 'false'
, 'for'
, 'if'
, 'in'
, 'module'
, 'next'
, 'nil'
, 'not'
, 'or'
, 'redo'
, 'rescue'
, 'retry'
, 'return'
, 'self'
, 'super'
, 'then'
, 'true'
, 'undef'
, 'unless'
, 'until'
, 'when'
, 'while'
, 'yield'
]
, keyword = makeRe(words)

exports.highlight = q => {
  q.wrap(rbrace  , styles.brightCyan)
  q.wrap(sbrace  , styles.brightYellow)
  q.wrap(cbrace  , styles.brightGreen)
  q.wrap(number  , styles.brightMagenta)
  q.wrap(keyword , styles.brightBlue)
  q.wrap(comment , styles.grey)
  q.wrap(string  , styles.red)
}

exports.test = file => /\.rb$/.test(file)
