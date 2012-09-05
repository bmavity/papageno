#!/usr/bin/env node

var path = require('path')
	, cwd = process.cwd()
	, argv = require('optimist').argv

require('../lib')

var resolveFilePath = function(filePathSegment) {
	console.log(path.join(cwd, filePathSegment))
	return path.join(cwd, filePathSegment)
}

argv._.map(resolveFilePath).map(require)