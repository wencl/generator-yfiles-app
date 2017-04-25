'use strict';

var path = require('path');
var fs = require('fs');
var chalk = require("chalk");
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');
var opn = require('opn');

var openIndexInBrowser = !!process.env.OPEN_IN_BROWSER;

var localConfig = require('./getLocalConfig');

var answers = {
  "applicationName":"testApp",
  "module":"testModule",
  "yfilesPath": localConfig.yfilesPath,
  "licensePath": path.resolve(localConfig.yfilesPath,'demos/resources/license.js'),
  "buildTool":"Grunt + Webpack",
  "modules":["yfiles/complete"],
  "advancedOptions":[]
};

describe('yfiles:webpack', function () {

  this.timeout(35000);

  before(function(done) {
    var that = this;
    this.app = helpers
      .run(require.resolve('../generators/app'))
      .withGenerators([[helpers.createDummyGenerator(),require.resolve('../generators/class')]])
      .withOptions({
        'skip-welcome-message': true,
        'skip-message': true,
        'skip-install': false
      })
      .withPrompts(answers).then(function(dir) {
        that.dir = dir;
        done();
      })
  });

  describe('check files', function() {
    it('generates base files', function () {
      assert.file([
        'app/index.html',
        'app/scripts/app.js',
        'app/styles/yfiles.css',
        'Gruntfile.js',
        'package.json',
        'webpack.config.js'
      ]);
      assert.noFile([
        'app/scripts/license.js'
      ]);
    });

  });

  describe('build result', function() {
    it('runs', function (done) {
      var dir = this.dir;
      if (openIndexInBrowser) {
        var indexHtml = path.resolve(dir, 'app/index.html');
        opn(indexHtml).then(function (childProcess) {
          done();
        }, function (err) {
          console.log(err);
          done();
        })
      } else {
        done();
      }
    });
  });

});
