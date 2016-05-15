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
        required: true
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
          this.log('It is recommended to use a plural model name');
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
          type: 'confirm',
          name: 'protected',
		  store: true,
          message: 'Is this a protected model?',
          "default": true,
          when: (function() {
            return this.filters.auth;
          }).bind(this)
        }
      ], (function(answers) {
        this.filters["protected"] = answers["protected"];
        cb();
      }).bind(this));
    },
    write: function() {
      this.sourceRoot(path.join(__dirname, './templates'));
      this.dir = '';
      this.destinationRoot(path.join(process.cwd(), this.dir));
      genUtils.write(this, this.filters);
    }
  });

}).call(this);
