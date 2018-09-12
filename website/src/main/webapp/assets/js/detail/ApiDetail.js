define(function( require,exports,module ){
	//请求模板
	var tpl = require( '../tpl/ApiDetailTpl' );
	var statustpl = require('../tpl/ApiExplainTable');
	var Util = {
		init : function( data ){
			var request = {};
			var response = {};
			if(data.api.api.request){
				request = JSON.parse(data.api.api.request.replace( /(\r|\n|\s)/g,''));
			}else{
				request = {};
			}
			if(data.api.api.response){
				response = JSON.parse(data.api.api.response.replace( /(\r|\n|\s)/g,''));
			}else{
				response = {};
			}
			var code = data.example.example.example;
			var comment =  data.api.api.comment ;
			var result = {
				ApiRequest : request,
				ApiResponse : response,
				ApiCode : code,
				ApiComment : comment
			}
			var html = window.template( tpl,data.api );
			$("#DetailInfor").html( html );
			var APIargument = window.template(statustpl,result);
			$("#ApiArgument").html(APIargument);
		}
	};
	module.exports = Util;
})