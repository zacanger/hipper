'use strict'

const
  styles        = require('../lib/styles')
, keyword       = /function|if|return|var|while|for|throw|catch|finally|new|typeof|else|switch|case/g
, rbrace        = /[\(\)]/g
, sbrace        = /[\[\]]/g
, cbrace        = /[\{\}]/g
, number        = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string        = /('[^']*')|("[^"]*")/g
, primitive     = /true|false|null|NaN/g
, comment       = /\/\/[^\n]*/g

// , iq = require('insert-queue')
// todo: multiline syntax!

exports.highlight = q => {
// console.error('HIGHLIGHT JS', q)
  q.wrap(rbrace    , styles.brightGrey)
  q.wrap(sbrace    , styles.yellow)
  q.wrap(cbrace    , styles.green)
  q.wrap(number    , styles.brightMagenta)
  q.wrap(string    , styles.red)
  q.wrap(primitive , styles.magenta)
  q.wrap(comment   , styles.blue)
  q.wrap(keyword   , styles.cyan)
}

exports.test = file => {
  return true
  return /\.(json|js)$/.test(file)
}

