/* jslint node: true */
/*
	This module is reading a file (param url) in an sync way
	The file must be a JSON-file.
*/

(function(){
	'use strict';

	var fs = require('fs');

	exports.readFile = function(url) {
		if(typeof url === 'string' && url.endsWith('.json')) {
			var data;
			try {
				// try to read the file here - Do it sync
				// encode it for returning a correct string
				data = fs.readFileSync(url, {encoding: 'utf-8'});
				return data;
			}
			catch(err) {
				return false;
			}
		}
		else {
			return false;
		}
	};

	// Export the readFile function for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `_` as a global object.
	/*if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = readFile;
		}
		exports.readFile= readFile;
	} else {
		// This is a node.js module, cant run in browser
	}*/


	/* istanbul ignore else */
	if(typeof String.prototype.endsWith !== 'function') {
        // http://stackoverflow.com/questions/280634/endswith-in-javascript
		String.prototype.endsWith = function(suffix) {
			return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}
}());
