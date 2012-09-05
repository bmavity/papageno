;(function(module) { var exports = module.exports, define = module.define
	define(function(loader, runner) {
		loader.onSpec(runner.run)
		exports.subject = loader.subject
	})
})(new Module)