var startGame = {
	newGame: function() {
		var startButton = document.getElementById("newGameBtn");

		startButton.onclick = function() {
			startGame.newMemory();
			return false;
		};
	}, gameCounter: 0, newMemory: function() {
		var wrapper = document.querySelector(".content");
		var newBoard = document.createElement("div");
		newBoard.id = "#board" + startGame.gameCounter;
		newBoard.setAttribute("class", "board");

		wrapper.appendChild(newBoard);
		var memory = new MemoryGame(newBoard.id);
		memory.init();

		startGame.gameCounter += 1;
		
		console.log(startGame.gameCounter);
	}
};

window.onload = startGame.newGame;

MemoryGame = function(boardID) {
	var that = this;

	// Mina Closures variabler
	var countArray = [];
	var guessCount = 0;
	var clickCount = 0;
	var pairCount = 0;

	that.init = function() {
		that.generateMemory();
	};