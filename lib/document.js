'use strict'

const
  EventEmitter = require('events').EventEmitter
, inherits     = require('util').inherits
, words        = require('./words')

inherits(Document, EventEmitter)

function Document() {
  this.row   = this.column = this.preferred = 0
  this.lines = ['\n']
  this.marks = null
}

// compare marked positions
function cmp (m, n) {
  return m.y - n.y === 0 ? m.x - n.x : m.y - n.y
}

function sameLine (m, n) {
  return m.y == n.y
}

const methods = {

  // get line relative to current
  line (n) {
    n = n || 0
    return this.lines[this.row + n]
  }

  // set the current line
, setLine (val) {
    this.lines[this.row] = val
  }

  // force the column inside the string
, fixColumn () {
    let l
    if (this.column + 1 > (l = this.line().length)) {
      this.column = l - 1
    }
    return this
  }

  // check if cursor is on first line
, isFirstLine () {
    return this.row === 0
  }

  // check if cursor is on last line
, isLastLine () {
    return this.row + 1 >= this.lines.length
  }

  // check if cursor is at start of line
, isFirst () {
    return this.column === 0
  }

  // check if cursor is at end of line
, isLast () {
    return this.column + 1 >= this.line().length
  }

  // set cursor position
, pos (x, y) {
    this.column = x
    this.row    = y
    return this
  }

  // move cursor to end of line
, end () {
    this.column = this.line().length - 1
    return this
  }

  // move cursor to start of line
, start () {
    this.column = 0
    return this
  }

  // move cursor up a line
, up () {
    if (this.row > 0) {
      (--this.row, this.fixColumn())
    }
    return this
  }

  // move cursor down a line
, down () {
    if (this.row + 1 < this.lines.length) {
      (++this.row, this.fixColumn())
    }
    return this
  }

  // move cursor left
, left () {
    if (this.column > 0) {
      --this.column
    }
    return this
  }

  // move cursor to right
, right () {
    if (this.column + 1 < this.line().length) {
      ++this.column
    }
    return this
  }

  // move to previous word
, prev () {
  let m = words.prev(this.line(), this.column)
    if (m) {
      this.column = m.index
    } else if (this.isFirstLine()) {
      this.start()
    } else {
      this.up().end()
    }
    return this
  }

  // move to the end of the word
, next () {
    let m = words.current(this.line(), this.column)
    if (m) {
      this.column = m.index + m[0].length
    } else if (this.isLastLine()) {
      this.end()
    } else {
      this.down().start()
    }
    return this
  }

  // move to prev section (start of non whitespace block)
, prevSection () {
    this.up()
    while (! this.isFirstLine() && !/^\s*$/.test(this.line(-1))) {
      this.up()
    }
    while (! this.isFirstLine() && /^\s*$/.test(this.line())) {
      this.up()
    }
   return this
  }

  // move to next section (start of non whitespace block)
, nextSection () {
    this.down()
    while (! this.isLastLine() && /^\s*$/.test(this.line())) {
      this.down()
    }
    while (! this.isLastLine() && !/^\s*$/.test(this.line())) {
      this.down()
    }
    return this
  }

  // go to the first line
, firstLine () {
    this.row = 0
    return this
  }

  // go to the last line
, lastLine () {
    this.row = this.lines.length - 1
    return this
  }

  // moving the terminal cursor
, move () {
    return this._emit('cursor')
  }

  // set preferred column to be in. when text is entered,
  // then moves up a line, editor should be in same solumn.
  // set whenever cursor moves left or right.
, pref: function pref () {
    this.preferred = this.column
    return this
  }

, toPref: function toPref() {
    console.error('TO_PREF', this.preferred, this.column)
    if ('undefined' === typeof this.preferred) {
      return this
    }
    if (this.line().length  <= this.preferred) {
      this.column = this.line().length - 1
    } else {
      this.column = this.preferred
    }
    return this
  }

  // set a mark; call twice to mark a section.
, mark (x, y) {
    if (x == null && y == null) {
      x = this.column, y = this.row
    }

    let mark = {x : x, y : y}

    if (!this.firstMark) {
      this.firstMark =  mark
    }
    this.secondMark = mark

    this.marks = [this.firstMark, this.secondMark].sort(cmp)
    this.emit('mark', this.marks[0], this.marks[1])
    return this
  }

  // remove marks
, unmark () {
    console.error('UNMARK', this.marks)
    let old = this.marks
    this.firstMark = this.secondMark = this.marks = null
    if (old) {
      this.emit('unmark', old[0], old[1])
    }
    return this
  }

, getMarked () {
    if (!this.marks) {
      return null
    }
    let m = this.marks[0], M = this.marks[1]

    if (sameLine(m, M)) {
      return this.lines[m.y].substring(m.x, M.x)
    }

    let lines = this.lines[m.y].substring(m.x)
    for (let Y = m.y + 1; Y < M.y; Y++) {
      lines += this.lines[Y]
    }
    lines += this.lines[M.y].substring(0, M.x)
    return lines
  }

, clearMarked () {
    if (!this.marks) {
      return this
    }
    // delete. would be nice to remove current mark, then replace it.
    // todo: consider gh:josephg/jumprope (from ot). would need to fix
    // lengths (lines or chars), and ability to address by line.
    if (!this.marks) {
      return null
    }

    let m = this.marks[0], M = this.marks[1]
    this.pos(m.x,m.y)

    if (sameLine(m, M)) {
      return this.unmark().delete(M.x - m.x)
    }

    // get the remainder of last line and start of first line.
    // delete all middle lines, then join remainders together.
    let
      last  = this.lines[M.y].substring(M.x)
    , first = this.lines[m.y].substring(0, m.x)
    , lines = M.y - m.y
    this.deleteLines(m.y, lines)
    this.pos(m.x,m.y).setLine(first + last)

    console.error('LINE', this.line())
    return this.unmark().move()
  }

, insert (lines) {
    lines.split('\n').forEach((line, i, lines) => {
      this.write(line)
      if (i + 1 < lines.length) {
        this.newline()
      }
    })
    return this.move()
  }

  // emit event with current line and cursor pos
, _emit (m, l) {
    this.emit(m, l || this.line(), this.column + 1, this.row + 1)
    return this
  }

  // create a new line under the cursor
, newline () {
    let
      l = this.line()
    , nl
    this.setLine(l.slice(0, this.column) + '\n')
    this._emit('update_line')
    this.lines.splice(++this.row, 0, nl = l.slice(this.column))

    this.column = 0
    this._emit('new_line').move()
    return this
  }

  // write some data
, write (data) {
    let l = this.line()
    this.setLine(l.slice(0, this.column) + data + l.slice(this.column))
    this.column += data.length
    this._emit('update_line').move()
    return this
  }

, updateLine (line, data) {
    this.lines[line] = data
    this.emit('update_line', data, 1, line + 1)
  }

, deleteLines (line, lines) {
    this.lines.splice(line, lines)
    if (!lines.length) {
      this.lines.push('\n')
    }
    while (lines) {
      this.emit('delete_line', '', 1, line + (lines --))
    }
    return this
  }

  // delete (+-charsToDelete)
, delete (data) {
    data = data == null ? 1 : data
    if (this.isFirst() && data < 0 ) {
      if (this.isFirstLine()) {
        return this
      }
      this.up()
      // want to be on first char of what was the next line,
      // so that newline char is deleted
      this.column = this.line().length
      this._emit('delete_line')
      this.lines.splice(this.row, 2, this.line() + this.line(1))
    } else if (this.isLast() && data > 0) {
      if (this.isLastLine()) {
        return this
      }
      this._emit('delete_line')
      this.end()
      this.lines.splice(this.row, 2, this.line() + this.line(+1))
    }

    let
      nc = this.column + data
    , l  = this.line()
    , s  = Math.min(this.column, nc)
    , e  = Math.max(this.column, nc)
    this.lines[this.row] = l.slice(0, s) + l.slice(e)
    this.column = s

    if (this.line() == '') {
      this.deleteLines(this.row, 1)
    } else {
      this._emit('update_line').move()
    }
    return this
  }

  // backspace
, backspace (n) {
    return this.delete(-1 * (n || 1))
  }
}

for (let m in methods) {
  Document.prototype[m] = methods[m]
}

module.exports = Document

