"use strict";

window.onload = function(){

	
	var birthday = function(date){
		var birthday = new Date(date);
		var currentDate = new Date();
		
		// Om det nya datumet är större än det aktuella datumet
		if (currentDate > birthday) {
		
			birthday.setFullYear(currentDate.getFullYear());
			
			if (currentDate > birthday) {
				birthday.setFullYear(currentDate.getFullYear() +1);
			}
			
			var numberOfDays = Math.ceil((birthday - currentDate) / (1000*60*60*24));
			if (numberOfDays === 365) {
				return 0;
			};
			return numberOfDays;
		
		} 
		else {
		console.log("Något gick fel!");
		}
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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};