define(['app','angularAMD'], function (app,angularAMD) {
    'use strict';
 
    
    app.filter('ConversionSymbol', [ function($rootScope,$http) {
    	var productData = undefined; 
        return function(itrm){
        
            var d=itrm.replace("^"," | ");
            return d
};
	}]);
});
