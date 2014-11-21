"use strict";


var makePerson = function(person){ 
	var result = {};
	var isString;
	var isNumber;
	var i;
	
	// Sorterar och hämtar namnen.
	var names = person.map (function (name){ 

		return name.name;}).sort(function(a, b) { 
		return a.localeCompare(b) 
		
	});
	
	
	//Plockar ut åldern.
	var ages = person.map(function (age){ 
		return age.age;
	});

	// Kollar om en sträng är en sträng annars fel.
	isString = names.every(function isString(value, index, array) {
		if (typeof value === "string") {
		} else {
			console.log("Något är inte en sträng!");
		};
	});
	
	// Kollar om värdet är en int om inte så får man fel.
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

	// Skapar två variablar (max och min) från Arrayen.
	var maxAge = Math.max.apply(Math, ages);
	var minAge = Math.min.apply(Math, ages);

	// Lägger till objektet.
	result.names = names;
	result.averageAge = averageAge
	result.minAge =  minAge;
	result.maxAge = maxAge;
	
	return result;
}; 

var data = [
{name: "John Häggerud", age: 37}, 

{name: "Johan Leitet", age: 36}, 

{name: "Mats Loock", age: 46}

];


var result = makePerson(data);

console.log(result);
