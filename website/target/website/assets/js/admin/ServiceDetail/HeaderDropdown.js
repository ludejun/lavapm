define(function( require,exports,module ){
	var $DropDown = $("#DetailDropDown");
	var HeaderDropDown = {
		init : function( arr ){
			this.renderData( arr );
			this.renderEvent();
		},
		renderData : function( arr ){
			var html = '';
			for( var i = 0; i < arr.length; i++ ){
				var data = arr[i];
				html += '<li class="header-down-li"><a href="#/detail/'+data.id+'">'+data.name+'</a></li>';
			}
			// $DropDown.html( html );
		},
		renderEvent : function(){
			$(".header-nav .header-nav-h2").mouseenter(function(){
				$DropDown.show();
			}).mouseleave(function(){
				$DropDown.hide();
			})
			$DropDown.on("click",".header-down-li",function(){
				$DropDown.hide();
			})
		}
	};

	module.exports = HeaderDropDown;
})