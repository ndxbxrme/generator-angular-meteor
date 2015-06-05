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
      required: true
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
        @log 'It is recommended to use a plural model name'
    else
      @log 'Cannot find the config file (.yo-rc.json)'
      return
    cb()
    return
  askFor: ->
    cb = @async()
    @prompt [ {
      type: 'confirm'
      name: 'protected'
      message: 'Is this a protected model?'
      default: true
      when: (->
        @filters.auth
      ).bind(this)
    } ], ((answers) ->
      @filters.protected = answers.protected
      cb()
      return
    ).bind(this)
    return
  write: ->
    @sourceRoot path.join(__dirname, './templates')
    @dir = ''
    @destinationRoot path.join(process.cwd(), @dir)
    genUtils.write this, @filters
    return
)