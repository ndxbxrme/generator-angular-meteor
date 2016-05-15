(function() {
  var _, _i, angularModules, fs, genUtils, meteorToAdd, meteorToRemove, path, yeoman;

  yeoman = require('yeoman-generator');

  fs = require('fs');

  path = require('path');

  _ = require('underscore.string');

  _i = require('underscore.inflection');

  genUtils = require('../util.js');

  meteorToAdd = ['angular', 'angularui:angular-ui-router', 'urigo:angular-blaze-template'];

  meteorToRemove = [];

  angularModules = ['angular-meteor', 'ui.router'];

  module.exports = yeoman.generators.Base.extend({
    init: function() {},
    info: function() {
      this.log(this.yeoman);
    },
    checkForConfig: function() {
      var cb;
      cb = this.async();
      if (this.config.get('filters')) {
        this.log('The generator has already been run');
        return;
      }
      if (fs.existsSync(process.cwd() + '/' + this.appname)) {
        this.log('The generator has already been run.  CD into the directory');
        return;
      }
      cb();
    },
    clientPrompts: function() {
      var cb;
      cb = this.async();
      this.prompt([
        {
          type: 'text',
          name: 'appname',
		  store: true,
          message: 'Please enter your app\'s name'
        }, {
          type: 'list',
          name: 'script',
          message: 'What are you writing scripts with?',
          choices: ['JavaScript', 'CoffeeScript'],
          "default": 0,
          filter: function(val) {
            var filterMap;
            filterMap = {
              'JavaScript': 'js',
              'CoffeeScript': 'coffee'
            };
            return filterMap[val];
          }
        }, {
          type: 'list',
          name: 'markup',
          message: 'What are you writing markup with?',
          "default": 0,
          choices: ['HTML', 'Jade'],
          filter: function(val) {
            return val.toLowerCase();
          }
        }, {
          type: 'list',
          name: 'stylesheet',
          "default": 3,
          message: 'What are you writing stylesheets with?',
          choices: ['CSS', 'Stylus', 'Less', 'SCSS'],
          filter: function(val) {
            return val.toLowerCase();
          }
        }, {
          type: 'confirm',
          name: 'pagination',
          message: 'Would you like pagination, sorting and searching support?'
        }, {
          type: 'list',
          name: 'framework',
          message: 'Select a CSS framework',
          "default": 2,
          choices: ['None', 'Bootstrap', 'Angular Material', 'Ionic'],
          filter: function(val) {
            var filterMap;
            filterMap = {
              'None': 'none',
              'Angular Material': 'material',
              'Bootstrap': 'bootstrap',
              'PureCSS': 'purecss',
              'Foundation for Apps': 'foundationapps',
              'Ionic': 'ionic'
            };
            return filterMap[val];
          }
        }
      ], (function(answers) {
        this.filters = {};
        this.filters.appname = answers.appname;
        this.filters.projectname = answers.appname;
        this.filters[answers.script] = true;
        this.filters[answers.markup] = true;
        this.filters[answers.stylesheet] = true;
        this.filters.pagination = !!answers.pagination;
        this.filters.framework = answers.framework;
        cb();
      }).bind(this));
    },
    authPrompts: function() {
      var cb, self;
      cb = this.async();
      self = this;
      this.prompt([
        {
          type: 'confirm',
          name: 'auth',
		  store: true,
          message: 'Would you like to use user authentication?'
        }, {
          type: 'checkbox',
          name: 'oauth',
          message: 'Would you like to include additional oAuth strategies?',
          when: function(answers) {
            return answers.auth;
          },
          choices: [
            {
              value: 'googleAuth',
              name: 'Google',
              checked: false
            }, {
              value: 'facebookAuth',
              name: 'Facebook',
              checked: false
            }, {
              value: 'twitterAuth',
              name: 'Twitter',
              checked: false
            }
          ]
        }
      ], (function(answers) {
        this.filters.auth = !!answers.auth;
        if (answers.oauth) {
          if (answers.oauth.length) {
            this.filters.oauth = true;
          }
          answers.oauth.forEach((function(oauthStrategy) {
            this.filters[oauthStrategy] = true;
          }).bind(this));
        }
        cb();
      }).bind(this));
    },
    removeMeteorPackages: function() {
      var cb, index, removePackage;
      cb = this.async();
      if (this.filters.auth) {
        meteorToRemove.push('insecure');
      }
      if (this.filters.pagination) {
        meteorToRemove.push('autopublish');
      }
      index = 0;
      removePackage = function() {
        if (index < meteorToRemove.length) {
          genUtils.spawnSync('meteor', ['remove', meteorToRemove[index++]], removePackage);
        } else {
          cb();
        }
      };
      removePackage();
    },
    loadMeteorPackages: function() {
      var cb, index, loadPackage;
      cb = this.async();
      index = 0;
      if (this.filters.coffee) {
        meteorToAdd.push('coffeescript');
      }
      if (this.filters.stylus) {
        meteorToAdd.push('mquandalle:stylus');
      }
      if (this.filters.less) {
        meteorToAdd.push('flemay:less-autoprefixer');
      }
      if (this.filters.scss) {
        meteorToAdd.push('fourseven:scss');
      }
      if (this.filters.jade) {
        meteorToAdd.push('civilframe:angular-jade');
      }
      if (this.filters.framework === 'material') {
        meteorToAdd.push('angular:angular-material');
        angularModules.push('ngMaterial');
      }
      if (this.filters.framework === 'bootstrap') {
        meteorToAdd.push('twbs:bootstrap');
        meteorToAdd.push('angularui:angular-ui-bootstrap');
        angularModules.push('ui.bootstrap');
      }
      if (this.filters.framework === 'purecss') {
        meteorToAdd.push('mrt:purecss');
      }
      if (this.filters.framework === 'foundationapps') {
        meteorToAdd.push('rainhaven:foundation-apps');
      }
      if (this.filters.framework === 'ionic') {
        meteorToAdd.splice(meteorToAdd.indexOf('angularui:angular-ui-router'), 1);
        meteorToAdd.push('driftyco:ionic');
        angularModules.splice(angularModules.indexOf('ui-router'), 1);
        angularModules.push('ionic');
      }
      if (this.filters.pagination) {
        meteorToAdd.push('tmeasday:publish-counts');
        meteorToAdd.push('angularutils:pagination');
        angularModules.push('angularUtils.directives.dirPagination');
      }
      if (this.filters.auth) {
        meteorToAdd.push('accounts-password');
        meteorToAdd.push('accounts-ui');
      }
      if (this.filters.twitterAuth) {
        meteorToAdd.push('accounts-twitter');
      }
      if (this.filters.facebookAuth) {
        meteorToAdd.push('accounts-facebook');
      }
      if (this.filters.googleAuth) {
        meteorToAdd.push('accounts-google');
      }
      loadPackage = function() {
        if (index < meteorToAdd.length) {
          genUtils.spawnSync('meteor', ['add', meteorToAdd[index++]], loadPackage);
        } else {
          cb();
        }
      };
      loadPackage();
    },
    write: function() {
      this.filters.modules = '\'' + (this.filters.js ? angularModules.join('\',\n  \'') : angularModules.join('\'\n  \'')) + '\'';
      this.sourceRoot(path.join(__dirname, './templates'));
      genUtils.write(this, this.filters);
    },
    launchMeteor: function() {
      if (!this.dontrun) {
        this.spawnCommand('meteor', null, null);
      }
    }
  });

}).call(this);
