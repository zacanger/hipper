module.exports = function (doc, _, cursor) {

  const {
    statSync
  , readFileSync
  , createWriteStream
  } = require('fs')
  const { join } = require('path')

  let rc = this.config

  // if argument specified, pass in
  let file = rc._[0] ||
    rc.file          ||
    join(__dirname, '..', 'README.md')
  , title = file

  rc.file = file

  const toLines = data =>
    data
      .split('\t')
      .join('  ')
      .split('\n')
      .map((e, i, a) => e + '\n') // add \n to every line

  // try to open passed in file; if no file, write to it on ctrl-s
  try {
    let stat = statSync(file)
    if (stat.isDirectory()) {
      console.error(file, 'is a directory')
      process.exit(1)
    }
    doc.lines = toLines(readFileSync(file, 'utf-8'))
    let last = doc.lines.pop()
    if (last != '\n' || !doc.lines.length) {
      doc.lines.push(last)
    }
  } catch (_) { }

  if (rc.file) {
    title = file
  } else {
    rc.noSave = true, title = 'README'
  }

  rc.title = rc.title || title

  cursor.write('\x1b]0;hipper - ' + (rc.title) + '\007')

  if (!rc.debug) { // set up debugging
    log = console.error = function noop(){}
  }

  // log to a file
  else if ('string' == typeof rc.debug) {
    let inspect = require('util').inspect
    let ds = createWriteStream(rc.debug)

    log = console.error = () => {
      ds.write([].slice.call(arguments).map(inspect).join(' ') + '\n')
    }
  }

  else {
    log = console.error // log to stderr. hipper file 2> debug.log
  }
}
