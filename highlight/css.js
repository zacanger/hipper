/* eslint-disable comma-spacing */

const
  styles        = require('../lib/styles')
, comments      = /\/\*[\s\S]*?\*\//
, whitespace    = /\s+/
, bmh           = /"\\"\}\\""/
, unspace1      = /(?:^|\})[^\{:]+\s+:+[^\{]*\{/
, unspace2      = /\s+([!\{\};:>+\(\)\],])/
, unspace3      = /([!\{\}:;>+\(\[,])\s+/
, semicolons    = /;/
// , units         = /(?i)([\s:])([+-]?0)(?:%|em|ex|px|in|cm|mm|pt|pc)/
, rgb           = /rgb\s*\(\s*([0-9,\s]+)\s*\)/
, digits        = /\d+/
// , compresshex   = /(?i)([^"'=\s])(\s?)\s*#([0-9a-f]){6}/
, hexval        = /[0-9a-f]{2}/
, emptyrules    = /[^\}]+\{;\}\n/
, mediaspace    = /\band ?\(/

exports.highlight = q => {
  // 'white,grey,black,blue,cyan,green,magenta,red,yellow'
  // and bright version of each
  q.wrap(emptyrules    , styles.red)
  // q.wrap(compresshex   , styles.magenta)
  q.wrap(digits        , styles.brightBlue)
  q.wrap(comments      , styles.grey)
  // q.wrap(units         , styles.brightCyan)
  q.wrap(semicolons    , styles.green)
  q.wrap(unspace1      , styles.brightGreen)
  q.wrap(unspace2      , styles.brightGreen)
  q.wrap(unspace3      , styles.brightGreen)
  q.wrap(bmh           , styles.yellow)
  q.wrap(whitespace    , styles.brightYellow)
  q.wrap(hexval        , styles.magenta)
  q.wrap(rgb           , styles.magenta)
  q.wrap(mediaspace    , styles.brightYellow)
}

exports.test = file => /\.(css|less|sass|scss|styl)$/.test(file)
