'use strict'

module.exports = function (doc, keys, render) {
  let
    rc           = this.config
  , term         = ''
  , accumalating = false

  keys.on('keypress', (ch, key) => {
    if (accumalating) {
      if ('escape' == key.name) {
        accumalating = false
        // to do: put back prev footer info once renderer support getFooter()
        render.updateFooter(' ')
        return
      } else if ({enter : true, return : true}[key.name]) {
        accumalating = false
        search(term)
      } else {
        if (key.name == 'backspace') {
          term = term.substring(0, term.length-1)
        } else {
          term += key.sequence || key.name
        }
        console.error('term is: ' + term)
        render.updateFooter('find: ' + term)
      }
      return true
    } else {
      console.error('not acc')
    }

    if (key.ctrl) {
      if (key.name == 'f') {
        // to do: inc prev footer info once renderer support getFooter()
        render.updateFooter('find: ' + term)
        accumalating = true
        return
      }
    }
  })

  function search(term) {
    let
      lineNumber = doc.row
    , idx        = doc.column

    console.error('from line: ' + lineNumber + ' search for: ' + term)

    // only search first line from current column & clear any mark before starting
    for (doc.unmark(); lineNumber < doc.lines.length; lineNumber++, idx=0) {
      let match = doc.lines[lineNumber].indexOf(term, idx)
      if (match != -1) {
        console.error(`match line: ${lineNumber} idx: ${match}`)
        doc.pos(match, lineNumber).move().mark().pos(match + term.length, lineNumber).mark()
        return
      }
    }
    render.updateFooter('no matches')
  }

}
