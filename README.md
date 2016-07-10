# hipper

Slightly hipper than [Hipster](https://github.com/dominictarr/hipster).

* Install: `npm i -g hipper`, then:
* Run: `hipper`, or:
* `hipper some-file.md`, or:
* `hipper my-script.js`.

## Why use this?

* Because you're a developer who needs to ssh into their droplet and make a quick change.
* You don't want to take the time to learn `vi` just to add some API keys or something.
* Nano is ugly and has weird keybinds, and also it's disappearing from GNU.
* You just want something quick and easy.
* So. Here. Use this.

This is a fork of the awesome [Hipster](http://npm.im/hipster) by [Dominic Tarr](http://dominictarr.com/).

Updated and modified to suit [myself](http://zacanger.com) a little better.
All credit goes to @dominictarr. Most of his README is below (just slightly edited).

Contributing: PLEASE DO! Check out `highlight/javascript.js` to see what I especially need help with.
More syntax files would also be welcome! And any other fixes anyone has.

--------

## Features

Hipper has modern controls. no modes or silly stuff like that.

* Selection of text (Shift + Arrows)
* Copy/Paste        (`sudo apt-get install xclip`)
* Typing            (duh)

## Unfeatures

Hipper does not have:

* Buffers           (use dvtm or screen [tmux interferes with controls])
* Undo              (use git)
* Friendly Warnings (deal with it)

## Usage

```
hipper filename [options]

--margin     # Set to N >= 2 for line numbers.
--page       # PageUp/Down jump size.
--version|-v # print version and exit
--weird      # enable weird backspace.
             # (if it deletes a whole word when you press backspace, enable this)
```

`hipper` uses [rc](https://npm.im/rc) for unmanaging configuration.
This means you can have a `~/.hipperrc`.

## Controls

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

## Terminals

Some terminals interfere with modifier keys. xterm works well.
If you use fancy terminals that have tabs and stuff then you may have trouble
selecting text with key combinations like `Ctrl-Shift-Up/Down`.

## Credits

[Hipster](https://github.com/dominictarr/hipster).

This module depends on [TooTallNate/keypress](https://github.com/tootallnate/keypress),
[substack/node-charm](https://github.com/substack/node-charm) and
[Marak/colors.js](https://github.com/Marak/colors.js)

But the most important thing is the playful oneupsmanship that exists in the node
community regarding ansi/terminal art. Without that I would probably not have attempted this.

You know who you are!

## Known Issues

Doesn't wrap lines or anything yet.
Syntax highlighting breaks (try a keyword in a comment, for example).

## License

MIT
