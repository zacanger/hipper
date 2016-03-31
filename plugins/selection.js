'use strict'

module.exports = function (doc, keys, cursor) {

  const styles = require('../lib/styles')

  let shift = false // currently selecting or not

  // intercept after keypress both before and after so we that we can
  // select text properly if keypress moved cursor. so, we
  // remove all listeners, add first listener, readd listeners,
  // then add last listener.

  const listeners = keys.listeners('keypress')
  keys.removeAllListeners('keypress')

  function startSelection (ch, key) { // only start if movement key
    if (/up|down|left|right|pageup|pagedown|home|end/.test(key.name)) {
      key.movement = true

      if (key.shift && key.movement) {
        if (!shift) { // if both shifted and directional key
          doc.unmark()
        }
        shift = true
        doc.mark().move()
      } else if (shift) {
        shift = false
      }
    }
  }

  function endSelection (ch, key) {
    if (key.movement) {
      if (key.shift) {
        doc.mark().move()
      }
      else if (/up|down|left|right|pageup|pagedown|home|end/.test(key.name)) {
        doc.unmark().move()
      }
    }
  }

  keys.on('keypress', startSelection)

  listeners.forEach(listener => {
    keys.on('keypress', listener)
  })

  keys.on('keypress', endSelection)

  this.renderers.push((q, x, y) => {

    if (doc.marks) {
      console.error(doc.marks, y)
      var
        m    = doc.marks[0]
      , M    = doc.marks[1]
      , diff = 0

      // if the match starts and ends on the same line
      if (m.y == M.y && m.y + 1 == y) {
        q.insertAfter (m.x, styles.inverse[0])
        q.insertBefore(M.x, styles.inverse[1])
      }

      // if we are between first and last matched lines.
      else if (m.y + 1 < y && y < M.y + 1) {
        q.insertAfter (0, styles.inverse[0])
        q.insertBefore(q.toString().length, styles.inverse[1])
      }

      // if this is the first matched line
      else if (m.y + 1 == y) {
        q.insertAfter (m.x, styles.inverse[0])
        q.insertBefore(q.toString().length, styles.inverse[1])
      }

      // if this is the last matched line (but highlight if x=0)
      else if (M.y + 1 == y && M.x) {
        // if the first mark is on the same line, adjust for that.
        q.insertAfter (0, styles.inverse[0])
        q.insertBefore(M.x, styles.inverse[1])
      }
    }

  })

}
