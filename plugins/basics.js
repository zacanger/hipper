module.exports = function (doc, _, cursor) {

  const
    fs   = require('fs')
  , join = require('path').join

  var rc = this.config

  // if argument specified, pass in
  var file = rc._[0] || rc.file ||
    join(__dirname, '..', 'README.md'), title = file

  rc.file = file

  function toLines(data) {

    return data.split('\t').join('  ').split('\n')
      .map(function (e, i, a) {
      return e + '\n' // add \n to every line
    })
  }

  // try to open passed in file; if no file, write to it on ctrl-s

  try {
    var stat = fs.statSync(file)
    if (stat.isDirectory()) {
      console.error(file, 'is a directory')
      process.exit(1)
    }
    doc.lines = toLines(fs.readFileSync(file, 'utf-8'))
    var last = doc.lines.pop()
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

  cursor.write('\x1b]0;hip - ' + (rc.title) + '\007')

  if (!rc.debug) { // set up debugging
    log = console.error = function noop(){}
  }

  //log to a file
  else if ('string' == typeof rc.debug) {
    var
      inspect = require('util').inspect
    , ds      = fs.createWriteStream(rc.debug)

    log = console.error = function () {
      ds.write([].slice.call(arguments).map(inspect).join(' ') + '\n')
    }
  }

  else log = console.error // log to stderr. hipper file 2> debug.log

}
