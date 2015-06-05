###global describe, beforeEach, it###

'use strict'
path = require('path')
helpers = require('yeoman-generator').test
chai = require('chai')
expect = chai.expect
fs = require('fs-extra')
exec = require('child_process').exec
describe 'angular-meteor generator', ->
  gen = undefined
  defaultOptions = 
    script: 'coffee'
    markup: 'jade'
    stylesheet: 'stylus'
    material: true
    bower: true
    auth: true
    oauth: []

  generatorTest = (generatorType, name, mockPrompt, callback) ->
    gen.run {}, ->
      amGenerator = undefined
      deps = [ path.join('../..', generatorType) ]
      amGenerator = helpers.createGenerator('angular-meteor:' + generatorType, deps, [ name ])
      helpers.mockPrompt amGenerator, mockPrompt
      amGenerator.run [], ->
        callback()
        return
      return
    return

  beforeEach (done) ->
    @timeout 10000
    deps = [ '../../app' ]
    helpers.testDirectory path.join(__dirname, 'temp'), ((err) ->
      if err
        return done(err)
      gen = helpers.createGenerator('angular-meteor:app', deps, [
        'test'
        'dontrun'
      ])
      done()
      return
    ).bind(this)
    return
  describe 'running app', ->
    describe 'with default options', ->
      beforeEach ->
        helpers.mockPrompt gen, defaultOptions
        return
      it 'should run happily', (done) ->
        @timeout 60000
        gen.run ->
          done()
          return
        return
      it 'should pass jshint', (done) ->
        exec 'grunt jshint', (error, stdout, stderr) ->
          expect(stdout).to.contain 'Done, without errors.'
          done()
          return
        return
      return
    return
  return