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
    @compname = _.slugify(_.humanize(@compname))
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
      @filters.compnameSlugged = @compname
      @filters.compnameCapped = _.capitalize(@filters.compname)
    else
      @log 'Cannot find the config file (.yo-rc.json)'
      return
    cb()
    return
  askFor: ->
    cb = @async()
    @prompt [ {
      name: 'dir'
      message: 'Where would you like to create this controller?'
      default: '/client/components'
    } ], ((answers) ->
      @dir = answers.dir.replace(/\/$/, '')
      cb()
      return
    ).bind(this)
    return
  write: ->
    @sourceRoot path.join(__dirname, './templates')
    @dir = @dir + '/' + @compname
    @destinationRoot path.join(process.cwd(), @dir)
    genUtils.write this, @filters
    return
)