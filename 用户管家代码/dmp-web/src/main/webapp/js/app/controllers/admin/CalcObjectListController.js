define(['angularAMD','app/services/admin/DicService','app/services/admin/CalcObjectService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','CalcObjectService','$state','NgTableParams', '$location', function ($scope,DicService,CalcObjectService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.tableParams = new NgTableParams(angular.extend({
                page: 1,           
                count: 10,          
                sorting: {
                    name: 'asc'     
                }
            },
            $location.search()), {
                counts: [10, 20, 50],
                paginationMaxBlocks: 9,
                total: 0,                           
                getData: function ($defer, params) {
                	$location.search(params.url()); 
        			CalcObjectService.query(params).then(function(calcObjects){
        				params.total(calcObjects.total);
                        $defer.resolve(calcObjects);
        			});
                }
            });
    	};
    	
		$scope.createCalcObject = function(calcObject){
			CalcObjectService.create(calcObject).then(function(calcObject){
				$scope.isSaving = false;
				$state.go('calcObjects'); // 当为弹出窗口时为 $state.reload(); 
			},function(response) {
				$scope.isSaving = false;
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.editCalcObject = function(calcObject){
			CalcObjectService.update(calcObject).then(function(calcObject){
				$scope.isSaving = false;
				$scope.tableParams.reload();
				$scope.$hide;
			},function(response) {
				$scope.isSaving = false;
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.saveCalcObject = function(calcObject,formHorizontal){
			calcObject = calcObject || {};
			$scope.isSaving = true;
			calcObject.id === undefined ? $scope.createCalcObject (calcObject) : $scope.editCalcObject (calcObject);
		};
		
		$scope.removeCalcObject = function(calcObject){   
			$.Pop.confirms('确定要删除？',function(){ 		
				CalcObjectService.remove(calcObject).then(function(calcObject){
					$scope.tableParams.reload();
				},function(response) {
					if(response.data != null && !response.data.success){
						$.Pop.alerts(response.data.msg);
					}
				});
			});
		};
		
		$scope.search = function(){    		
			$scope.tableParams.filter({'q' : $scope.searchValue});
		};
		
		$scope.clickModal = function(){
    		if(document.all){
    			window.event.cancelBubble = true;
    	 	}else{
    			event.stopPropagation(); 
    		}
    	}
		
		$scope.init();
    }];
});
