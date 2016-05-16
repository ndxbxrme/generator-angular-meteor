(function() {
  var _, _i, fs, genUtils, path, yeoman;

  yeoman = require('yeoman-generator');

  fs = require('fs');

  path = require('path');

  _ = require('underscore.string');

  _i = require('underscore.inflection');

  genUtils = require('../util.js');

  module.exports = yeoman.generators.Base.extend({
    init: function() {
      this.argument('compname', {
        type: String,
        required: false
      });
      this.compname = _.slugify(_.humanize(this.compname));
    },
    info: function() {},
    checkForConfig: function() {
      var cb;
      cb = this.async();
      if (this.config.get('filters')) {
        this.filters = this.config.get('filters');
        this.filters.appname = this.config.get('appname') + 'App';
        this.filters.projectname = this.config.get('appname');
        this.filters.compname = _.camelize(this.compname);
        this.filters.compnameSingular = _i.singularize(this.compname);
        this.filters.compnameSlugged = this.compname;
        this.filters.compnameCapped = _.capitalize(this.filters.compname);
      } else {
        this.log('Cannot find the config file (.yo-rc.json)');
        return;
      }
      cb();
    },
    askFor: function() {
      var cb;
      cb = this.async();
      this.prompt([
        {
          name: 'dir',
          message: 'Where would you like to create this view?',
		  store: true,
          "default": '/client'
        }
      ], (function(answers) {
        this.dir = answers.dir.replace(/\/$/, '');
        cb();
      }).bind(this));
    },
    write: function() {
      this.sourceRoot(path.join(__dirname, './templates/'));
      this.dir = this.dir + '/' + this.compname;
      this.destinationRoot(path.join(process.cwd(), this.dir));
      genUtils.write(this, this.filters);
    }
  });

}).call(this);
