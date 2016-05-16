yeoman = require('yeoman-generator')
fs = require('fs')
path = require('path')
_ = require('underscore.string')
_i = require('underscore.inflection')
genUtils = require('../util.js')
meteorToAdd = [
  'angular'
  'angularui:angular-ui-router'
  'urigo:angular-blaze-template'
]
meteorToRemove = []
angularModules = [
  'angular-meteor'
  'ui.router'
]
module.exports = yeoman.generators.Base.extend(
  init: ->
    return
  info: ->
    @log @yeoman
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
  clientPrompts: ->
    cb = @async()
    @prompt [
      {
        type: 'text'
        name: 'appname'
        message: 'Please enter your app\'s name'
      }
      {
        type: 'list'
        name: 'script'
        message: 'What are you writing scripts with?'
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
        message: 'What are you writing markup with?'
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
        message: 'What are you writing stylesheets with?'
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
      @filters.appname = answers.appname
      @filters.projectname = answers.appname
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
  removeMeteorPackages: ->
    cb = @async()
    if @filters.auth
      meteorToRemove.push 'insecure'
    if @filters.pagination
      meteorToRemove.push 'autopublish'
    index = 0

    removePackage = ->
      if index < meteorToRemove.length
        genUtils.spawnSync 'meteor', [
          'remove'
          meteorToRemove[index++]
        ], removePackage
      else
        cb()
      return

    removePackage()
    return
  loadMeteorPackages: ->
    cb = @async()
    index = 0
    if @filters.coffee
      meteorToAdd.push 'coffeescript'
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
      meteorToAdd.push 'accounts-ui'
    if @filters.twitterAuth
      meteorToAdd.push 'accounts-twitter'
    if @filters.facebookAuth
      meteorToAdd.push 'accounts-facebook'
    if @filters.googleAuth
      meteorToAdd.push 'accounts-google'

    loadPackage = ->
      if index < meteorToAdd.length
        genUtils.spawnSync 'meteor', [
          'add'
          meteorToAdd[index++]
        ], loadPackage
      else
        cb()
      return

    loadPackage()
    return
  write: ->
    @filters.modules = '\'' + (if @filters.js then angularModules.join('\',\n  \'') else angularModules.join('\'\n  \'')) + '\''
    @sourceRoot path.join(__dirname, './templates')
    genUtils.write this, @filters
    return
  launchMeteor: ->
    if !@dontrun
      @spawnCommand 'meteor', null, null
    return
)