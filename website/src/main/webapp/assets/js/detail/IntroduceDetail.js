define(function( require,exports,module ){

	//请求模板
	var tpl = require( '../tpl/IntroduceDetailTpl' );
	var Util = {
		init : function( data ){
			var html = window.template( tpl,data );
			$("#DetailInfor").html( html );

		}
	};



	module.exports = Util;
})
