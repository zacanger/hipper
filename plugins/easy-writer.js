require('colors')

module.exports = function (doc, _, render) {
  const rc = this.config

  if (rc.showEnding === false) {
    return
  }

  const ending = (rc.showEnding === true ? '\u266b' : rc.showEnding) || '/'

  render.write((rc.title || 'README'))

  this.renderers.push(q => {
    if (/\s+$/.test(q.string)) {
      q.string = q.string + ending.red
    }
  })
}
