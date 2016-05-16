
/*global describe, beforeEach, it */

(function() {
  'use strict';
  var chai, exec, expect, fs, helpers, path;

  path = require('path');

  helpers = require('yeoman-generator').test;

  chai = require('chai');

  expect = chai.expect;

  fs = require('fs-extra');

  exec = require('child_process').exec;

  describe('angular-meteor generator', function() {
    var defaultOptions, gen, generatorTest;
    gen = void 0;
    defaultOptions = {
      script: 'coffee',
      markup: 'jade',
      stylesheet: 'stylus',
      material: true,
      auth: true,
      oauth: []
    };
    generatorTest = function(generatorType, name, mockPrompt, callback) {
      return gen.run({}, function() {
        var amGenerator, deps;
        amGenerator = void 0;
        deps = [path.join('../../generators', generatorType)];
        amGenerator = helpers.createGenerator('angular-meteor:' + generatorType, deps, [name]);
        helpers.mockPrompt(amGenerator, mockPrompt);
        return amGenerator.run([], function() {
          return callback();
        });
      });
    };
    beforeEach(function(done) {
      var deps;
      this.timeout(10000);
      deps = ['../../generators/app'];
      return helpers.testDirectory(path.join(__dirname, 'temp'), (function(err) {
        if (err) {
          return done(err);
        }
        gen = helpers.createGenerator('angular-meteor:app', deps, ['test', 'dontrun']);
        return done();
      }).bind(this));
    });
    return describe('running app', function() {
      return describe('with default options', function() {
        beforeEach(function() {
          return helpers.mockPrompt(gen, defaultOptions);
        });
        it('should run happily', function(done) {
          this.timeout(60000);
          return gen.run(function() {
            return done();
          });
        });
        it('should pass jshint', function(done) {
          return exec('grunt jshint', function(error, stdout, stderr) {
            expect(stdout).to.contain('Done, without errors.');
            return done();
          });
        });
        return it('should pass coffeelint', function(done) {
          return exec('grunt coffeelint', function(error, stdout, stderr) {
            expect(stdout).to.contain('Done, without errors.');
            return done();
          });
        });
      });
    });
  });

}).call(this);
