module.exports = function (doc, _, render) {
  let rc = this.config
  render.footer = 1

  const pad = (s, l, ch) => {
    while (s.length < 1) {
      s = (ch || ' ') + s
    }
    return s
  }

  doc.on('cursor', (_, x, y) => {
    console.error([x, y])
    render.updateFooter(pad(y + '(' + doc.lines.length + ') ' + x, rc.columns - 2))
  })

  render.updateFooter(pad(1 + '(' + doc.lines.length + ') ' + 1, rc.columns - 2))
}
