define(function( require,exports,module ){
	//请求模板
	var tpl = require( '../tpl/StatusDetailTpl' );
	var Util = {
		init : function( data ){
			data.status.statusDesc = data.status.statusDesc || "{}";
			var statusDesc = data.status.statusDesc.replace( /(\r|\n|\s)/g,'');
			statusDesc = JSON.parse(statusDesc);
			var request = {
				data : statusDesc
			}
			console.log(statusDesc);
			var html = window.template( tpl,request );
			$("#DetailInfor").html( html );
		}
	};
	module.exports = Util;
})