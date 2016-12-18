const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")/g
, comment = /#[^\n]/g
, words   = [
  'BEGIN'
, 'ENCODING'
, 'END'
, 'FILE'
, 'LINE'
, '__END__'
, '__FILE__'
, '__LINE__'
, '__dir__'
, 'alias'
, 'and'
, 'autoload'
, 'begin'
, 'break'
, 'callcc'
, 'caller'
, 'case'
, 'catch'
, 'class'
, 'def'
, 'defined'
, 'defined?'
, 'do'
, 'else'
, 'elsif'
, 'end'
, 'ensure'
, 'extend'
, 'fail'
, 'false'
, 'for'
, 'if'
, 'in'
, 'lambda'
, 'load'
, 'loop'
, 'module'
, 'next'
, 'nil'
, 'not'
, 'or'
, 'private'
, 'proc'
, 'protected'
, 'public'
, 'raise'
, 'redo'
, 'require'
, 'require_relative'
, 'rescue'
, 'retry'
, 'return'
, 'self'
, 'super'
, 'then'
, 'throw'
, 'true'
, 'undef'
, 'unless'
, 'until'
, 'when'
, 'while'
, 'yield'
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

exports.test = file => /\.rb$/.test(file)
