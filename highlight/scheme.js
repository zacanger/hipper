const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[()]/g
, hash    = /#/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")/g
, comment = /;[^\n]/g
, qmark   = /\?/g
, words   = [
  'abs'
, 'acos'
, 'and'
, 'angle'
, 'append'
, 'apply'
, 'asin'
, 'assoc'
, 'assv'
, 'atan'
, 'boolean'
, 'caar'
, 'cadr'
, 'call'
, 'car'
, 'case'
, 'cdar'
, 'cdddar'
, 'cdddd'
, 'cddr'
, 'cdr'
, 'ceiling'
, 'char'
, 'class'
, 'cond'
, 'cons'
, 'cos'
, 'define'
, 'each'
, 'else'
, 'eq'
, 'equal'
, 'eqv'
, 'eval'
, 'even'
, 'exact'
, 'exit-handler'
, 'exp'
, 'expt'
, 'f'
, 'field'
, 'file'
, 'floor'
, 'for'
, 'force'
, 'gcd'
, 'hash'
, 'import'
, 'inherit'
, 'init-field'
, 'input'
, 'interface'
, 'lambda'
, 'lcm'
, 'length'
, 'let'
, 'letrec'
, 'list'
, 'load'
, 'log'
, 'map'
, 'max'
, 'min'
, 'mixin'
, 'modulo'
, 'names'
, 'negative'
, 'not'
, 'null'
, 'number'
, 'odd'
, 'open'
, 'or'
, 'output'
, 'override'
, 'pair'
, 'port'
, 'protect'
, 'provide'
, 'public'
, 'quasiquote'
, 'quote'
, 'read'
, 'real'
, 'ref'
, 'rename'
, 'require'
, 'reverse'
, 'rules'
, 'set'
, 'string'
, 'syntax'
, 't'
, 'tail'
, 'unit'
, 'unless'
, 'values'
, 'vector'
, 'when'
, 'write'
]
, keyword = cs(words)

exports.highlight = q => {
  q.wrap(rbrace  , styles.brightYellow)
  q.wrap(qmark   , styles.brightCyan)
  q.wrap(hash    , styles.brightCyan)
  q.wrap(number  , styles.brightMagenta)
  q.wrap(keyword , styles.brightBlue)
  q.wrap(comment , styles.grey)
  q.wrap(string  , styles.red)
}

exports.test = file => /\.(scm|rkt)$/.test(file)
