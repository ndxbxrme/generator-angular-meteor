var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var _ = require('underscore.string');
var _i = require('underscore.inflection');
var genUtils = require('../util.js');

var meteorToAdd = ['urigo:angular', 'angularui:angular-ui-router'];
var meteorToRemove = [];
var angularModules = ['angular-meteor', 'ui.router'];

module.exports = yeoman.generators.Base.extend({
  init: function() {
    this.argument('name', {type: String, required: true});
    this.argument('dontrun', {type: String, required: false});
    this.appname = this.name || path.basename(process.cwd());
    this.appname = _.camelize(_.slugify(_.humanize(this.appname)));
    //console.log(this.spawnCommand);
  },
  info: function() {
    //this.log(this.yeoman);
  },
  checkForConfig: function() {
    var cb = this.async();
    if(this.config.get('filters')) {
      this.log('The generator has already been run');
      return;
    }
    if(fs.existsSync(process.cwd() + '/' + this.appname)) {
      this.log('The generator has already been run.  CD into the directory');
      return;
    }
    cb();
  },
  clientPrompts: function() {
    var cb = this.async();

    this.prompt([{
        type: "list",
        name: "script",
        message: "What would you like to write scripts with?",
        choices: [ "JavaScript", "CoffeeScript"],
        default: 1,
        filter: function( val ) {
          var filterMap = {
            'JavaScript': 'js',
            'CoffeeScript': 'coffee'
          };

          return filterMap[val];
        }
      }, {
        type: "list",
        name: "markup",
        message: "What would you like to write markup with?",
        default: 1,
        choices: [ "HTML", "Jade"],
        filter: function( val ) { return val.toLowerCase(); }
      }, {
        type: "list",
        name: "stylesheet",
        default: 1,
        message: "What would you like to write stylesheets with?",
        choices: [ "CSS", "Stylus"],
        filter: function( val ) { return val.toLowerCase(); }
      }, {
        type: "confirm",
        name: "pagination",
        message: "Would you like pagination, sorting and searching support?"
      }, {
        type: "confirm",
        name: "material",
        message: "Would you like to include Angular Material?"
      }, {
        type: "confirm",
        name: "bower",
        message: "Would you like to include Bower package management support?"
      }], function (answers) {
        this.filters = {};
        this.filters[answers.script] = true;
        this.filters[answers.markup] = true;
        this.filters[answers.stylesheet] = true;
        this.filters.pagination = !!answers.pagination;
        this.filters.material = !!answers.material;
        this.filters.bower = !!answers.bower;
      cb();
      }.bind(this));
  },
  authPrompts: function() {
    var cb = this.async();
    var self = this;

    this.prompt([{
      type: "confirm",
      name: "auth",
      message: "Would you like to use user authentication?"
    }, {
      type: 'checkbox',
      name: 'oauth',
      message: 'Would you like to include additional oAuth strategies?',
      when: function (answers) {
        return answers.auth;
      },
      choices: [
        {
          value: 'googleAuth',
          name: 'Google',
          checked: false
        },
        {
          value: 'facebookAuth',
          name: 'Facebook',
          checked: false
        },
        {
          value: 'twitterAuth',
          name: 'Twitter',
          checked: false
        }
      ]
    }], function (answers) { 
      this.filters.auth = !!answers.auth;
      if(answers.oauth) {
        if(answers.oauth.length) this.filters.oauth = true;
        answers.oauth.forEach(function(oauthStrategy) {
          this.filters[oauthStrategy] = true;
        }.bind(this));
      }

      cb();
    }.bind(this));
  },
  createMeteorProject: function() {
    var cb = this.async();
    genUtils.spawnSync('meteor', ['create', this.appname], cb);
  },
  changeDirectory: function() {
    var cb = this.async();
    if(!fs.existsSync(process.cwd() + '/' + this.appname)) {
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
    var cb = this.async();
    ['.html','.css','.js'].forEach(function(ext) {
      fs.unlinkSync(process.cwd() + '/' + this.appname + ext);
    }.bind(this));
    cb();
  },
  removeMeteorPackages: function() {
    var cb = this.async();
    if(this.filters.auth) {
      meteorToRemove.push('insecure');
    }
    if(this.filters.pagination) {
      meteorToRemove.push('autopublish');
    }
    var index = 0;
    var removePackage = function() {
      if(index < meteorToRemove.length ) {
        genUtils.spawnSync('meteor', ['remove', meteorToRemove[index++]], removePackage);
      }
      else {
        cb(); 
      }
    };
    removePackage();
  },
  loadMeteorPackages: function() {
    var cb = this.async();
    var index = 0;
    if(this.filters.coffee) {
      meteorToAdd.push('coffeescript'); 
    }
    if(this.filters.stylus) {
      meteorToAdd.push('mquandalle:stylus');
    }
    if(this.filters.jade) {
      meteorToAdd.push('civilframe:angular-jade'); 
    }
    if(this.filters.material) {
      meteorToAdd.push('angular:angular-material'); 
      angularModules.push('ngMaterial');
    }
    if(this.filters.bower) {
      meteorToAdd.push('mquandalle:bower'); 
    }
    if(this.filters.pagination) {
      meteorToAdd.push('tmeasday:publish-counts');
      meteorToAdd.push('aldeed:collection2');
      meteorToAdd.push('angularutils:pagination'); 
      angularModules.push('angularUtils.directives.dirPagination');
    }
    if(this.filters.auth) {
      meteorToAdd.push('accounts-password');
      meteorToAdd.push('accounts-ui');
    }
    if(this.filters.twitterAuth) {
      meteorToAdd.push('accounts-twitter'); 
    }
    if(this.filters.facebookAuth) {
      meteorToAdd.push('accounts-facebook'); 
    }
    if(this.filters.googleAuth) {
      meteorToAdd.push('accounts-google'); 
    }
    var loadPackage = function() {
      if(index < meteorToAdd.length ) {
        genUtils.spawnSync('meteor', ['add', meteorToAdd[index++]], loadPackage);
      }
      else {
        cb(); 
      }
    };
    loadPackage();
  },
  write: function() {
    this.filters.appname = this.appname + 'App';
    this.filters.projectname = this.config.get('appname');
    this.filters.modules = '\'' + (this.filters.js ? angularModules.join('\',\n  \'') : angularModules.join('\'\n  \'')) + '\'';
    this.sourceRoot(path.join(__dirname, './templates'));
    genUtils.write(this, this.filters);
  },
  launchMeteor: function() {
    if(!this.dontrun) {
      this.spawnCommand('meteor', null, null); 
    }
  }
});