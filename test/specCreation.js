(function() {
	papageno.subject('a papageno subject', function() {
		this.context('when creating a specification', function() {
			this()
		})

		this.observe('should register the specification', function(specRegistry) {
			this(result).should['equal'](2)
		})
	})
})();