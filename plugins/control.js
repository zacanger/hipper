// ctrl-whatever keys

const
  fs = require('fs')
, cp = require('child_process')

module.exports = function (doc, keys, render) {
  let
    saved = false
  , rc    = this.config

  function send (args, write, cb) {
    let
      cmd    = args.shift()
    , output = ''
    , c      = cp.spawn(cmd, args)

    if (cb) {
      c.stdout.on('data', b => { output += b })
      c.stdout.on('end', () => cb(null, output))
    }

    c.on('error', err => console.error('err', err))
    c.stdin.write(write || '')
    c.stdin.end()
  }

  function clipIn () {
    if (process.platform === 'darwin') {
      send(['pbcopy'], doc.getMarked())
    } else if (process.platform === 'linux') {
      send(['xclip', '-i', '-selection', 'clipboard'], doc.getMarked())
    }
  }

  function clipOut () {
    function cb (_, paste) {
      doc.insert(paste)
    }

    if (process.platform === 'darwin') {
      send(['pbpaste'], '', cb)
    } else if (process.platform === 'linux') {
      send(['xclip', '-o', '-selection', 'clipboard'], '', cb)
    }
  }

  keys.on('keypress', (ch, key) => {
    console.error(ch, key)

    if (key.ctrl) {
      if (key.name === 's' && !rc.noSave) {
        saved = true
        fs.writeFileSync(rc.file, doc.lines.join(''), 'utf-8')
        return
      }
      if (key.name === 'c') {
        clipIn()
      }
      if (key.name === 'x') {
        clipIn()
        doc.clearMarked()
      }
      if (key.name === 'p' || key.name === 'v') {
        doc.clearMarked()
        clipOut()
      }
      if (key.name === 'r') {
        doc.move()
        return render.redraw()
      }
      if (key.name === 'd') { // delete current line
        return doc.start().deleteLines(doc.row, 1).move()
      }
      if (key.name === 'l') { // select current line
        doc.start().mark().down().mark().move()
      }
      if (key.name === 'q') {
        process.stdin.pause()
        process.exit(saved ? 0 : 1)
      }
    }
  })
}
