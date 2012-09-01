function Module() {
	var mod = Module.caller.arguments[2]

	this.require = mod.require
	this.exports = mod.exports
}


global.Module = Module