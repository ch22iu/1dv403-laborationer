


describe("FILEREADER -- Calling FileReader --> ", function() {

	var fr = require('../lib/fileReader.js');

	it("No parameter should return false", function() {
		var res = fr.readFile();
		expect(res).toBeFalsy();
	});

	it("Bad parameter/path should return false", function() {
		var res = fr.readFile("/askjhdkasd/hej.json");
		expect(res).toBeFalsy();
	});

	it("Not a .json should return false", function() {
		var res = fr.readFile("./data/data.xml");
		expect(res).toBeFalsy();
	});

	it("Correct path should return a string", function() {
		var res = fr.readFile("./data/data.json");
		//console.log(res); console.log(typeof res);
		expect(typeof res).toBe("string");
	});


});
