'use strict'

const
  keypress = require('keypress')
, events   = {keypress : [], mousepress : []}
, sin      = process.stdin

sin.setRawMode(true)
sin.resume()

sin.on('keypress', (ch, key) => {
  events.keypress.some(l => {
    return l(ch, key || {
      name  : ch
    , ctrl  : false
    , shift : false
    , meta  : false
    })
  })
})

keypress(sin)

sin.on('mousepress', mouse => {
  events.mousepress.some(l => l(mouse))
})

module.exports.on = (event, listener) => {
  events[event].push(listener)
}

module.exports._events = events

module.exports.listeners = evt => events[evt]

module.exports.removeAllListeners = evt => {
  events[evt] = []
}

if (!module.parent) {
  sin.on('keypress', (c, k) => {
    console.error(c, k)
    if (c === 'q')
      process.exit()
  })

}

