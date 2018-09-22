define(['app','angularAMD','app/service/ReportService'], function (app,angularAMD) {
    'use strict';
    
    angularAMD.directive('tdBreakScreening',['$rootScope','ReportService','$state','$timeout', function($rootScope,reportService,$state,$timeout) {
    	return {
    		restrict : 'EA',
    		scope:{
    			data:"=",
    		},
    		templateUrl : "js/app/directive/template/td-break-screening.html",
    		link: function(scope, elem, attrs) {
    			var params='{"productid":"MzAwNTcwNQ==TGHsge==IuPAVC","platformid":"MSwyLDQ=TGHsge==IuPAVC","serviceCode":"9996","timecc":"0.34245260161890767"}';
    			reportService.getVersionByParams(params).then(function (data){
    				scope.data=data.data9996;
    			});
    			scope.$watch('data',function(e){
    				if(scope.data){
    					var jsonData = scope.data;
    					var d = {};
    					var pidx = -1; 
    					var fidx = -1; 
    					var plats = [];
    					 var lg=jsonData.length;
    					 for(var w=0;w<lg;w++){
    	     	    	    	
    						 var val=jsonData[w].value;
    	     	    	     var aarval=val.split('_');
    	     	    	    jsonData[w].value=aarval[1];
    	     	    	 }
    					scope.productList= jsonData;

    					scope.currentProduct=jsonData[0];
    					scope.backupvalue=jsonData[0].value;
    					
    					$timeout(function(){
    						scope.$watch('currentProduct',function(e){
    							if(scope.backupKey != scope.currentProduct.value){
    								scope.broadcastChange(); 
    								scope.backupKey = scope.currentProduct.value;
    							}
        	    			});
    					}, 1000, false);
    				}
    			});
    				
    			scope.broadcastChange = function(){
 
    				var backupvalue = scope.currentProduct.value;
    			
    					//TODO
    					
    					$rootScope.$broadcast('td-break-screening.onChange', {
    						backupvalue : [].concat(backupvalue+"")
    					});
    				
    			};
    			
    			scope.go = function(url){
    				$state.go(url);
    			}
    		}
    	}
    }]);
    //测试用
    angularAMD.factory('BreakScreeningService', [ '$rootScope','$http', function($rootScope,$http) {
    	var productData = undefined; 
    	 var basePersons = Restangular.all('/report/TenddataChoseVersionServlet/TenddataChoseVersionServlet');
        return {
    	    query : function(params) {
    	    	return basePersons.getList(params);			
    		},
    		create : function(person) {
    			basePersons.post(person, {}, {'Content-Type' : 'application/json'});
    		},
    		getById : function(id) {
    			return Restangular.one("/report/data", id).get();
    		},		
    		getDataByParams : function(params) {
    			return basePersons2.post(params, {}, {'Content-Type' : 'application/json'});
    		},
    		getByParams : function(params) {
    			return basePersons.post(params, {}, {'Content-Type' : 'application/json'});
    		},
    		update : function(person) {
    			return person.put();
    		},
    		remove : function(person) {
    			return person.remove();
    		}
        };
	}]);
});
