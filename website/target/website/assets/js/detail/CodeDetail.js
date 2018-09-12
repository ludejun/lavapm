define(function( require,exports,module ){

	//请求模板
	var tpl = require( '../tpl/CodeDetailTpl' );

	var IntroduceDetail = {
		init : function( data ){
			var html = window.template( tpl,data );
			$("#CodeExample").html( html );
			console.log(data);
		}
	};

	module.exports = IntroduceDetail;
})