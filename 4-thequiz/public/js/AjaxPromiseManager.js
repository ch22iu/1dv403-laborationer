var AJAXPromiseManager = {
	dataRequestObj: null,
	returnData: null,
	
	init: function(){
		this.dataRequestObj = this.getData();
		this.dataObj(this.dataRequestObj);
	
		return this.returnData;
	},
	
	getData:function(){
		return $.ajax({
		  url: ('js/data/data.json'),
		  dataType: 'json',
		  async: false
		});
	},
	
	dataObj: function(resp){
		resp.success(function(data){
			AJAXPromiseManager.returnData = data;
		});
	}
};