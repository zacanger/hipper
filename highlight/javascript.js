/* eslint-disable comma-spacing */

const
  styles    = require('../lib/styles')
, keyword   = /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|from|as|extends|finally|for|function|if|implements|module|console|import|in|instanceof|interface|let|new|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|var|void|while|require|with|yield)\b/g
, rbrace    = /[\(\)]/g
, sbrace    = /[\[\]]/g
, cbrace    = /[\{\}]/g
, number    = /-?\d+(?:\.\d+)?(?:e-?\d+)?/g
, string    = /('[^']*')|("[^"]*")|(`[^`]*`)/g
, comment   = /\/\/[^\n]*/g
, primitive = /\b(true|false|null|NaN|toString|global|valueOf|window|element|prototype|constructor|document|escape|unescape|parseInt|parseFloat|setTimeout|clearTimeout|setInterval|clearInterval|isNaN|Infinity|Array|Object|Number|String|Symbol|Boolean|Function|ArrayBuffer|Intl|DataView|Float32Array|Float64Array|Int8Array|Int16Array|Int32Array|Uint8Array|Uint8ClampedArray|Uint16Array|Uint32Array|arguments|Date|Error|Proxy|Reflect|Promise|Map|RegExp|Symbol|undefined|WeakMap|WeakSet|EvalError|JSON|Math|RangeError|ReferenceError|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|Set)\b/g

exports.highlight = q => {
  q.wrap(rbrace    , styles.brightCyan)
  q.wrap(sbrace    , styles.brightYellow)
  q.wrap(cbrace    , styles.brightGreen)
  q.wrap(number    , styles.brightMagenta)
  q.wrap(primitive , styles.magenta)
  q.wrap(keyword   , styles.brightBlue)
  q.wrap(comment   , styles.grey)
  q.wrap(string    , styles.red)
}

exports.test = file => /\.(json|js|jsx)$/.test(file)
