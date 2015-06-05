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
      @filters.compnameSluggedSingular = _i.singularize(@filters.compnameSlugged)
      @filters.compnameCapped = _.capitalize(@filters.compname)
      @filters.compnameCappedSingular = _i.singularize(@filters.compnameCapped)
    else
      @log 'Cannot find the config file (.yo-rc.json)'
      return
    cb()
    return
  write: ->
    @sourceRoot path.join(__dirname, './templates')
    @dir = 'methods'
    @destinationRoot path.join(process.cwd(), @dir)
    genUtils.write this, @filters
    return
)
