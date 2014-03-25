# grunt-jstransform

> Grunt task for transpiling ES6 --> ES5 using [Facebook's jstransform](https://github.com/facebook/jstransform)

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jstransform --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jstransform');
```

## The "jstransform" task

### Overview
In your project's Gruntfile, add a section named `jstransform` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jstransform: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.visitors
Type: `Array`
Default value: `[]`

A list of visitors to apply when transpiling.

### Usage Examples

#### Default Options
In this example, the javascript written in ES6 will transpile classes, arrow funciton, and object short notation down to ES5 code.

```js
grunt.initConfig({
  jstransform: {
    options: {
      visitors: ['class', 'arrow-function', 'object-short-notation']
    },
    files: {
      'dest/app.js': ['src/app.js']
    },
  }
});
```

This plugin supports all visitors exposed by [jstransform](https://github.com/facebook/jstransform) which are:

- class (declaration, expressions, extends, method, super)
- arrow functions
- object short notation
- rest params
- templates

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
