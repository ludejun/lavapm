define(['angularAMD','app/services/admin/DicService', 'app/services/crowd/PotentialCrowdService','app/services/crowd/CrowdService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';

    return ['$scope', '$stateParams','DicService', 'PotentialCrowdService','CrowdService', '$state', function ($scope, $stateParams,DicService, PotentialCrowdService,CrowdService, $state) {
    	$scope.potentialCrowd;    	
    	
    	$scope.viewEditPotentialCrowd = function(){
    		if($stateParams.potentialCrowdId){
	    		PotentialCrowdService.getById($stateParams.potentialCrowdId).then(function(potentialCrowd){
	    			$scope.potentialCrowd = potentialCrowd;  
	    			$scope.seedCrowdObj.keyword = potentialCrowd.seedCrowdName;
	    			$scope.checkSeedCrowdsIsValid();
				});
    		}
		};
		
		$scope.savePotentialCrowd = function(potentialCrowd){
			if(!potentialCrowd){
				potentialCrowd = {};
			}
			if(!potentialCrowd.name){
				$.Pop.alerts("人群名称不能为空，请填写");
				return false;
			}
			if(!potentialCrowd.acquisitionNumber){
				$.Pop.alerts("潜客数量不能为空，请填写");
				return false;
			}else{
				var predictNumIsInteger = $.checkNumberIsInteger(potentialCrowd.acquisitionNumber);
				if(!predictNumIsInteger){
					$.Pop.alerts("潜客数量必须为正整数，请重新输入");
					return false;
				}
			}
			
			if($scope.seedCrowdObj.keyword){
				var seedObj = $scope.checkInputSeedCrowdIsHasNot(potentialCrowd);
				if(!seedObj.has){
					$.Pop.alerts("请输入有效的种子人群");
					return false;
				}else if(seedObj.crowd && seedObj.crowd.crowdCount == 0){
					$.Pop.alerts("请输入有效的种子人群 ");
					return false;
				}
			}else{
				potentialCrowd.seedCrowdId = "";
				$.Pop.alerts("请输入有效的种子人群");
				return false;
			}
			
			$scope.isSaving = true;
			potentialCrowd.id === undefined ? $scope.createPotentialCrowd (potentialCrowd) : $scope.editPotentialCrowd (potentialCrowd);
		};
		
		$scope.createPotentialCrowd = function(potentialCrowd){
			PotentialCrowdService.create(potentialCrowd).then(function(potentialCrowd){
				$scope.isSaving = false;
				$state.go('potentialCrowds'); 
			},function(response) {
				$scope.isSaving = false;
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.editPotentialCrowd = function(potentialCrowd){
			PotentialCrowdService.update(potentialCrowd).then(function(potentialCrowd){
				$scope.isSaving = false;
				//$state.go('potentialCrowds'); 
				$scope.goBackHistory();
			},function(response) {
				$scope.isSaving = false;
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.goBackHistory = function(){
			window.history.back();
		}
		
		$scope.checkInputSeedCrowdIsHasNot = function(potentialCrowd){
			var seedList = $scope.allSeedCrowdList,
			seedListLength = seedList.length;
			var seedObj = {
				has : false,
				crowd : {}
			};
			for(var i = 0; i < seedListLength; i++){
				if($scope.seedCrowdObj.keyword == seedList[i].name){
					seedObj = {
						has : true,
						crowd : seedList[i]
					};
					if(potentialCrowd){
						potentialCrowd.seedCrowdId = seedList[i].id;
					}
					break;
				}
			}
			return seedObj;
		}
    	
    	$scope.checkSeedCrowdsIsValid = function(){
    		$scope.crowdScale = 0;
    		var seedObj = $scope.checkInputSeedCrowdIsHasNot();
			if(seedObj.has && seedObj.crowd && seedObj.crowd.crowdCount){
				$scope.crowdScale = seedObj.crowd.crowdCount;
			}
    	}
		
		$scope.filterSeedCrowdsList = function(){
			$scope.isShowRangeCrowdDropdownMenu = false;
			$scope.seedCrowdFilterList = [];
			
			if($scope.allSeedCrowdList.length == 0){
				$scope.isShowSeedCrowdDropdownMenu = false;
				return false;
			}
			
			$scope.isShowSeedCrowdDropdownMenu = true;
			
			if($scope.seedCrowdObj.keyword == "" || $scope.seedCrowdObj.keyword == undefined){//显示所有
				$scope.seedCrowdFilterList = angular.copy($scope.allSeedCrowdList);
			}else{
				var seedList = $scope.allSeedCrowdList;
				var seedListLength = seedList.length;
				var hasFilter = false;
				for(var i = 0; i < seedListLength; i++){
					if(seedList[i].name){
						if(seedList[i].name.indexOf($scope.seedCrowdObj.keyword) != -1){
							$scope.seedCrowdFilterList.push(seedList[i]);
							hasFilter = true;
						}
					}
				}
				if(!hasFilter){
					$scope.hideSeedCrowdDropdowMenu();
				}
				
				
				
			}
			
		};
		$scope.selectSeedCrowdItem = function(seed){
			$scope.seedCrowdObj.keyword = seed.name;
			$scope.hideSeedCrowdDropdowMenu();
			//$scope.queryCrowdDetailsByCrowdId(seed.id);
			$scope.checkSeedCrowdsIsValid();
		};
		$scope.hideSeedCrowdDropdowMenu = function(){
			$scope.isShowSeedCrowdDropdownMenu = false;
		};
		
		$scope.onHideDropdownMenu = function(event) {
			if (!($(event.target).parents(".search-dropdown").length>0)) {
				$scope.hideSeedCrowdDropdowMenu();
				$scope.isShowTransformDropdownMenu = false;
			}
		}
    	
    	$scope.queryAllCrowdList = function(){
			var params = {         
		        rows: 10000
			};
			
			CrowdService.queryForCrowdCount(params).then(function(crowds){
				var crowdsList = angular.copy(crowds);
				$scope.allSeedCrowdList = crowdsList;
				
				$scope.viewEditPotentialCrowd();
			});
		}
		
		$scope.init = function(){
			$scope.crowdScale = 0;
			$scope.potentialCrowd = {
				acquisitionChannel : "0"
			};
			
			/*初始化种子客群start*/
    		$scope.isShowSeedCrowdDropdownMenu = false;
    		$scope.seedCrowdObj = {};
    		$scope.seedCrowdObj.keyword = "";
    		$scope.seedCrowdFilterList = [];
    		$scope.allSeedCrowdList = [];
    		$scope.queryAllCrowdList();
    		/*初始化种子客群end*/
		}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'ACQUISITION_CHANNEL'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.acquisitionChannelList = angular.copy(appConfig.dicMap['ACQUISITION_CHANNEL']);
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
		
    }];
});
