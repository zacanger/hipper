'use strict'

// do something else here to inject script for the language of the file.
// for example...

// js   is //
// bash is #
// ini  is ;

function comment (line) {
  return '//' + line
}

function uncomment (line) {
  return isCommented(line) ? line.replace('//', '') : line
}

function isCommented (line) {
  let r =  /^\s*\/\//.test(line) || /^\s*$/.test(line)
  return r
}

module.exports = (doc, keys) => {

  let rc = this.config

  keys.on('keypress', (ch, key) => {

    if ('k' == key.name && key.ctrl) {
      if (!doc.marks) {
        doc.start().mark().down().mark().up().move()
      }
      let
        m    = doc.marks[0]
      , M    = doc.marks[1]
      , from = m.y
      , to   = M.y // M.x || M.y == m.y ? M.y : M.y - 1
      // only indent do not comment the last line if the cursor is at 0
      // first decide if we will comment or uncomment.
      // uncomment, if the lines all have comments at the start.
      // else, comment.

      let commented = true
      for (let i = from; i <= to; i++) {
        if (!isCommented(doc.lines[i])) {
          commented = false
        }
      }

      for (let i = from; i <= to; i++) {
        doc.updateLine(i, (commented ? uncomment : comment) (doc.lines[i]))
      }
    }
  })

}
