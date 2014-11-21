"use strict";

window.onload = function(){
	
	// Skapar upp en variabel som heter secret som innehåller ett slumptal. Sätter även att counter ska vara 0.
	var secret = Math.floor((Math.random() * 100) + 1); // Detta tal behöver bytas ut mot ett slumpat tal.
	var counter = 0;
	
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function(number){
		console.log("Det hemliga talet: " + secret); // Du når den yttre variabeln secret innifrån funktionen.
		console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.
			
		// Plats för förändring.
		
		// Om talet är utanför intervallet, om number är mindre än 0 och om talet är större än 100 så returnerar vi false,
		// annars räknar vi och kollar om number är det hemliga talet och returnerar text samt + secret + hur många gissningar.
		
		if (number < 0 || number > 100) {
			return [false, "Talet är utanför intervallet 0 - 100"];
		} else {
			counter++;
			if (number == secret) {
				return [true, "Grattis du vann! Det hemliga talet var " + secret + " och du behövde " + counter + " gissningar för att hitta det."];
			} else if (number < secret) {
				return [false, "Det hemliga talet är högre!"];
			} else {
				return [false, "Det hemliga talet är lägre!"];
			};
		};
	};

	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};