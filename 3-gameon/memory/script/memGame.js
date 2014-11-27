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