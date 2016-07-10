require('colors')

module.exports = function (doc, _, render) {

  let rc = this.config

  if (rc.showEnding === false) {
    return
  }

  let ending = rc.showEnding === true ? '\u266b' : rc.showEnding
  ending = ending || '/'

  render.write((rc.title || 'README'))

  this.renderers.push(q => {
    if (/\s+$/.test(q.string)) {
      q.string = q.string + ending.red
    }
  })

}
