'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.jstransform = {
  setUp: function(done) {
    // setup here if necessary
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
