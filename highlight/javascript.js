'use strict'

const
  styles    = require('../lib/styles')
, keyword   = /break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|function|if|implements|import|in|instanceof|interface|let|new|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|var|void|while|with|yield/g
, rbrace    = /[\(\)]/g
, sbrace    = /[\[\]]/g
, cbrace    = /[\{\}]/g
, number    = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string    = /('[^']*')|("[^"]*")/g
, comment   = /\/\/[^\n]*/g
, primitive = /true|false|null|NaN/g
// , iq = require('insert-queue')

// todo : multiline support!
// todo : not overriding things in strings and comments, etc,
// when they're keywords.

exports.highlight = q => {
// console.error('HIGHLIGHT JS', q)
  q.wrap(rbrace    , styles.brightCyan)
  q.wrap(sbrace    , styles.brightYellow)
  q.wrap(cbrace    , styles.brightGreen)
  q.wrap(number    , styles.brightMagenta)
  q.wrap(string    , styles.red)
  q.wrap(primitive , styles.magenta)
  q.wrap(comment   , styles.grey)
  q.wrap(keyword   , styles.brightBlue)
}

exports.test = file => {
  return true
  return /\.(json|js)$/.test(file)
}

