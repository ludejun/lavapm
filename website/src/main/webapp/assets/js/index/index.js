
define(function( require,exports,module ){

	var $App = $("#app");
	var MenuEvent = require( './listRender' );
	var DefaultsTpl = require( '../tpl/PageIndexTpl' );

	var PageIndex = {
		init : function(type){
			var html = window.template(DefaultsTpl,{} );
			$App.html(html);
			MenuEvent.init( {} );
		}
	};
	
	module.exports = PageIndex;
})

