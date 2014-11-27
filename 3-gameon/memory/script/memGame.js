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

		function randomTiles(i) {

			a = document.createElement("a");
			img = document.createElement("img");
			a.href = "#";
			a.setAttribute("class", "tile");

			img.src = "img/pic.jpg";

			memoryBoard.appendChild(a);
			a.appendChild(img);

			a.onclick = function() {
				that.switchTile(this, randomArray[i]);
				return false;
			};
		}
	};
};