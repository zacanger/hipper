'use strict'

module.exports = function (doc, keys, cursor) {
  let rc = this.config

  keys.on('keypress', (ch, key) => {

      console.error(key)

      if (!key.ctrl && !key.meta) {

        if (key.name == 'up') {
          (doc.isFirstLine() ? doc.start() : doc.up()). toPref().move()
        }
        if (key.name == 'down') {
          (doc.isLastLine() ? doc.end() : doc.down())
          .toPref().move()
        }
        if (key.name == 'left') {
          ((doc.isFirst() && !doc.isFirstLine() ? doc.up().end() : doc.left())).pref().move()
        }
        if (key.name == 'right') {
          ((doc.isLast() && !doc.isLastLine() ? doc.down().start() : doc.right())).pref().move()
        }
        if (key.name == 'end') {
          doc.end().pref().move()
        }
        if (key.name == 'home') {
          doc.start().pref().move()
        }

    } else if (key.ctrl || key.meta) {

      if (key.name == 'left') { // start of previous word
        if (doc.isFirst() && !doc.isFirstLine()) {
          doc.up().end()
        } else {
          doc.prev()
        }
        doc.move().pref()
      }
      if (key.name == 'right') { // end of next word
        if (doc.isLast() && !doc.isLastLine()) {
          doc.down().start()
        } else {
          doc.next()
        }
        doc.move().pref()
      } // should next two use toPref() ??
      if (key.name == 'up') { // start of previous non-whitespace line
        doc.prevSection().start().toPref().move()
      }
      if (key.name == 'down') { // start of previous non-whitespace line
        if (doc.isLastLine()) {
          doc.end()
        } else {
          doc.nextSection().start()
        }
        doc.toPref().move()
      }
      if (key.name == 'home') {
        doc.firstLine().start().move()
      }
      if (key.name == 'end') {
        doc.lastLine().end().move()
      }
    }

    if (key.name == 'pageup') {
      doc.row = Math.max(doc.row - rc.page, 0)
      doc.toPref().move()
    }

    if (key.name == 'pagedown') {
      doc.row = Math.min(doc.row + rc.page, doc.lines.length - 1)
      doc.toPref().move()
    }
  })

  keys.on('mousepress', mouse => {
    if (mouse.scroll) {
      if (mouse.scroll < 0) {
        doc.up().move()
      } else {
        doc.down().move()
      }
    }
  })

  console.error(keys)
}
