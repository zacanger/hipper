'use strict'

// actual entry of characters into text

const os = require('os')

module.exports = function (doc, keys, cursor) {
  let weird = this.config.weird

  keys.on('keypress', (ch, key) => {

    if (key.shift && key.name.length === 1) {
      key.name = key.name.toUpperCase()
    }

    if (key.name == 'delete') {
      if (doc.marks) {
        doc.clearMarked()
      }
      else if (key.ctrl) {
        doc.mark().next().mark().clearMarked()
      } else {
        doc.delete(1)
      }
      doc.pref()
    } else if(key.name == 'backspace') {
      if (weird) {
        key.ctrl = key.sequence !== '\b'
      } else {
        key.ctrl = key.sequence === '\b'
      }
      console.error(ch, key)

      if (doc.marks) {
        doc.clearMarked()
      }
      // quirk here, to fix
      else if (key.ctrl) {
        doc.mark().prev().mark().clearMarked()
      } else {
        doc.delete(-1)
      }
      doc.pref()
    }
    else if (key.name == 'tab') {
      doc.write('  ') .pref()
    }
    else if (key.name == 'return') {
      doc.clearMarked().newline().pref()
    }
    else if (' ' <= ch && ch <= '~') {
      doc.clearMarked().write(ch).pref()
    }
  })

}
