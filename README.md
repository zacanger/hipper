# hipper

## DEPRECATED

This module is deprecated (and, I guess, abandoned). If you need a simple
terminal editor I recommend Nano or
[openemacs](https://github.com/practicalswift/openemacs). If you need/want one
written in Node for some reason, go with
[Slap](https://github.com/slap-editor/slap).

Slightly hipper than [Hipster](https://github.com/dominictarr/hipster).

* Install: `npm i -g hipper`, then:
* run `hipper`, as in `hipper some-file.js`

## Why use this?

* You're a dev who needs to ssh into a droplet and make a quick change.
* You don't want to take the time to learn `vi`
* Nano is ugly, has weird keybinds, and is disappearing from GNU.
* Because I'm cool and you like me.

This is a fork of the awesome [Hipster](http://npm.im/hipster) by
[Dominic Tarr](http://dominictarr.com/).

Updated and modified to suit [myself](http://zacanger.com) a little better.
All credit goes to @dominictarr. Much of the README below is his, as well.

Contributing: please do! Syntax files are welcome. Anyone with regular expression
skills, definitely welcome. Any other fixes or features, probably welcome.

If you're interested in improving highlighting or language support, check out
the files under the highlight directory, and if you add a language, please also
add it to `plugins/highlight.js` in your PR.

![screenshot](/screenshot.png?raw=true)

--------

## Usage

```
hipper filename [options]

--margin     # Set to N >= 2 for line numbers.
--page       # PageUp/Down jump size.
--version|-v # print version and exit
--weird      # enable weird backspace.
             # (if it deletes a whole word when you press backspace, enable this)
```

Hipper has simple controls.

* Selection   (Shift + Arrows)
* Copy/Paste  (`sudo apt-get install xclip`)

Hipper does not have:

* Buffers           (use dvtm or screen [tmux interferes with controls])
* Undo              (use git)
* Friendly Warnings (deal with it)

`hipper` uses [rc](https://npm.im/rc) for configuration.
This means you can have a `~/.hipperrc`.

### Controls

 * Arrows         - Slow Movement.
 * Ctrl-Arrows    - Fast Movement.
 * Shift-Movement - Select text
 * Ctrl-F         - Search forwards for text
 * Ctrl-C         - Copy
 * Ctrl-X         - Cut
 * Ctrl-P,V       - Paste
 * Tab            - Indent   (to selected lines)
 * Shift-Tab      - Unindent (to selected lines)
 * Ctrl-R         - Redraw Screen.
 * Ctrl-S         - Save.
 * Ctrl-Q         - Quit.

### Terminals

Some terminals interfere with modifier keys. xterm works well.
If you use fancy terminals that have tabs and stuff then you may have trouble
selecting text with key combinations like `Ctrl-Shift-Up/Down`.

### Credits

[Hipster](https://github.com/dominictarr/hipster).

This module depends on [keypress](https://github.com/tootallnate/keypress),
[node-charm](https://github.com/substack/node-charm) and
[colors.js](https://github.com/Marak/colors.js) (among some other things).

### Known Issues

Doesn't wrap lines (just keep your lines short).
Syntax highlighting is not great (try a keyword in a comment, for example).

### License

MIT
