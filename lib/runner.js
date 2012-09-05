;(function(module) { var exports = module.exports, define = module.define
	define(function(matchers) {
		var run = function(spec) {
			var done = function(result) {
				spec.observations.forEach(function(observation) {
					var fullDescription = spec.name + ', ' + spec.context.description + ', ' + observation.description
					var reportResult = function(isSuccessful) {
						if(isSuccessful) {
							console.log('passed: ', fullDescription)
						} else {
							console.log('failed: ', fullDescription)
						}
					}

					var observe = function(actual) {
						var should = {}
							, not = {}
						matchers.forEach(function(matcher, name) {
							should[name] = function(expected) {
								reportResult(matcher.apply(actual, [ expected ]))
							}
							not[name] = function(expected) {
								reportResult(!matcher.apply(actual, [ expected ]))
							}
						})

						should.not = not
						return {
							should: should
						}
					}

					observation.fn.apply(observe, [ result ])
				})
			}

			try {
				spec.context.fn.apply(done)
			}
			catch(ex) {
				console.log(ex)
			}

		}


		exports.run = run
	})
})(new Module)
