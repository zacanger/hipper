'use strict'

function indent (line) {
  return /^\s*$/.test(line) ? line : '  ' + line
}

function deindent (line) {
  if (line == '\n') {
    return line
  }
  let l = /^\s*/.exec(line)[0].length
  return line.substring(l > 1 ? 2 : l)
}

module.exports = (doc, keys) => {
  let rc = this.config

  keys.on('keypress', (ch, key) => {

    if (key.name !== 'tab') {
      return
    }

    if (doc.marks) { // indent selected lines
      let
        m = doc.marks[0]
      , M = doc.marks[1]

      for (let i = m.y; i <= M.y; i++) {
        doc.updateLine(i, (key.shift ? deindent : indent) (doc.lines[i]))
      }
    } else { // pad current line to even number of spaces
      let
        m
      , i = (m = /^[ \t]*/.exec(doc.line()))[0].length

      console.error('INDENT SINGLE LINE', i, m)

      // only indentation if we are at the start of the line
      // else allow entry to insert spaces
      if (i < doc.column) {
        return
      }

      doc.pos(i, doc.row) // move to end of indentation

      if (!key.shift) {
        doc.write(i % 2 ? ' ' : '  ')
      } else if (i) {
        doc.delete(i % 2 ? -1 : -2)
      }

// add spaces.
//    else {
//      doc.updateLine(doc.row, (i % 2 ? ' ' : '  ') + doc.line())
//    }
//    doc.move()//something is putting the cursor in the wrong place.
    }

    return true
  })

}

