window.addEventListener("load", function() {
	var startButton = document.getElementById("newGameBtn");
	var text = document.getElementById("textarea");
	var check = 1;
	
		startButton.onclick = function() {
			newMemory();
			function newMemory() {
				var wrapper = document.querySelector(".content");
				var newBoard = document.createElement("div");
				newBoard.id = "spelbricka: " + " " + check;
				newBoard.setAttribute("class", "board");

				wrapper.appendChild(newBoard);
				
				var memory = new MemoryGame(newBoard.id);
				memory.init();

				check += 1;
				console.log("Du har skapat upp ett nytt spel");
			}
	};
	
});

function MemoryGame(boardID) {
	var that = this;

	// Mina Closures variabler
	var countArray = [];
	var guessCount = 0;
	var clickCount = 0;
	var pairCount = 0;

	that.init = function() {
		that.generateMemory();
	};

	that.random = function() {
		var randomTiles = RandomGenerator.getPictureArray(4, 4);

		return randomTiles;
	};

	that.generateMemory = function() {
		var currentBoard, a, img, memoryBoard, randomArray, count, closeTab, wrapper;

		randomArray = that.random();

		wrapper = document.querySelector(".content");
		currentBoard = document.getElementById(boardID);

		closeTab = document.createElement("a");
		closeTab.href = "#";
		closeTab.textContent = "Stäng";
		closeTab.setAttribute("class", "closeTab");

		memoryBoard = document.createElement("div");
		memoryBoard.setAttribute("class", "memoryBoard");

		currentBoard.appendChild(closeTab);
		currentBoard.appendChild(memoryBoard);

		// close memoryBoardboard
		closeTab.onclick = function() {
			wrapper.removeChild(currentBoard);
			console.log("Du stängde ner" + " " +boardID);
			return false;
		};
		for (var i = 0; i < randomArray.length; i += 1) {
			randomTiles(i);
		}
		/* 
			Funktionen som tar hand om/skapar upp bilderna
			Sätter även lite attribut till dom olika childsen.
			Loggar även när en användare trycker på en bild.
		*/
		function randomTiles(i) {

			a = document.createElement("a");
			img = document.createElement("img");
			a.href = "#";
			a.setAttribute("class", "tile");

			img.src = "pics/pic.jpg";

			memoryBoard.appendChild(a);
			a.appendChild(img);

			a.onclick = function() {
				that.switchTile(this, randomArray[i]);
				console.log("Du tryckte på bild nr:" + " " + randomArray[i]);
				return false;
			};
		}
	};
	/*
		Skapar upp en funktion som jag skickar in två argument (click, random)
		I denna funktion har jag även 2 variabler som kommer ta hand om 
		vilka som kommer vara firstChild osv.
	*/
	that.switchTile = function(click, randomArray) {
		var imgOne;
		var imgTwo;
		
		clickCount += 1;
		
		/* 
			Om cc är 1 så kommer den först kolla om det är par och sätter
			attribut till dom olika värdena.
			Kollar att första klicket inte tillhör par
		*/
		
		if (clickCount == 1)
		{
			
			if (click.firstChild.classList.contains("pair")) {
				clickCount = 0;
				return;
			}
			imgOne = click.firstChild;
			imgOne.src = "pics/pic" + randomArray + ".png";
			imgOne.setAttribute("class", "open");
			countArray.splice(0, 1, imgOne);
			return;
		}
		
		// Kollar att andra klicket inte tillhör par
		if (clickCount ===  2) {
			
			if (click.firstChild.classList.contains("pair")) {
				clickCount = 1;
				return;
			}

			imgTwo = click.firstChild;
			imgTwo.src = "pics/pic" + randomArray + ".png";
			countArray.splice(1, 1, imgTwo);
			guessCount += 1;
			
			/* 
				Om Första i arryen är samma 
				som andra så sätter den ut 
				attributen att dom är samma.
				Samt att den lägger till en i par.
				Även sätter click till 0.
			*/
			
			if (countArray[0].src === countArray[1].src) {
				countArray[0].setAttribute("class", "pair");
				countArray[1].setAttribute("class", "pair");

				pairCount += 1;
				clickCount = 0;
			}
			// Sätter om man svara fel byter tillbaka.
			else {
				setTimeout(function() {
					countArray[0].src = "pics/pic.jpg";
					countArray[1].src = "pics/pic.jpg";
					countArray[0].classList.remove("open");
					countArray[1].classList.remove("open");
					clickCount = 0;

				}, 1000);
			}
			guessCount += 1;
		}
		// Om man har svarat rätt på alla 8st.
		if (pairCount === 8) {
			alert("Du klarade det på" + guessCount);
		}
		// Om man har svarat över 25 gissningar.
		if (guessCount === 25) {
			alert("Jadu... Ditt minne var inte det bästa!");
		}
	
	};
};