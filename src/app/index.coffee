yeoman = require('yeoman-generator')
fs = require('fs')
path = require('path')
_ = require('underscore.string')
_i = require('underscore.inflection')
os = require('os')
genUtils = require('../util.js')
meteorToAdd = [
  'add'
  'angular'
  'angularui:angular-ui-router'
]
meteorToRemove = [
  'remove'
  'blaze-html-templates'
  'ecmascript'
]
angularModules = [
  'angular-meteor'
  'ui.router'
]
module.exports = yeoman.generators.Base.extend(
  init: ->
    @argument 'name',
      type: String
      required: true
    @argument 'dontrun',
      type: String
      required: false
    @appname = @name or path.basename(process.cwd())
    @appname = _.camelize(_.slugify(_.humanize(@appname)))
    #console.log(this.spawnCommand);
    return
  info: ->
    #this.log(this.yeoman);
    return
  checkForConfig: ->
    cb = @async()
    if @config.get('filters')
      @log 'The generator has already been run'
      return
    if fs.existsSync(process.cwd() + '/' + @appname)
      @log 'The generator has already been run.  CD into the directory'
      return
    cb()
    return
  windowsXCheck: ->
    cb = @async()
    if os.platform().indexOf('win') isnt -1 and os.release().indexOf('10') is 0
      @prompt [
        {
          type: 'input'
          name: 'hmmmm'
          message: 'Hit Enter to get started'
        }
      ], (() ->
        cb()
        return
      ).bind(this)
    else
      cb()
    return
  clientPrompts: ->
    cb = @async()
    @prompt [
      {
        type: 'list'
        name: 'script'
        message: 'What would you like to write scripts with?'
        choices: [
          'JavaScript'
          'CoffeeScript'
        ]
        default: 1
        filter: (val) ->
          filterMap = 
            'JavaScript': 'js'
            'CoffeeScript': 'coffee'
          filterMap[val]

      }
      {
        type: 'list'
        name: 'markup'
        message: 'What would you like to write markup with?'
        default: 1
        choices: [
          'HTML'
          'Jade'
        ]
        filter: (val) ->
          val.toLowerCase()

      }
      {
        type: 'list'
        name: 'stylesheet'
        default: 1
        message: 'What would you like to write stylesheets with?'
        choices: [
          'CSS'
          'Stylus'
          'Less'
          'SCSS'
        ]
        filter: (val) ->
          val.toLowerCase()

      }
      {
        type: 'confirm'
        name: 'pagination'
        message: 'Would you like pagination, sorting and searching support?'
      }
      {
        type: 'list'
        name: 'framework'
        message: 'Select a CSS framework'
        default: 1
        choices: [
          'None'
          'Bootstrap'
          'Angular Material'
          'Ionic'
        ]
        filter: (val) ->
          filterMap = 
            'None': 'none'
            'Angular Material': 'material'
            'Bootstrap': 'bootstrap'
            'PureCSS': 'purecss'
            'Foundation for Apps': 'foundationapps'
            'Ionic': 'ionic'
          filterMap[val]
      }
    ], ((answers) ->
      @filters = {}
      @filters[answers.script] = true
      @filters[answers.markup] = true
      @filters[answers.stylesheet] = true
      @filters.pagination = ! !answers.pagination
      @filters.framework = answers.framework
      cb()
      return
    ).bind(this)
    return
  authPrompts: ->
    cb = @async()
    self = this
    @prompt [
      {
        type: 'confirm'
        name: 'auth'
        message: 'Would you like to use user authentication?'
      }
      {
        type: 'checkbox'
        name: 'oauth'
        message: 'Would you like to include additional oAuth strategies?'
        when: (answers) ->
          answers.auth
        choices: [
          {
            value: 'googleAuth'
            name: 'Google'
            checked: false
          }
          {
            value: 'facebookAuth'
            name: 'Facebook'
            checked: false
          }
          {
            value: 'twitterAuth'
            name: 'Twitter'
            checked: false
          }
        ]
      }
    ], ((answers) ->
      @filters.auth = ! !answers.auth
      if answers.oauth
        if answers.oauth.length
          @filters.oauth = true
        answers.oauth.forEach ((oauthStrategy) ->
          @filters[oauthStrategy] = true
          return
        ).bind(this)
      cb()
      return
    ).bind(this)
    return
  createMeteorProject: ->
    cb = @async()
    genUtils.spawnSync 'meteor', [
      '--release'
      '1.2.1'
      'create'
      @appname
    ], cb
    return
  changeDirectory: ->
    cb = @async()
    if !fs.existsSync(process.cwd() + '/' + @appname)
      @log 'Something went wrong running meteor, please make sure you have it installed properly.  https://www.meteor.com/'
      return
    process.chdir process.cwd() + '/' + @appname
    @destinationRoot process.cwd()
    @config.set 'filters', @filters
    @config.set 'appname', @appname
    cb()
    return
  cleanMeteorDirectory: ->
    cb = @async()
    [
      '.html'
      '.css'
      '.js'
    ].forEach ((ext) ->
      try
        fs.unlinkSync process.cwd() + '/' + @appname + ext
      return
    ).bind(this)
    #meteor 1.3
    [
      'client/main.html'
      'client/main.css'
      'client/main.js'
      'server/main.js'
    ].forEach ((ext) ->
      try
        fs.unlinkSync process.cwd() + '/' + @appname + ext
      return
    ).bind(this)
    cb()
    return
  removeMeteorPackages: ->
    cb = @async()
    if @filters.auth
      meteorToRemove.push 'insecure'
    if @filters.pagination
      meteorToRemove.push 'autopublish'
    if meteorToRemove.length > 1
      genUtils.spawnSync 'meteor', meteorToRemove, cb
    else
      cb()
    return
  loadMeteorPackages: ->
    cb = @async()
    if @filters.coffee
      meteorToAdd.push 'ndxbxrme:ng-coffeescript'
    if @filters.stylus
      meteorToAdd.push 'mquandalle:stylus'
    if @filters.less
      meteorToAdd.push 'flemay:less-autoprefixer'
    if @filters.scss
      meteorToAdd.push 'fourseven:scss'
    if @filters.jade
      meteorToAdd.push 'civilframe:angular-jade'
    if @filters.framework is 'material'
      meteorToAdd.push 'angular:angular-material'
      angularModules.push 'ngMaterial'
    if @filters.framework is 'bootstrap'
      meteorToAdd.push 'twbs:bootstrap'
      meteorToAdd.push 'angularui:angular-ui-bootstrap'
      angularModules.push 'ui.bootstrap'
    if @filters.framework is 'purecss'
      meteorToAdd.push 'mrt:purecss'
    if @filters.framework is 'foundationapps'
      meteorToAdd.push 'rainhaven:foundation-apps'
    if @filters.framework is 'ionic'
      meteorToAdd.splice meteorToAdd.indexOf('angularui:angular-ui-router'), 1
      meteorToAdd.push 'driftyco:ionic'
      angularModules.splice angularModules.indexOf('ui-router'), 1
      angularModules.push 'ionic'
    if @filters.pagination
      meteorToAdd.push 'tmeasday:publish-counts'
      meteorToAdd.push 'angularutils:pagination'
      angularModules.push 'angularUtils.directives.dirPagination'
    if @filters.auth
      meteorToAdd.push 'accounts-password'
      meteorToAdd.push 'dotansimha:accounts-ui-angular'
      angularModules.push 'accounts.ui'
    if @filters.twitterAuth
      meteorToAdd.push 'accounts-twitter'
    if @filters.facebookAuth
      meteorToAdd.push 'accounts-facebook'
    if @filters.googleAuth
      meteorToAdd.push 'accounts-google'
    genUtils.spawnSync 'meteor', meteorToAdd, cb
    return
  write: ->
    @filters.appname = @appname + 'App'
    @filters.projectname = @config.get('appname')
    @filters.modules = '\'' + (if @filters.js then angularModules.join('\',\n  \'') else angularModules.join('\'\n  \'')) + '\''
    @config.set 'filters', @filters
    @sourceRoot path.join(__dirname, './templates/' + @filters.framework)
    genUtils.write this, @filters
    return
  launchMeteor: ->
    if !@dontrun
      @spawnCommand 'meteor', null, null
    return
)
