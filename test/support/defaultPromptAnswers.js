'use strict';

const path = require('path');
const localConfig = require('./getLocalConfig');
const validatePrompts = require('../../generators/app/validatePrompts')
const assert = require('yeoman-assert');

const promptOptions = require("../../generators/app/promptOptions")

const yfilesPath = localConfig.yfilesPath
const licensePath = path.resolve(yfilesPath, 'lib/license.json')
const answers = {
  "applicationName": "testApp",
  "yfilesPath": localConfig.yfilesPath,
  "licensePath": path.resolve(localConfig.yfilesPath, 'lib/license.json'),
  "moduleType": promptOptions.moduleType.UMD,
  "buildTool": promptOptions.buildTool.NONE,
  "buildChain": promptOptions.buildChain.YARN,
  "modules": [
    "layout-hierarchic",
    "view-component",
    "view-editor",
    "view-layout-bridge"
  ],
  "language": promptOptions.language.ES6,
  "advancedOptions": []
};

describe('Validate Prompts', function () {
  it('is a valid yFiles package', function () {
    const validatePackageResult = validatePrompts.isValidYfilesPackage(yfilesPath)
    assert((typeof validatePackageResult) !== "string", validatePackageResult)
  })
  it('is a valid license', function () {
    const validateLicenseResult = validatePrompts.isValidYfilesLicense(licensePath)
    assert((typeof validateLicenseResult) !== "string", validateLicenseResult)
  })
  /*it('runs in some directory', function(done){
    console.log("this dir" + this.dir);
    assert(this.dir);
    done();
  })*/
})

module.exports = answers;
