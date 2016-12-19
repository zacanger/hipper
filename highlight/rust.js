const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")/g
, comment = /\/\/[^\n]*/g
, words   = [
  'None'
, 'Ok'
, 'Option'
, 'Self'
, 'Some'
, 'abstract'
, 'alignof'
, 'as'
, 'bool'
, 'box'
, 'break'
, 'char'
, 'const'
, 'continue'
, 'crate'
, 'do'
, 'else'
, 'enum'
, 'err'
, 'extern'
, 'f16'
, 'f32'
, 'f64'
, 'false'
, 'final'
, 'fn'
, 'for'
, 'i16'
, 'i32'
, 'i64'
, 'i8'
, 'if'
, 'impl'
, 'in'
, 'isize'
, 'let'
, 'loop'
, 'macro'
, 'match'
, 'mod'
, 'offsetof'
, 'override'
, 'priv'
, 'proc'
, 'pub'
, 'pure'
, 'ref'
, 'return'
, 'self'
, 'sizeof'
, 'static'
, 'str'
, 'struct'
, 'super'
, 'trait'
, 'true'
, 'type'
, 'typeof'
, 'u16'
, 'u32'
, 'u64'
, 'u8'
, 'unsafe'
, 'unsized'
, 'use'
, 'usize'
, 'virtual'
, 'where'
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

exports.test = file => /\.(rs|rlib|rafto)$/.test(file)
