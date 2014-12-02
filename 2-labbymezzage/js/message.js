"use strict";

function Message(message, date){
	var that = this;
	
	that.getText = function() {
		return message;
	};
	
	that.setText = function(_text) {
		message = _text;
	};
	
	that.getDate = function() {
		return date;
	};
	
	that.setDate = function(_date) {
		date = _date;
	};
	
Message.prototype.toString = function() {
	return this.getText()+" ("+this.getDate()+")";
};

Message.prototype.getHTMLText = function() {
	return this.getText().replace(/[\n\r]/g, "<br/>");
};

Message.prototype.getDateText = function(alertDate) {
	var date = this.getDate();
	
	if (alertDate === true) {
		return "Inlägget skapades den " + 
		date.getDate() + " " + 
		date.getMonth() + " " + 
		date.getFullYear() + " " + " klockan " +
		date.getHours() + ":" + 
		date.getMinutes() + ":" + 
		date.getSeconds();
		}
		else {
			return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		}
	};
}
