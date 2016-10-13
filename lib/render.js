const keypress = require('keypress')

module.exports = (doc, rc) => {
  const
    c  = require('charm')(process.stdout)
  , iq = require('insert-queue')

  // reserved for message bars, etc.

  let
    renderers    = []
  , offset       = 0
  , previousLine = 1

  rc.rightMargin = 5

  let R = {
    redraw
  , header       : rc.header || 0
  , footer       : rc.footer || 0
  , _header      : 'hipper...'
  , _footer      : '...hipper'
  , updateLine
  , renderers
  , write        : c.write.bind(c)
  , reset        : c.erase.bind(c, 'screen')
  , cursor (x, y) { cursor('', x, y) }
  , updateHeader
  , updateFooter
  }

  // updated on redraw()
  let height = (process.stdout.rows    || 24) - (R.header + R.footer)
  rc.rows    = (process.stdout.rows    || 24)
  rc.columns = (process.stdout.columns || 80)

  process.stdout.on('resize', redraw)

  const render = (line, x, y) => {
    if (!line) {
      return
    }

    // don't render '\n'; this can mess-up escape codes.
    line = line.substring(0, line.length - 1)
    // .substring(0, rc.columns)

    let length = rc.columns - +rc.margin
    let start  = doc.row + 1 === y ? Math.max(doc.column + rc.rightMargin - length, 0) : 0

    console.error('TRUNCATE', rc.rightMargin, start, length, [doc.column, rc.columns, rc.margin])

    // truncate line so part containing cursor is visible.
    // if this is not currently editing line, from start
    if ((rc.margin + line.length) > (rc.columns || 80)) {
      line = line.substring(start, start + length)
    }

    let q = iq(line)

    // iterate over the renderers. each gets to modify the line.
    renderers.forEach(render => {
      if (render) {
        render(q, x, y)
      }
    })
    return q.apply()
  }

  function updateLine (line, x, y, noErase) {
    if (y < offset || y > offset + height + 1) {
      console.error('OFF SCREEN UPDATE!!!', line, y)
      return
    }
    if (!line) {
      return
    }
    line = render(line, x, y)
    if (R.header + y - offset < R.header) {
      throw new Error('OUT OF BOUNDS')
    }
    console.error('WRITE TO', R.header + y - offset, offset)

    c.position(1, R.header + y - offset)

    if (!noErase) {
      c.erase('line')
    }

    c.write(line).display('reset')
  }

  function redraw () {
    rc.rows    = (process.stdout.rows    || 24)
    rc.columns = (process.stdout.columns || 80)

    height = rc.rows - (R.header + R.footer)
    c.erase('screen')

    keypress.enableMouse(process.stdout)

    if (R.header) {
      c.position(1, R.header).write(R._header)
    }

    c.position(1, R.header + 1)
    // scroll(_, doc.column + 1, doc.row + 1)
    for (let i = offset; i < offset + height && doc.lines[i]; i++) {
      if (i < doc.lines.length) {
        updateLine(doc.lines[i], 1, i + 1)
      }
    }

    if (R.footer) {
      c.position(1, height + R.header + 1).write(R._footer)
    }
    c.position(doc.column + 1 + rc.margin, doc.row + 1 + R.header)
  }

  // delete line from bottom, insert one on top
  const scrollUpLine = () => { // delete line from bottom
    c
    .position(1, R.header + height).delete('line')
    .position(1, R.header + 1).insert('line') // insert line at top
    console.error('SCRLUP', doc.lines[offset], 1, offset)
    updateLine(doc.lines[offset - 1], 1, offset + 1)
  }

  // delete line from top, insert one on bottom.
  function scrollDownLine () { // insert
    c.position(1, R.header + 1).delete('line')
    .position(1, R.header + height).insert('line') // delete
    updateLine(doc.lines[offset + height], 1, offset + height)
  }

  function newLine (line, x, y) {
    c.position(1, R.header + height).delete('line')
    c.position(1, R.header + y - offset).insert('line')
    updateLine(line, x, y, true)
  }

  function deleteLine (line, x, y) {
    c
    .position(1, R.header + y - offset)
    .delete('line')
    .position(1, R.header + height).insert('line')
    // when document is shortened, add new line at bottom
    updateLine(doc.lines[offset + height], 1, offset + height)
  }

  const smaller = (m, M) => {
    if (!m) {
      return false
    }
    return m.y === M.y ? m.x < M.x : m.y < M.y
  }

  const eq = (m, M) => m.y === M.y && m.x === M.x

  let _min, _max
  function updateMark (min, max) {
    let m, M

    console.error(['OLD', _min, _max, 'NEW', min, max])

    if (_min === null && _max === null) {
      m = min, M = max
    } else if (!eq(min, _min)) {
      m = _min, M = min
    } else if (!eq(max, _max)) {
      m = _max, M = max
    }

    let s
    if (smaller(M, m)) {
      s = M; M = m; m = s
    }

    console.error('UPDATE>>>', m, M, smaller(m, M))

    if (m && M) {
      for (let i = m.y; i <= M.y; i++) {
        updateLine(doc.lines[i], 1, i + 1)
      }
    }
    _min = min; _max = max
  }

  const clearMark = () => {
    c.cursor(true)
    for (let i = _min.y; i <= _max.y; i++) {
      updateLine(doc.lines[i], 1, i + 1)
    }
    _min = _max = null
  }

  doc.on('update_line' , updateLine)
  doc.on('redraw'      , redraw)
  doc.on('new_line'    , newLine)
  doc.on('mark'        , updateMark)
  doc.on('unmark'      , clearMark)
  doc.on('delete_line' , deleteLine)

  let count = 0

  const cursor = (line, x, y) => { // cursor has moved
    console.error('CURSOR_MOVES', ++count)
    scroll(line, x, y)

    // redraw line if line is longer than screen

    // note: remember previous line. check if too long. update.
    // bug where cursor event updated twice per move! fix it!

    let length = rc.columns - rc.margin - rc.rightMargin

    // console.error('update previous?', previousLine, y, _line.length, length, _line.substring(0 , 20))
    //   if(previousLine !== y/* && (_line.length > length)*/) {
    //     console.error('update previous!', _line)
    //     updateLine(_line, 1, previousLine - 1)
    //   }

    if (line.length > length) {
      updateLine(line, Math.min(x, rc.columns - rc.rightMargin), y, false)
    }

    previousLine = y // position cursor on screen
    c.position(Math.min(x, rc.columns - rc.rightMargin + 1) + rc.margin, R.header + y - offset)
  }

  doc.on('cursor', cursor)
  c.cursor(true)

  const scroll = (line, x, y) => { // where is the off-by-one error on scrolling down?
    let target = offset
    if ((y + 1) - (offset + height) > 0) {
      target = (y + 1) - height
    } else if ((y) - offset <= 1) {
      target = (y) - 1
    }

    if (Math.abs(target - offset) >= rc.page) {
      offset = target // redraw whole screen if there was lots of scrolling
      return redraw()
    }

    // there are event listeners that pop off the lines at the other end
    // when scrolling happens.
    if (target !== offset) {
      while (offset !== target) {
        if (target > offset) {
          scrollDownLine() // scroll down, delete line from top
          offset++
        } else if (target < offset) {
          scrollUpLine() // scroll up, add line to top
          offset--
        }
      } while (offset !== target);
    }
  }

  function updateHeader (header) {
    R._header = header = (header || R._header).trimRight() // don't want trailing newlines.
    c.push().position(1, 1)
    .position(1, R.header + height + 1)
    .write(header).pop()
  }

  function updateFooter (footer) {
    R._footer = footer = (footer || R._footer).trimRight() // don't want trailing newlines.
    c.push()
    .position(1, R.header + height + 1)
    .erase('line').write(footer).pop()
  }

  setInterval(() => {
    if (doc.marks) {
      c.cursor(~~(Date.now() / 333) % 2)
    }
  }, 333)

  return R
}
