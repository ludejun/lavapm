define(function( require,exports,module ){
	var filterTypes = function( typeslist,keytype ){
		var isTrue = false;
		for( var i = 0; i < typeslist.length; i++ ){
			var d = typeslist[i];
			if( d.type == keytype ){
				isTrue = true;
			}
		}
		return isTrue;
	};
	var FilterData = function( key ){
			var type =  key.keywords ? "keywords" : ( key.type ? key.type : "" );
			var arr = [];
			//全部
			if( type == "" ){
				return key.data;
			}else{
				for( var i = 0; i < key.data.length;i++ ){
					var d = key.data[i];
					//搜索关键词
					if(  key.keywords !== "" && d.name.indexOf( key.keywords ) > -1  ){
						arr.push( d );
					}
					//推荐
					else if( key.type === "recommend" && d.recommend ){
						arr.push( d )
					}
					//最新 默认选择数组前十条
					else if( key.type === "new" && i < 10 ){
						arr.push( d )
					}
					//条件筛选，分类,或者供应商
					else if( key.type == d.ownerName || filterTypes( d.types,key.type ) ){
						arr.push( d );
					}
					
				}
			}
			return arr
	};

	module.exports = FilterData;
})