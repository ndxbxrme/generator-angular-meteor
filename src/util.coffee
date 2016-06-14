spawnSync = (command, args, cb) ->
  result = spawn(command, args, stdio: 'inherit')

  poll = ->
    if result._closesGot == 1
      cb?()
    else
      setTimeout poll, 500
    return

  poll()
  return

write = (self, options, cb) ->
  if !self.filters.jade
    self.filters.jade = false
  files = glob('**', {
    dot: true
    cwd: self.sourceRoot()
  }, ((err, files) ->
    src = undefined
    dest = undefined
    files.forEach ((f) ->
      if f.search(/\.(js|coffee|html|jade|css|scss|less|styl)$/) > -1 or f.indexOf('_') == 0
        for filter of self.filters
          if self.filters[filter]
            if f.indexOf('(' + filter + ')') != -1 or f.indexOf('(') == -1
              newname = f.replace('(' + filter + ')', '')
              try
                self.fs.copyTpl self.templatePath(f), self.destinationPath(newname.replace(/^_/, '').replace('compname-singular', options.compnameSluggedSingular or options.compnameSingular).replace('compname', options.compnameSlugged or self.compname)), options
              catch err
                console.log err, options
              break
      else if f.search(/\.(ico)$/) > -1
        self.copy self.templatePath(f), self.destinationPath(f)
      return
    ).bind(self)
    if cb
      cb()
    return
  ).bind(self))
  return

'use strict'
path = require('path')
fs = require('fs')
spawn = require('cross-spawn')
glob = require('glob')
_ = require('lodash')
module.exports =
  spawnSync: spawnSync
  write: write