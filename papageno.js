var path = require('path')
	, url = require('url')
	, fs = require('fs')
	, commands = {}
	, queries = {}
	, resources = {}
	, resourceArr = []

function command(file) {
	
}

function query(name, handler, schema) {
	
}

function isJsFile(file) {
	return path.extname(file) === '.js'
}

function removeExtension(file) {
	return path.basename(file, path.extname(file))
}

function papageno(basePath) {
	function isDir(file) {
		return fs.statSync(path.resolve(basePath, file)).isDirectory()
	}

	function registerResource(resourceName) {
		var resourceDir = path.resolve(basePath, resourceName)
			, resourcePath = url.resolve('/', resourceName)
			, resource = resources[resourceName] = resources[resourceName] || {}

		function registerAction(actionFilename) {
			var actionFile = path.resolve(resourceDir, actionFilename)
				, actionName = removeExtension(actionFilename)
				, isDefault = actionName === resourceName
				, actionPath = isDefault ? resourcePath : url.resolve(resourcePath + '/', actionName)
				, resourceAction = {
						name: actionName
					, id: resourceName + (isDefault ? '' : '.' + actionName)
					, file: actionFile
					, path: actionPath
					, handler: require(actionFile)
					}
			resource[actionName] = resourceAction
			resourceArr.push(resourceAction)
		}

		fs.readdirSync(resourceDir)
			.filter(isJsFile)
			.forEach(registerAction)
	}

	fs.readdirSync(basePath)
		.filter(isDir)
		.forEach(registerResource)
	return resourceArr
}


module.exports = papageno