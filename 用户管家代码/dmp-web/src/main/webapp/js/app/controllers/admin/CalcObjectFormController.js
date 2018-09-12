define(['angularAMD','app/services/admin/DicService', 'app/services/admin/CalcObjectService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams','DicService', 'CalcObjectService', '$state', function ($scope, $stateParams,DicService, CalcObjectService, $state) {
    	$scope.viewEditCalcObject = function(){
    		$scope.calcObject = {};  
    		if($stateParams.calcObjectId){
    			CalcObjectService.getById($stateParams.calcObjectId).then(function(calcObject){
	    			$scope.calcObject = calcObject;    			
				});
    		}
		};
		
		$scope.createCalcObject = function(calcObject){
			CalcObjectService.create(calcObject).then(function(calcObject){
				$scope.isSaving = false;
				$state.go('calcObjects');
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
				$state.go('calcObjects');
			},function(response) {
				$scope.isSaving = false;
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.saveCalcObject = function(calcObject){
			$scope.isSaving = true;
			calcObject.id === undefined ? $scope.createCalcObject (calcObject) : $scope.editCalcObject (calcObject);
		};
		
		$scope.init = function(){
			$scope.viewEditCalcObject();
		}
		 
		$scope.init(); 
    }];
});
