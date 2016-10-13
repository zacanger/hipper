// line numbers are drawn into 'margin' space
module.exports = function (doc) {
  let rc = this.config

  const padNum = (n, m) => {
    n = '' + n
    while (n.length < m) {
      n = '0' + n
    }
    return n.slice(n.length - (m))
  }

  this.renderers.push((q, x, y) => {
    if (rc.margin) {
      let num = padNum(y, rc.margin - 1)
      num = num[y % 2 ? 'green' : 'yellow']
      y % 5 || (num = num.bold)
      q.insertBefore(0, num + ' ')
    }
  })
}
