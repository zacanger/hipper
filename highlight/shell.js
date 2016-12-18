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
  'ab'
, 'awk'
, 'bash'
, 'beep'
, 'builtin'
, 'case'
, 'cat'
, 'cc'
, 'cd'
, 'chmod'
, 'chown'
, 'chroot'
, 'clear'
, 'coproc'
, 'cp'
, 'curl'
, 'cut'
, 'declare'
, 'diff'
, 'do'
, 'done'
, 'echo'
, 'elif'
, 'else'
, 'esac'
, 'exit'
, 'export'
, 'false'
, 'fi'
, 'fil'
, 'fin'
, 'find'
, 'for'
, 'function'
, 'gawk'
, 'gcc'
, 'get'
, 'git'
, 'grep'
, 'if'
, 'in'
, 'kill'
, 'killall'
, 'ln'
, 'ls'
, 'make'
, 'mkdir'
, 'mv'
, 'nc'
, 'openssl'
, 'ping'
, 'pkill'
, 'printf'
, 'ps'
, 'read'
, 'restart'
, 'rm'
, 'rmdir'
, 'sed'
, 'select'
, 'service'
, 'set'
, 'sh'
, 'shopt'
, 'shred'
, 'sleep'
, 'sort'
, 'source'
, 'ssh'
, 'start'
, 'stop'
, 'su'
, 'sudo'
, 'tee'
, 'telnet'
, 'test'
, 'then'
, 'time'
, 'top'
, 'touch'
, 'tree'
, 'true'
, 'unset'
, 'until'
, 'wall'
, 'wc'
, 'wget'
, 'while'
, 'who'
, 'whois'
, 'write'
, 'yes'
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
