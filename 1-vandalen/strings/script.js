"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
	
	
		// Här säger vi då om en textlängd innehåller litet a eller stort A så säger vi att 
		// strängen ska returnera hela texten samt att skicka med #. toLowerCase, toUpperCase, convChar.
		
		if (str.length > 0) {
			var convChar = "";

			for (var i = 0; i < str.length; i+= 1) {
				//str[i].toUpperCase() ===  str[i]
				if (str[i].toUpperCase() ===  str[i]) {
					convChar += str[i].toLowerCase().replace(/a/g, "#");
				} else {
					convChar += str[i].toUpperCase().replace(/A/g, "#");
				};
			};
			return convChar;
		}
		else {
		};
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};