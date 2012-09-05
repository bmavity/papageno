;(function(module) { var exports = module.exports, define = module.define
	define(function() {
		var onSpecCb

		var onSpec = function(cb) {
			onSpecCb = cb
		}

		var subject = function(name, specs) {
			var observations = []
				, contextObj

			var context = function(description, contextFn) {
				contextObj = {
					description: description
				, fn: contextFn
				}
			}

			var observation = function(description, observationFn) {
				observations.push({
					description: description
				, fn: observationFn
				})
			}

			specs.apply({
				context: context
			, observation: observation
			})
			
			onSpecCb && onSpecCb({
				name: name
			, context: contextObj
			, observations: observations
			})
		}


		exports.onSpec = onSpec
		exports.subject = subject
	})
})(new Module)