const
  styles  = require('../lib/styles')
, { cs }  = require('./make-keyword-regex')
, rbrace  = /[\(\)]/g
, sbrace  = /[\[\]]/g
, cbrace  = /[\{\}]/g
, number  = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string  = /('[^']*')|("[^"]*")|(`[^`]*`)/g
, comment = /\/\/[^\n]*/g
, words   = [
  'Any'
, 'AnyObject'
, 'Array'
, 'Bool'
, 'Character'
, 'Dictionary'
, 'Double'
, 'Float'
, 'Int'
, 'Int16'
, 'Int32'
, 'Int64'
, 'Int8'
, 'Never'
, 'Optional'
, 'Protocol'
, 'Self'
, 'Set'
, 'String'
, 'Type'
, 'UInt16'
, 'UInt32'
, 'UInt64'
, 'UInt8'
, 'Void'
, '_'
, '__COLUMN__'
, '__FILE__'
, '__FUNCTION__'
, '__LINE__'
, 'as'
, 'assignment'
, 'associatedtype'
, 'associativity'
, 'break'
, 'case'
, 'catch'
, 'class'
, 'continue'
, 'convenience'
, 'default'
, 'defer'
, 'deinit'
, 'didSet'
, 'do'
, 'dynamic'
, 'dynamicType'
, 'else'
, 'enum'
, 'extension'
, 'fallthrough'
, 'false'
, 'fileprivate'
, 'final'
, 'for'
, 'func'
, 'get'
, 'guard'
, 'if'
, 'import'
, 'in'
, 'indirect'
, 'infix'
, 'init'
, 'inout'
, 'internal'
, 'is'
, 'lazy'
, 'left'
, 'let'
, 'mutating'
, 'new'
, 'nil'
, 'none'
, 'nonmutating'
, 'open'
, 'operator'
, 'override'
, 'postfix'
, 'precedence'
, 'precedencegroup'
, 'prefix'
, 'private'
, 'protocol'
, 'public'
, 'repeat'
, 'required'
, 'rethrows'
, 'return'
, 'right'
, 'self'
, 'set'
, 'static'
, 'struct'
, 'subscript'
, 'super'
, 'switch'
, 'throw'
, 'throws'
, 'true'
, 'try'
, 'typealias'
, 'unowned'
, 'unowned(safe)'
, 'unowned(unsafe)'
, 'var'
, 'weak'
, 'where'
, 'while'
, 'willSet'
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

exports.test = file => /\.swift$/.test(file)