define(function( require,exports,module ){
	var HeaderDropDown = {
		init : function( arr ){
			console.log(arr);
			this.renderData( arr );
			this.renderEvent();
		}, 
		renderData : function(){
			
			var html = '';
			if(window.TD.AllBuyId.length > 0){
				for(var i = 0; i < window.TD.AllBuyId.length;i++){
					html += '<li class="header-down-li"><a class="header-down-a" href="#/detail/' + window.TD.AllBuyId[i] + '">'+ window.TD.AllBuyName[i] +'</a></li>';
				}
			}
			$("#HeaderDetailDropDown").html( html );
			$("#HeaderDetailDropDown").hide();
		},
		renderEvent : function(){
			$(".header-nav .header-nav-h2").mouseenter(function(){
				$("#HeaderDetailDropDown").css("display","block");
			}).mouseleave(function(){
				$("#HeaderDetailDropDown").css("display","none");
			})
			$("#HeaderDetailDropDown").on("click",".header-down-li",function(){
				$("#HeaderDetailDropDown").css("display","none");
			}) 
		},
	};

	module.exports = HeaderDropDown;
})