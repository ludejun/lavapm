define(function( require,exports,module ){
	window.TD.AllBuyName = [];
	window.TD.AllBuyId = [];
	var promise = function( options ){
			var URL = window.TD.vHosts;
			window.TD.token = window.TD.util.Cookie.get("tdppt");
			var tdppt = window.TD.util.Cookie.get("tdppt");
			var email = window.sessionStorage.getItem('user');

			return $.ajax({
				url : URL + '/datamarket/dataProduct',
				type : "get",
				data : {
					from : window.TD.vFrom,
					token : window.TD.token,
					email : email,                          
					keyWord : options.keyWord || '',
					type : options.type || '',
					tdppt : tdppt
					// tddmk@outlook.com
				},
				success : function(data){
					// if(typeof data.data === "object" && !(data.data instanceof Array)){
					// 	alert("该账户未激活DataMarket");
					// }else{
						var dataservice = data.data.table.data;
						var j = 0;
						for(var i=0;i<dataservice.length;i++){
							if(dataservice[i].buy == 1){
								window.TD.AllBuyName[j] = dataservice[i].name;
								window.TD.AllBuyId[j] = dataservice[i].serviceId;
								j++;
							}
						}
					// }			
						
				}
			})
	}
	module.exports = promise;
})