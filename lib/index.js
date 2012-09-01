;(function(module) { var exports = module.exports
	define(function(wagner) {

	})
})(new Module)
var context = function(description, execution) {
	var when,
		observations = [],
		result = {
			context: description,
			observationResults: []
		},
		that = {};
		
	that.when = function(execution) {
		when = execution;
	};
		
	that.observation = function(description, execution) {
		observations.push({
			d: description,
			e: execution
		});
	};
		
	that.observe = function(observed) {
		return {
			should: {
				equal: function(expected) {
					return observed === expected;
				}
			}
		};
	};
		
	that.done = function() {
		observations.forEach(function(observation) {
			var observationResult = {
				description: observation.d
			};
			
			if(observation.e) {
				observationResult.result = observation.e.apply(that) ? 'succeeded' : 'failed';
			} else {
				observationResult.result = 'not implemented';
			}
			sys.inspect(observationResult);
			result.observationResults.push(observationResult);
		});
		
		sys.puts(result.context);
		result.observationResults.forEach(function(observationResult) {
			sys.puts('\t' + observationResult.description + ': ' + observationResult.result);
		});
	};
	
	execution.apply(that);
	when.apply(that);
};

(function() {
	context('a context tester, when async', function() {
		var result;
	
		this.when(function() {
			var self = this;
			
			setTimeout(function() {
				result = 2;
				self.done();
			}, 2000);
		});
	
		this.observation('should not finish execution until all observations of async when are complete', function() {
			this.observe(result).should['equal'](2);
		});
	
		this.observation('should not be implemented')
	});

	context('a second context tester, when sync', function() {
		var obj = {
				doIt: function() {
					sys.puts('doing it');
					return 8;
				}
			},
			result;
		
		this.when(function() {
			result = obj.doIt();
			this.done();
		});
	
		this.observation('should not finish execution until all observations of sync when are complete', function() {
			this.observe(result).should['equal'](8);
		});
	});
})();
