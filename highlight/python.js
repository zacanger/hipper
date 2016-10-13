const
  styles    = require('../lib/styles')
, keyword   = /\b(and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield)\b/g
, rbrace    = /[\(\)]/g
, sbrace    = /[\[\]]/g
, cbrace    = /[\{\}]/g
, number    = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string    = /('[^']*')|("[^"]*")/g
, comment   = /#[^\n]/g

exports.highlight = q => {
  q.wrap(rbrace  , styles.brightCyan)
  q.wrap(sbrace  , styles.brightYellow)
  q.wrap(cbrace  , styles.brightGreen)
  q.wrap(number  , styles.brightMagenta)
  q.wrap(keyword , styles.brightBlue)
  q.wrap(comment , styles.grey)
  q.wrap(string  , styles.red)
}

exports.test = file => /\.py$/.test(file)
