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
      this.compname = _.decapitalize(_.camelize(this.compname));
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
        this.filters.compnameSlugged = _.dasherize(this.compname);
        this.filters.compnameSluggedSingular = _i.singularize(this.filters.compnameSlugged);
        this.filters.compnameCapped = _.capitalize(this.filters.compname);
        this.filters.compnameCappedSingular = _i.singularize(this.filters.compnameCapped);
        if (this.filters.compname === this.filters.compnameSingular) {
          this.log('If you are planning to create a model or list/detail views it is recommended you use a plural route name');
        }
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
          message: 'Where would you like to create this route?',
		  store: true,
          "default": '/client'
        }, {
          type: 'confirm',
          name: 'protected',
          message: 'Is this a protected route?',
          "default": false,
          when: (function() {
            return this.filters.auth;
          }).bind(this)
        }, {
          type: 'confirm',
          name: 'complex',
          message: 'Would you like to make List/Details routes?',
          "default": true
        }, {
          type: 'confirm',
          name: 'model',
          message: 'Would you like to create a Model?',
          "default": true,
          when: function(answers) {
            return !answers.complex;
          }
        }
      ], (function(answers) {
        this.filters.dir = answers.dir.replace(/\/$/, '').replace(/^\//, '');
        this.filters.complex = !!answers.complex;
        this.filters.model = !!answers.model;
        if (this.filters.complex) {
          this.filters.model = true;
        }
        this.filters["protected"] = !!answers["protected"];
        cb();
      }).bind(this));
    },
    write: function() {
      var baseDir;
      this.sourceRoot(path.join(__dirname, './templates/' + (this.filters.framework || 'none') + '/client/' + (this.filters.complex ? 'complex' : 'simple')));
      this.filters.dir = this.filters.dir + '/' + this.filters.compnameSlugged;
      baseDir = path.join(process.cwd(), '');
      this.destinationRoot(path.join(process.cwd(), this.filters.dir));
      genUtils.write(this, this.filters, (function() {
        if (this.filters.model) {
          this.sourceRoot(path.join(__dirname, '../model/templates'));
          this.destinationRoot(baseDir);
          genUtils.write(this, this.filters);
        }
      }).bind(this));
    }
  });

}).call(this);
