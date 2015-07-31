'use strict'
helpers = require('yeoman-generator').test

module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  grunt.initConfig
    watch:
      coffee:
        files: ['src/**/*.coffee', 'test/**/*.coffee', 'Gruntfile.coffee']
        tasks: ['coffeelint', 'newer:coffee']
    coffee:
      options:
        sourceMap: false
        sourceRoot: ''
      server:
        files: [{
          expand: true
          cwd: 'src/'
          src: ['**/*.coffee']
          dest: 'generators'
          ext: '.js'
        }, {
          expand: true
          cwd: 'test/'
          src: ['**/*test.coffee']
          dest: 'test'
          ext: '.js'
        }]
    jshint:
      options: 
        node: true
        sub: true
      all: [
        'Gruntfile.js'
        'generators/**/index.js'
      ]
    coffeelint:
      all:
        files:
          src: [
            'src/**/*.coffee'
            'Gruntfile.coffee'
            'test/**/*.coffee'
          ]
        options:
          'no_trailing_whitespace': level: 'ignore'
          'max_line_length': level: 'ignore'
    mochaTest: test:
      src: [ 'test/*.js' ]
      options:
        reporter: 'spec'
        timeout: 120000
    clean: test: files: [ {
      dot: true
      src: ['test/temp']
    } ]
  grunt.registerTask 'test', [
    'clean:test'
    'mochaTest'
  ]
  grunt.registerTask 'build', [
    'coffee'
    'test'
  ]
  grunt.registerTask 'default', [
    'watch'
  ]
