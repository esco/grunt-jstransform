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
var async = require('async');


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('jstransform', 'Grunt task for transpiling ES6 --> ES5 using Facebook\'s jstransform', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var visitors = [];
    var options = this.options({
      separator: ';'
    });

    visitors = options.visitors.reduce(function(prev, current){
      var list = getVisitorList(current);
      return prev.concat(list);
    }, []);

    console.log('visitors --->', visitors);
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var originalFile = grunt.file.read(filepath);
        var transformedFileData = jstransform.transform(
          visitors,
          originalFile
        );
        return transformedFileData.code;
      }).join(grunt.util.normalizelf(options.separator));

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

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
