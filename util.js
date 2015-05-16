'use strict';
var path = require('path');
var fs = require('fs');
var spawn = require('cross-spawn');
var glob = require('glob');
var _ = require('lodash');

module.exports = {
  spawnSync: spawnSync,
  write: write
};


function spawnSync (command, args, cb) {
  var result = spawn(command, args, { stdio: 'inherit' });
  var poll = function() {
    if(result._closesGot===1) {
      cb(); 
    }
    else {
      setTimeout(poll, 500); 
    }
  }
  poll();
}

function write(self, options, cb) {
  var files = glob('**', { dot: true, cwd: self.sourceRoot() }, function(err, files) {
    var src, dest;
    files.forEach(function(f) {
      if(f.search(/\.(js|coffee|html|jade|css|scss|less|styl)$/)>-1 || f.indexOf('_')===0) {
        for(var filter in self.filters) {
          if(self.filters[filter]) {
            if(f.indexOf('(' + filter + ')')!==-1 || f.indexOf('(')===-1) {
              if(!self.filters.material && f.indexOf('theme')!==-1) {
                break; 
              }
              var newname = f.replace('(' + filter + ')', '');
              try {
                self.fs.copyTpl(
                  self.templatePath(f),
                  self.destinationPath(newname.replace(/^_/, '').replace('compname-singular',options.compnameSingular).replace('compname', self.compname)),
                  options
                );
              }
              catch(err) {
                console.log(err, options);
              }
              break;
            }
          }
        }
      }
    }.bind(self));
    if(cb) {
      cb(); 
    }
  }.bind(self));
}