;(function(module) { var exports = module.exports, define = module.define
	define(function() {
		var matchers = {}

		var addMatcher = function(name, fn) {
			matchers[name] = fn
		}

		var forEach = function(cb) {
			return Object.keys(matchers).forEach(function(key) {
				cb(matchers[key], key)
			})
		}

		addMatcher('be null', function() {
			return this === null
		})

		exports.addMatcher = addMatcher
		exports.forEach = forEach
	})
})(new Module)