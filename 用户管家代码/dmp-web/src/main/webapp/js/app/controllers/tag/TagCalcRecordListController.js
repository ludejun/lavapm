define(['angularAMD', 'app/services/admin/DicService', 'app/services/tag/TagCalcRecordService','app/filters/common/CommonFilter', 'app/services/tag/TagService'], function (angularAMD) {
    'use strict';
    return ['$scope', '$rootScope','$stateParams','DicService','TagCalcRecordService','$state','NgTableParams', '$location','TagService', function ($scope,$rootScope,$stateParams,DicService,TagCalcRecordService,$state,NgTableParams,$location,TagService) {    
    	$scope.init = function(){
    		$scope.tagId = $stateParams.tagId;
    		$scope.tableParams = new NgTableParams(angular.extend({
                page: 1,           
                count: 10,          
                sorting: {
                    name: 'asc'     
                },
    			filter : {
    				tagId : $scope.tagId
    			}
            },
            $location.search()), {
                counts: [10, 20, 50],
                paginationMaxBlocks: 9,
                total: 0,                           
                getData: function ($defer, params) {
                	$location.search(params.url()); 
        			TagCalcRecordService.query(params).then(function(tagCalcRecords){
        				
        				for(var i = 0; i < tagCalcRecords.length; i++){
                			var startTime = tagCalcRecords[i].startTime == null ? "" : tagCalcRecords[i].startTime;
                			var finishTime = tagCalcRecords[i].finishTime == null ? "" : tagCalcRecords[i].finishTime;
                			var times = "";
                			//if(startTime == "" || finishTime == ""){
                			if(startTime == ""){//如果没有结束时间，结束时间取当前时间
                				times = "";
                			}else{
                				times = $.calculateTimes(startTime,finishTime);
                			}
                			tagCalcRecords[i].times = times;
                		}
        				
        				params.total(tagCalcRecords.total);
                        $defer.resolve(tagCalcRecords);
        			});
                }
            });
    		$scope.tagList;
    		$scope.operateType;
    		
    		$scope.queryTagExpressions($scope.tagId);
    	};
    	
    	$scope.queryTagExpressions = function(tagId){
    		$scope.tagDetails = {};
    		TagService.getById(tagId).then(function(tag){
    			$scope.tagDetails = tag;
    			//$scope.renderingExpressions(tag);
    			
    			//
    			//$rootScope.tagName = tag.name;
			});
		}
    	
    	$scope.renderingExpressions = function(tag){
    		var expression = tag.expression;
    		var expArr = [];
    		if(expression){
    			expArr = expression.split(" ");
    			var expressionNodeList = tag.tagExpressionNodeList;
    			
        		var html = "";
        		var entryPos = 0;
        		for(var i = 0; i < expArr.length; i++){
        			var expItem = expArr[i];
        			var expIndex = expItem.replace('X', '');
        			if(!isNaN(expIndex)){
        				if(expressionNodeList[entryPos].code == expItem){
        					var expName = expressionNodeList[entryPos].name == null ? "" : expressionNodeList[entryPos].name;
        					//var description = expressionNodeList[entryPos].description == null ? "" : expressionNodeList[entryPos].description;
        					html += '<div class="tag tag1 tip-box">';
        					html += '<span class="name">'+expName+'</span>';
        					html += '<div class="tip-con" style="display: none;">';
    						html += '<s></s><span class="des">'+expName+'</span></div></div>'	
        				}
        				entryPos++;
        			}else{
        				if(expItem == '+'){
        					expItem = '并且';
        				}else if(expItem == '-'){
        					expItem = '或者';
        				}else if(expItem == '!'){
        					expItem = '非';
        				}
        				html += '<div class="sign"> '+ expItem +' </div>';		
        			}
        		}
        		$("#tag-exp-list").html(html);
        		$.help_float();
    		}
    	}
    	
    	$scope.viewTagCalcRecord = function(tagCalcRecord){
    		var href = '#/tag/tags/'+$scope.tagId+'/tagCalcRecords/'+tagCalcRecord.id;
			window.location.href = href + '?tagId='+$scope.tagId;
    	}
    	
    	$scope.queryTagList = function(operate){ 
			$scope.operateType = operate;
			var params = {         
		        rows: 10000
			};
			
			TagService.queryAllTagList(params).then(function(tags){
				$scope.tagList = tags;
			});
		};
    	
		$scope.createTagCalcRecord = function(tagCalcRecord){
			TagCalcRecordService.create(tagCalcRecord).then(function(tagCalcRecord){
				//$state.go('tagCalcRecords');
				$state.reload();
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
			
		};
		
		$scope.editTagCalcRecord = function(tagCalcRecord){
			TagCalcRecordService.update(tagCalcRecord).then(function(tagCalcRecord){
				$scope.tableParams.reload();
				$scope.$hide;
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		};
		
		$scope.saveTagCalcRecord = function(tagCalcRecord){
			if(tagCalcRecord.startTime > tagCalcRecord.finishTime){
				$.Pop.alerts('保存失败，开始时间不能大于结束时间!');
				return false;
			}
			tagCalcRecord.id === undefined ? $scope.createTagCalcRecord (tagCalcRecord) : $scope.editTagCalcRecord (tagCalcRecord);
		}
		
		$scope.removeTagCalcRecord = function(tagCalcRecord){ 
			$.Pop.confirms('确定要删除？',function(){
				TagCalcRecordService.remove(tagCalcRecord).then(function(tagCalcRecord){
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
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_BASE_CALC_RECORD_STATUS,DMP_OBJECT_STATUS,TAG_SOURCE',
			        metaDicName : 'TOUCH_POINT_TYPE'
				};
			
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.touchPointTypes = angular.copy(appConfig.dicMap['TOUCH_POINT_TYPE']);
    			$scope.init();
    		});
    	}
    	
    	$scope.initDicByName();
    }];
});
