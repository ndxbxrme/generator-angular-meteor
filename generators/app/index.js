(function() {
  var _, _i, angularModules, fs, genUtils, meteorToAdd, meteorToRemove, os, path, yeoman;

  yeoman = require('yeoman-generator');

  fs = require('fs');

  path = require('path');

  _ = require('underscore.string');

  _i = require('underscore.inflection');

  os = require('os');

  genUtils = require('../util.js');

  meteorToAdd = ['add', 'angular', 'angularui:angular-ui-router'];

  meteorToRemove = ['remove', 'blaze-html-templates', 'ecmascript'];

  angularModules = ['angular-meteor', 'ui.router'];

  module.exports = yeoman.generators.Base.extend({
    init: function() {
      this.argument('name', {
        type: String,
        required: true
      });
      this.argument('dontrun', {
        type: String,
        required: false
      });
      this.appname = this.name || path.basename(process.cwd());
      this.appname = _.camelize(_.slugify(_.humanize(this.appname)));
    },
    info: function() {},
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
    windowsXCheck: function() {
      var cb;
      cb = this.async();
      if (os.platform().indexOf('win') !== -1 && os.release().indexOf('10') === 0) {
        this.prompt([
          {
            type: 'input',
            name: 'hmmmm',
            message: 'Hit Enter to get started',
			store: true
          }
        ], (function() {
          cb();
        }).bind(this));
      } else {
        cb();
      }
    },
    clientPrompts: function() {
      var cb;
      cb = this.async();
      this.prompt([
        {
          type: 'list',
          name: 'script',
          message: 'What would you like to write scripts with?',
// Storing this one messes up the default for some reason
//		      store: true,
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
          message: 'What would you like to write markup with?',
          "default": 0,
          choices: ['HTML', 'Jade'],
          filter: function(val) {
            return val.toLowerCase();
          }
        }, {
          type: 'list',
          name: 'stylesheet',
          "default": 3,
          message: 'What would you like to write stylesheets with?',
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
    createMeteorProject: function() {
      var cb;
      cb = this.async();
      genUtils.spawnSync('meteor', ['create', this.appname], cb);
    },
    changeDirectory: function() {
      var cb;
      cb = this.async();
      if (!fs.existsSync(process.cwd() + '/' + this.appname)) {
        this.log('Something went wrong running meteor, please make sure you have it installed properly.  https://www.meteor.com/');
        return;
      }
      process.chdir(process.cwd() + '/' + this.appname);
      this.destinationRoot(process.cwd());
      this.config.set('filters', this.filters);
      this.config.set('appname', this.appname);
      cb();
    },
    cleanMeteorDirectory: function() {
      var cb;
      cb = this.async();
      ['.html', '.css', '.js'].forEach((function(ext) {
        try {
          fs.unlinkSync(process.cwd() + '/' + ext);
        } catch (_error) {}
      }).bind(this));
      ['client/main.html', 'client/main.css', 'client/main.js', 'server/main.js'].forEach((function(ext) {
        try {
          fs.unlinkSync(process.cwd() + '/' + ext);
        } catch (_error) {}
      }).bind(this));
      cb();
    },
    removeMeteorPackages: function() {
      var cb;
      cb = this.async();
      if (this.filters.auth) {
        meteorToRemove.push('insecure');
      }
      if (this.filters.pagination) {
        meteorToRemove.push('autopublish');
      }
      if (meteorToRemove.length > 1) {
        genUtils.spawnSync('meteor', meteorToRemove, cb);
      } else {
        cb();
      }
    },
    loadMeteorPackages: function() {
      var cb;
      cb = this.async();
      if (this.filters.coffee) {
        meteorToAdd.push('ndxbxrme:ng-coffeescript');
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
        meteorToAdd.push('twbs:bootstrap');
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
        meteorToAdd.push('dotansimha:accounts-ui-angular');
        angularModules.push('accounts.ui');
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
      genUtils.spawnSync('meteor', meteorToAdd, cb);
    },
    updateMeteorPackages: function() {
      var cb;
      cb = this.async();
// A Quick hack to update the packages
      var meteorToUpdate = meteorToAdd;
      meteorToUpdate[0] = 'update';
      meteorToUpdate.push('angular:angular');
//      meteorToUpdate.push('angular:angular-animate');
//      meteorToUpdate.push('angular:angular-aria');
      meteorToUpdate.push('dburles:mongo-collection-instances');
      meteorToUpdate.push('lai:collection-extensions');
      meteorToUpdate.push('pbastowski:angular-babel');
      meteorToUpdate.push('tmeasday:check-npm-versions');

      genUtils.spawnSync('meteor', meteorToUpdate, cb);
    },
    write: function() {
      this.filters.appname = this.appname + 'App';
      this.filters.projectname = this.config.get('appname');
      this.filters.modules = '\'' + (this.filters.js ? angularModules.join('\',\n  \'') : angularModules.join('\'\n  \'')) + '\'';
      this.config.set('filters', this.filters);
      this.sourceRoot(path.join(__dirname, './templates/' + this.filters.framework));
      genUtils.write(this, this.filters);
    },
    launchMeteor: function() {
      if (!this.dontrun) {
        this.spawnCommand('meteor', null, null);
      }
    }
  });

}).call(this);
