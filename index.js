var patelPlex = require("patel");
var createFilter = require("rollup-pluginutils").createFilter;
var objectAssign = require("object-assign");
var extname = require("path").extname;

function compile (filename, source, callback) {
	patelPlex.compile(source, {from: {"file": filename}}, callback);
}

module.exports = function patel (options) {
	options = objectAssign({
		sourceMap: true,
		bare: true,
		header: false,
		extensions: [".patel", ".ptl"]
	}, options || {});

	var filter = createFilter(options.include, options.exclude);
	var extensions = options.extensions;
	delete options.extensions;
	delete options.include;
	delete options.exclude;

	return {
		transform: function (code, id) {
			if (!filter(id)) return null;
			if (extensions.indexOf(extname(id)) === -1) return null;
			var result = "";
			var output = compile(id, code, function (err, r) {
				if (err) throw(err);
				result = r.code;
			});
			return {
				code: result,
				map: null
			};
		}
	};
};
