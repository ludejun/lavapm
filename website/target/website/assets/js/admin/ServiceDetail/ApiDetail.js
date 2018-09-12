define(function( require,exports,module ){

	//请求模板
	var tpl = require( '../../tpl/ApiDetailTpl' );
	var statustpl = require('../../tpl/ApiExplainTable');

	var Util = {
		init : function( data ){
			console.log(data);

			var request = {};
			var response = {};
			if(data.api.api.hasOwnProperty('request')&&data.api.api.request.trim()){

				console.log(333);

				request = JSON.parse(data.api.api.request.replace( /(\r|\n|\s)/g,''));
			}else{
				request = {};
			}


			if(data.api.api.hasOwnProperty('response')&&data.api.api.response.trim()){
				response = JSON.parse(data.api.api.response.replace( /(\r|\n|\s)/g,''));
			}else{
				response = {};
			}


			// data.api.api.request = data.api.api.request || "{}";
			// data.api.api.response =  data.api.api.response || "{}";
			// var request = JSON.parse(data.api.api.request.replace( /(\r|\n|\s)/g,''));
			// var response = JSON.parse(data.api.api.response.replace( /(\r|\n|\s)/g,''));


			var comment = data.api.api.comment;
			// var comment = JSON.parse(data.api.api.comment);
			var code = data.example.example.example;

			var result = {
				ApiRequest : request,
				ApiResponse : response,
				ApiCode : code,
				ApiComment : comment
			};
			var html = window.template( tpl,data.api );
			$("#DetailInfor").html( html );
			var APIargument = window.template(statustpl,result);
			$("#ApiArgument").html(APIargument);
			console.log(comment);

		}
	};

	module.exports = Util;
})