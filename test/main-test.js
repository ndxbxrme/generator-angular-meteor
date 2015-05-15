/*global describe, beforeEach, it*/
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var chai = require('chai');
var expect = chai.expect;
var fs = require('fs-extra');
var exec = require('child_process').exec;

describe('angular-meteor generator', function() {
  var gen, defaultOptions = {
    script: 'coffee',
    markup: 'jade',
    stylesheet: 'stylus',
    material: true,
    bower: true,
    auth: true,
    oauth: []
  };
  
  function generatorTest(generatorType, name, mockPrompt, callback) {
    gen.run({}, function() {
      var amGenerator;
      var deps = [path.join('../..', generatorType)];
      amGenerator = helpers.createGenerator('angular-meteor:' + generatorType, deps, [name]);
      helpers.mockPrompt(amGenerator, mockPrompt);
      amGenerator.run([], function() {
        callback();
      });
    });
  }
  
  beforeEach(function(done) {
    this.timeout(10000);
    var deps = [
      '../../app'
    ];
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if(err) {
        return done(err); 
      }
      gen = helpers.createGenerator('angular-meteor:app', deps, ['test', 'dontrun']);
      done();
    }.bind(this));
  });
  
  describe('running app', function() {    
    describe('with default options', function() {
      beforeEach(function() {
        helpers.mockPrompt(gen, defaultOptions);
      });
      
      it('should run happily', function(done) {
        this.timeout(60000);
        gen.run(function() {
          done();
        });
      });
      
      it('should pass jshint', function(done) {
        exec('grunt jshint', function(error, stdout, stderr) {
          expect(stdout).to.contain('Done, without errors.');
          done();
        });
      });
    });
  });
});