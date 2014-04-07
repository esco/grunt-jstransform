/*
 * grunt-jstransform
 * https://github.com/heftybyte/grunt-jstransform
 *
 * Copyright (c) 2014 Esco Obong
 * Licensed under the MIT license.
 */

'use strict';

var jstransform = require('jstransform');
var util = require('util');
var chalk = require('chalk');
var _ = require('highland');


module.exports = function(grunt) {

  grunt.registerMultiTask('jstransform', 'Grunt task for transpiling ES6 --> ES5 using Facebook\'s jstransform', function() {
    var done = this.async();
    var options = this.options({ separator: ';', visitors: [] });
    var visitors = options.visitors.reduce(function(prev, current){
      var list = getVisitorList(current);
      return prev.concat(list);
    }, []);
    var _transpile = _.curry(transpile, visitors);
    var doneCount = 0;
    var numFiles = this.files.length;

    this.files.forEach(function(fileData){
      _(fileData.orig.src)
        .map(checkExist)
        .map(grunt.file.read)
        .map(_transpile)
        .toArray(function(transpiled){
          var output = transpiled.join(grunt.util.normalizelf(options.separator));
          grunt.file.write(fileData.dest, output);
          grunt.log.writeln('File ' + chalk.cyan(fileData.dest) + ' created.');
          if (++doneCount === numFiles) {
            done();
          }
        });
    });
  });

  function checkExist(filepath) {
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
    }
    return filepath;
  }

  function transpile(visitors, source){
    var transformedFileData = jstransform.transform(visitors, source);
    return transformedFileData.code;
  }

  function getVisitorList(visitorType) {
    var modulePath = util.format('jstransform/visitors/es6-%s-visitors', visitorType);
    var visitorModule = require(modulePath);
    var visitors = null;

    if (!visitorModule) {
      grunt.fail.warn('module "' + module +'" doesn\'t exist');
    } else if(!visitorModule.visitorList || !visitorModule.visitorList.length) {
      grunt.fail.warn('module "' + module +'" has no visitors');
    } else {
      visitors = visitorModule.visitorList;
    }

    return visitors;
  }
};