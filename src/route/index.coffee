yeoman = require('yeoman-generator')
fs = require('fs')
path = require('path')
_ = require('underscore.string')
_i = require('underscore.inflection')
genUtils = require('../util.js')
module.exports = yeoman.generators.Base.extend(
  init: ->
    @argument 'compname',
      type: String
      required: false
    @compname = _.decapitalize(_.camelize(@compname))
    return
  info: ->
    #this.log(this.yeoman);
    return
  checkForConfig: ->
    cb = @async()
    if @config.get('filters')
      @filters = @config.get('filters')
      @filters.appname = @config.get('appname') + 'App'
      @filters.projectname = @config.get('appname')
      @filters.compname = _.camelize(@compname)
      @filters.compnameSingular = _i.singularize(@compname)
      @filters.compnameSlugged = _.dasherize(@compname)
      @filters.compnameSluggedSingular = _i.singularize(@filters.compnameSlugged)
      @filters.compnameCapped = _.capitalize(@filters.compname)
      @filters.compnameCappedSingular = _i.singularize(@filters.compnameCapped)
      if @filters.compname == @filters.compnameSingular
        @log 'If you are planning to create a model or list/detail views it is recommended you use a plural route name'
    else
      @log 'Cannot find the config file (.yo-rc.json)'
      return
    cb()
    return
  askFor: ->
    cb = @async()
    @prompt [
      {
        name: 'dir'
        message: 'Where would you like to create this route?'
        default: '/client'
      }
      {
        type: 'confirm'
        name: 'protected'
        message: 'Is this a protected route?'
        default: false
        when: (->
          @filters.auth
        ).bind(this)
      }
      {
        type: 'confirm'
        name: 'complex'
        message: 'Would you like to make List/Details routes?'
        default: true
      }
      {
        type: 'confirm'
        name: 'model'
        message: 'Would you like to create a Model?'
        default: true
        when: (answers) ->
          !answers.complex

      }
    ], ((answers) ->
      @filters.dir = answers.dir.replace(/\/$/, '').replace(/^\//, '')
      @filters.complex = ! !answers.complex
      @filters.model = ! !answers.model
      if @filters.complex
        @filters.model = true
      @filters.protected = ! !answers.protected
      cb()
      return
    ).bind(this)
    return
  write: ->
    @sourceRoot path.join(__dirname, './templates/' + (@filters.framework or 'none') + '/client/' + (if @filters.complex then 'complex' else 'simple'))
    @filters.dir = @filters.dir + '/' + @filters.compnameSlugged
    baseDir = path.join(process.cwd(), '')
    @destinationRoot path.join(process.cwd(), @filters.dir)
    genUtils.write this, @filters, (->
      if @filters.model
        @sourceRoot path.join(__dirname, '../model/templates')
        @destinationRoot baseDir
        genUtils.write this, @filters
      return
    ).bind(this)
    return
)