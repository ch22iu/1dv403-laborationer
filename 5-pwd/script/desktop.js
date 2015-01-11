"use strict";

window.addEventListener("load", function() {
	var gui = JAWM.gui;
	var newBack = document.getElementById("newBack");
	var newRSS = document.getElementById("newRSS");
	var newMem = document.getElementById("newGame");
	var text = document.getElementById("textarea");
	var moveThis = document.getElementById("test");
	var check = 1;
	
	// Init
	// gui.draggable.enable();
	draggable(moveThis);
	
	// Ny Bakgrund
	newBack.onclick = function() {
		newBack();
		function newBack() {
			var newB = new newBackground();
			newB.init();
			console.log("You have a new background? ");
		}
	};
	// Ny RSS
	newRSS.onclick = function() {
		alert('Funkar!');
		//newRSS.init();
	};
	// Nytt spel
	newMem.onclick = function() {
		newMemory();
		
		function newMemory() {
			var wrapper = document.querySelector(".content");
			var newBoard = document.createElement("div");
			newBoard.id = "Gameboard: " + " " + check;
			newBoard.setAttribute("class", "board");
			wrapper.appendChild(newBoard);
			var memory = new MemoryGame(newBoard.id);
			memory.init();
			check += 1;
			console.log("You have created a new game.");
			}
			draggable(wrapper);
			draggable(newBoard);
			draggable(memory);
			draggable(board);
	};
	
});

function newBackground() {
	var that = this;
	
    that.init = function() {
        this.backGround();
    }
     that.backGround = function() {
        //skapar element för fönster och dess delar
		var move = document.querySelector(".chooseBackgroundWindow");
        var divChooseBackground = $("<div class='chooseBackgroundWindow'></div>");
        var headerChooseBackground = $("<header class='headerChooseBackgroundWindow'></header>");
        var iconChooseBackground = $("<img class='iconChooseBackgroundWindow' src='pics/icon_DSC00846.png'/>");
        var headerTextChooseBackground = $("<span class='headerTextChoosenBackgroundWindow'>Välj bakgrundsbild</span>");
        var aCloseChooseBackground = $("<a class='aClose' href='#' titel='Stäng'></a>");
        var imgCloseChooseBackground = $("<img class='imgClose' src='pics/fileclose.png'/>");
        var mainChooseBackground = $("<main class ='mainChooseBackgroundWindow'></main>");
        var footerChooseBackground = $("<footer class='footerChooseBackgroundWindow'></footer>");

        //lägger ut elementen i DOMen
        $(".content2").append(divChooseBackground);
        divChooseBackground.append(headerChooseBackground);
        divChooseBackground.append(mainChooseBackground);
        divChooseBackground.append(footerChooseBackground);
        headerChooseBackground.append(iconChooseBackground);
        headerChooseBackground.append(headerTextChooseBackground);
        headerChooseBackground.append(aCloseChooseBackground);
        aCloseChooseBackground.append(imgCloseChooseBackground);
		
		
        var that = this;
        aCloseChooseBackground.click(function() {
            that.closeBackgroundWindow(divChooseBackground);
        });
        this.positionWindow();

        divChooseBackground.click(function() {
            that.moveWindowToTop(divChooseBackground);
        })
        //Läser in json-sträng, parsar och presenterar tumnagelbilder i fönstret
        //callback anropas vid "onreadystate" och skickar då in responstext från Ajax-anrop
        var callback = function(respons) {
            /*I callback är "this" beroende på vem som anropar funktionen callback. 
             Använder det "that" som deklarerats i den yttre funktionen eftersom jag vill ha samma this som där */
            var images = JSON.parse(respons);
            
            var imageDivs = that.makeImageDivs(images);
            mainChooseBackground.append(imageDivs);

            //Kopplar klickevent till alla a-taggar
            var as = $(".aAroundImgsToChoose");
            as.click(function(e) {
                that.changeBackgroundImage(e);
            });
            /*Tar bort ladda-symbol om det finns */
            that.deleteLoadingIcon(footerChooseBackground);
        };
        new AjaxCon("http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", callback, footerChooseBackground);
    };
	
	
    /*Skapar en img-tag i en a-tag för varje tumnagebild som lästs in med json
     Varje a-tag läggs i en div*/
    that.makeImageDivs = function(images) {
        //Hittar den högsta höjden bland tumnagelbilderna...
        var heights = images.map(function(image) {
            return image.thumbHeight;
        });
        var highestImg = Math.max.apply(Math, heights);

        //...och den största bredden bland tumnagelbilderna
        var widths = images.map(function(image) {
            return image.thumbWidth;
        });
        var widestImg = Math.max.apply(Math, widths);
        //skapar array och divar med bilder i a-taggar. Divarna läggs i arrayen som returneras
        var divArray = [];
        var i;
        for ( i = 0; i < images.length; i += 1) {
            var thumbSrc = images[i].thumbURL;
            var picture = images[i].URL;
            var a = $("<a class ='aAroundImgsToChoose' href='#' title='Choose background'></a>");
            var jsImg = "<img class='imgsToChoose' src='" + thumbSrc + "' data-bigImg ='" + picture + "'  />";
            var jQImg = $(jsImg);
            var jsDiv = "<div class='imageDivs' style='height: " + highestImg + "px ;width: " + widestImg + "px' ></div>";
            var thumbDiv = $(jsDiv);
            thumbDiv.append(a);
            a.append(jQImg);
            divArray.push(thumbDiv);
        }
        return divArray;
    }

    that.deleteLoadingIcon = function(footerChooseBackground) {
        footerChooseBackground.children().remove();
    }
    that.changeBackgroundImage = function(e) {
        var background = $("html");
        var imgTag = e.currentTarget.firstChild;
        var jQImgTag = $(imgTag);
        var newSrc = jQImgTag.attr("data-bigImg");
        background.css("background-image", "url(" + newSrc + ")");
        background.css("background-size", "inherit");
        background.css("background-repeat", "repeat");
    }
     that.closeBackgroundWindow = function(divChooseBackground) {
        divChooseBackground.remove();
    }
    that.moveWindowToTop = function(divChooseBackground) {
        var divs = $(".chooseBackgroundWindow");

        divs.each(function(index) {
            var divJqIndex = $(divs[index]);
            divJqIndex.removeClass("front");
        });
        divChooseBackground.addClass("front");
		draggable(move);
    }
    that.positionWindow = function() {
		var move = document.querySelector(".chooseBackgroundWindow");

            draggable(move);
    }
	
};



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
		closeTab.textContent = "Close";
		closeTab.setAttribute("class", "closeTab");
		memoryBoard = document.createElement("div");
		memoryBoard.setAttribute("class", "memoryBoard");
		currentBoard.appendChild(closeTab);
		currentBoard.appendChild(memoryBoard);

		// Gör så att man kan ändra position på fönstret.
		draggable(wrapper);
		
		// close memoryBoardboard
		closeTab.onclick = function() {
		wrapper.removeChild(currentBoard);
		console.log("You closed down " + " " +boardID);
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
		img.src = "pics/start.png";
		memoryBoard.appendChild(a);
		a.appendChild(img);
		
			a.onclick = function() {
				that.switchTile(this, randomArray[i]);
				console.log("You pressed on picture:" + " " + randomArray[i]);
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
		imgOne.src = "pics/" + randomArray + ".png";
		imgOne.setAttribute("class", "open");
		countArray.splice(0, 1, imgOne);
		return;
		
	}
	
	// Kollar att andra klicket inte tillhör par
	if (clickCount === 2) 
		{
		
		if (click.firstChild.getAttribute("class") == "open")
		{
			clickCount = 1;
			return;
		}
		if (click.firstChild.classList.contains("pair")) {
			clickCount = 1;
			return;
		}
		
	imgTwo = click.firstChild;
	imgTwo.src = "pics/" + randomArray + ".png";
	countArray.splice(1, 1, imgTwo);
	/*
	Om Första i arryen är samma
	som andra så sätter den ut
	attributen att dom är samma.
	Samt att den lägger till en i par.
	Även sätter click till 0.
	*/
	if (countArray[0].src === countArray[1].src) 
	{
		countArray[0].setAttribute("class", "pair");
		countArray[1].setAttribute("class", "pair");
		pairCount += 1;
		clickCount = 0;
	}
	// Sätter om man svara fel byter tillbaka.
	else {
	setTimeout(function() 
	{
		countArray[0].src = "pics/start.png";
		countArray[1].src = "pics/start.png";
		countArray[0].classList.remove("open");
		countArray[1].classList.remove("open");
		clickCount = 0;
	}, 1000);
	}
	guessCount += 1;
	}
	// Om man har svarat rätt på alla 8st.
	if (pairCount === 8) {
		alert("Nice, You did it on" + " " + guessCount + " " + "trys.");
	}
	// Om man har gissat 10x
	if (guessCount === 10) 
	{
		alert("You have guessed 10 times. You have 15 guesses left. Be careful.");
	}
	// Om man har gissat 10x
	if (guessCount === 20) 
	{
		alert("You have only 5 guesses left. Be careful.");
	}
	// Om man har svarat över 25 gissningar.
	if (guessCount === 25) 
	{
		var currentBoard, a, img, memoryBoard, randomArray, count, closeTab, wrapper;
		
		randomArray = that.random();
		wrapper = document.querySelector(".content");
		currentBoard = document.getElementById(boardID);
		closeTab = document.createElement("a");
		closeTab.href = "#";
		closeTab.textContent = "Close";
		closeTab.setAttribute("class", "closeTab");
		memoryBoard = document.createElement("div");
		memoryBoard.setAttribute("class", "memoryBoard");
		currentBoard.appendChild(closeTab);
		currentBoard.appendChild(memoryBoard);

		wrapper.removeChild(currentBoard);

		alert("Epic fail. You suck!");
		
	}
	};
};




