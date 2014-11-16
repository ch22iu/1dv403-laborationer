function Message(message, date){
	var that = this;
	
	that.getText = function() {
		return message;
	}
	
	that.setText = function(_text) {
		message = text,
		
	}
	
	that.getDate = function() {
		return date;
	}
	
	that.setDate = Function(_date) {
		date = date;
	}
	
Message.prototype.toString = function() {
	return this.getText()+" ("+this.getDate()+")";
}