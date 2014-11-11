"use strict";

var makePerson = function(persArr){ 
	var result = {};
	var isString;
	var isNumber;
	var i;
	
	//Plockar ut namnen, sorterar dom innan sätter ihop dom till.
	var names = persArr.map (function (name){ return name.name;}).sort(function(a, b) { return a.localeCompare(b) });//.join(", ");
		//Plockar ut åldrarna
	var ages = persArr.map(function (age){ return age.age;});

	isString = names.every(function isString(value, index, array) {
		if (typeof value === "string") {
		} else {
			console.log("Något är inte en sträng!");
		};
	});

	isNumber = ages.every(function isNumber(value, index, array){
		if (Number.isInteger(value)) {
		} else {
			console.log("Något är inte ett heltal!");
		};
	});
	
	//+ medelåldern
	var averageAge = ages.reduce(function(a,b){ return a+b;});
	averageAge /= ages.length;

	names = names.join(", ");
	
	//Avrundar
	averageAge = Math.round(averageAge);

	//Max+min från array.
	var maxAge = Math.max.apply(Math, ages);
	var minAge = Math.min.apply(Math, ages);

	// Lägger till 
	result.names = names;
	result.averageAge = averageAge
	result.minAge =  minAge;
	result.maxAge = maxAge;
	
	return result;
}; 

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
var result = makePerson(data);
console.log(result);
