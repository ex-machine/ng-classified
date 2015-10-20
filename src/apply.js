function apply(self, fn, args) {
	var selfless = (self === undefined) || (self === null);
	var length = args ? args.length : 0;
	
	switch (length) {
		case 0:
			return selfless ? fn() : fn.call(self);
		case 1:
			return selfless ? fn(args[0]) : fn.call(self, args[0]);
		case 2:
			return selfless ? fn(args[0], args[1]) : fn.call(self, args[0], args[1]);
		case 3:
			return selfless ? fn(args[0], args[1], args[2]) : fn.call(self, args[0], args[1], args[2]);
		case 4:
			return selfless ? fn(args[0], args[1], args[2], args[3]) : fn.call(self, args[0], args[1], args[2], args[3]);
		default:
			return selfless ? fn.apply(null, args) : fn.apply(self, args);
	}
}

module.exports = apply;