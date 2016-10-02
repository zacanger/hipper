'use strict'

const
  styles    = require('../lib/styles')
, keyword   = /\b(call|class|define|field|import|require|inherit|exit-handler|init-field|interface|let|values|mixin|lambda|override|protect|provide|public|rename|syntax|case|cond|unit|unless|when|else|for|each|letrec|map|or|names|abs|rules|car|caar|cdr|cddr|cadr|acos|apply|append|angle|asin|assoc|assq|assv|atan|boolean|cdddar|cdddd|ceiling|char|cons|cos|eq|equal|eqv|eval|even|exact|exp|expt|f|t|floor|force|gcd|input|port|output|lcm|length|list|string|vector|ref|tail|load|log|max|min|modulo|negative|not|null|number|odd|open|file|pair|quote|read|real|reverse|set|hash|write)\b/g
, rbrace    = /[\(\)]/g
, number    = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string    = /('[^']*')|("[^"]*")/g
, comment   = /;/g

exports.highlight = q => {
  q.wrap(rbrace    , styles.brightCyan)
  q.wrap(number    , styles.brightMagenta)
  q.wrap(keyword   , styles.brightBlue)
  q.wrap(comment   , styles.grey)
  q.wrap(string    , styles.red)
}

exports.test = file =>
  /\.(scm|rkt)$/.test(file)
