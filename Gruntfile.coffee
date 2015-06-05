'use strict'
helpers = require('yeoman-generator').test

module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  grunt.initConfig
    jshint:
      options: node: true
      all: [
        'Gruntfile.js'
        '*/index.js'
      ]
    mochaTest: test:
      src: [ 'test/*.js' ]
      options:
        reporter: 'spec'
        timeout: 120000
    clean: test: files: [ {
      dot: true
      src: [ 'test/temp' ]
    } ]
  grunt.registerTask 'test', [
    'clean:test'
    'mochaTest'
  ]
  return
