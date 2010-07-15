var sys = require('sys');

var context = function(description, execution) {
	var when,
		observations = [],
		that = {};
		
	that.when = function(description, execution) {
		when = {
			d: description,
			e: execution
		};
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
					sys.puts('observed: ' + observed +' expected: ' + expected);
				}
			}
		};
	};
		
	that.done = function() {
		sys.puts(description + ', ' + when.d)
		observations.forEach(function(observation) {
			sys.puts('\t' + observation.d);
			if(observation.e) {
				observation.e.apply(that);
			} else {
				sys.puts('not implemented')
			}
		});
	};
	
	execution.apply(that);
	when.e.apply(that);
};

(function() {
	context('a context tester', function() {
		var result;
		
		this.when('when async', function() {
			var self = this;
			sys.puts('starting async');
			setTimeout(function() {
				sys.puts('2 seconds later');
				result = 2;
				self.done();
			}, 2000);
		});
		
		this.observation('should not finish execution until all observations of async when are complete', function() {
			this.observe(result).should['equal'](2);
		});
		
		this.observation('should ')
	});
	
	context('a second context tester', function() {
		var obj = {
				doIt: function() {
					sys.puts('doing it');
					return 8;
				}
			},
			result;
			
		this.when('when sync', function() {
			result = obj.doIt();
			this.done();
		});
		
		this.observation('should not finish execution until all observations of sync when are complete', function() {
			this.observe(result).should['equal'](8);
		});
	});
})();
