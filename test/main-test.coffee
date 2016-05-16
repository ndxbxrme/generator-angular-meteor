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
    auth: true
    oauth: []

  generatorTest = (generatorType, name, mockPrompt, callback) ->
    gen.run {}, ->
      amGenerator = undefined
      deps = [ path.join('../../generators', generatorType) ]
      amGenerator = helpers.createGenerator('angular-meteor:' + generatorType, deps, [ name ])
      helpers.mockPrompt amGenerator, mockPrompt
      amGenerator.run [], ->
        callback()

  beforeEach (done) ->
    @timeout 10000
    deps = [ '../../generators/app' ]
    helpers.testDirectory path.join(__dirname, 'temp'), ((err) ->
      if err
        return done(err)
      gen = helpers.createGenerator('angular-meteor:app', deps, [
        'test'
        'dontrun'
      ])
      done()
    ).bind(this)
  describe 'running app', ->
    describe 'with default options', ->
      beforeEach ->
        helpers.mockPrompt gen, defaultOptions
      it 'should run happily', (done) ->
        @timeout 60000
        gen.run ->
          done()
      it 'should pass jshint', (done) ->
        exec 'grunt jshint', (error, stdout, stderr) ->
          expect(stdout).to.contain 'Done, without errors.'
          done()
      it 'should pass coffeelint', (done) ->
        exec 'grunt coffeelint', (error, stdout, stderr) ->
          expect(stdout).to.contain 'Done, without errors.'
          done()
