'use strict';

var grunt = require('grunt');

exports.jstransform = {
  setUp: function(done) {
    done();
  },
  parentClass: function(test) {
    test.expect(1);
    var actual = grunt.file.read('tmp/parentClass.js');
    var expected = grunt.file.read('test/expected/parentClass.js');
    test.equal(actual, expected, 'should transpile class to ES5.');

    test.done();
  },
  childClass: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/childClass.js');
    var expected = grunt.file.read('test/expected/childClass.js');
    test.equal(actual, expected, 'should transpile child class to ES5');

    test.done();
  },
  arrowFunctions: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/arrowFunction.js');
    var expected = grunt.file.read('test/expected/arrowFunction.js');
    test.equal(actual, expected, 'should transpile child arrow functions to ES5');

    test.done();
  }
};
