const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")|(`[^`]*`)/g
, comment = /#[^\n]/g
, words   = [
  'case'
, 'cd'
, 'coproc'
, 'declare'
, 'do'
, 'done'
, 'echo'
, 'elif'
, 'else'
, 'esac'
, 'exit'
, 'false'
, 'fi'
, 'for'
, 'function'
, 'if'
, 'in'
, 'printf'
, 'read'
, 'select'
, 'test'
, 'then'
, 'time'
, 'true'
, 'until'
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

exports.test = file => /\.(sh|bash|ksh|zsh)$/.test(file)
