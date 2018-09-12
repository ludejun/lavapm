define(['angularAMD','app/services/admin/DicService', 'app/services/admin/ScriptCalcRecordService','app/filters/common/CommonFilter'], function (angularAMD) {
    'use strict';
    return ['$scope','DicService','ScriptCalcRecordService','$state','NgTableParams', '$location', function ($scope,DicService,ScriptCalcRecordService,$state,NgTableParams,$location) {    
    	$scope.init = function(){
    		$scope.scriptCalcType = "";
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
        			ScriptCalcRecordService.queryScriptCalcRecords(params).then(function(scriptCalcRecords){
        				$scope.buildCalcRecordTimes(scriptCalcRecords);
        				params.total(scriptCalcRecords.total);
                        $defer.resolve(scriptCalcRecords);
                        
                        window.setTimeout(function(){
          				  	$scope.calNgTableBody(); 
          			  	},50);
        			});
                }
            });
    	};
    	
    	$scope.calNgTableBody = function(){
			if($("#tableParams").attr("freeze") == "true"){
				var windowObj = window.parent || window;
				var winHg = $(windowObj).height();
				var $content = $("#content");
				var $ngTableContainer = $content.find(".ng-table-container");
				var $moreSearchBox = $ngTableContainer.find(".more-search-box");
				var $ngTableHead = $content.find(".ng-table-head");
				var $ngTableBody =  $content.find(".ng-table-body");
				var $operatorPanel = $content.find(".operator-panel");
				var $table = $("#tableParams");
				var $tbody = $table.find("tbody");
				var operatorPanelHg = $operatorPanel.outerHeight();
				var ngTableHeadHg = $ngTableHead.outerHeight();
				var moreSearchBoxHg = $moreSearchBox.outerHeight();
				var ngTableBodyHg = winHg - operatorPanelHg - ngTableHeadHg - moreSearchBoxHg - 40 - 50;
				var tbodyHg = $tbody.height();
				if(tbodyHg == 0){
					$ngTableBody.addClass("ng-table-body-empty");
				}else{
					$ngTableBody.removeClass("ng-table-body-empty");
				}
				$ngTableBody.css({"max-height":ngTableBodyHg+"px"});
				$table.FrozenTable(1,0,0);
			}
		}
    	
    	$scope.buildCalcRecordTimes = function(scriptCalcRecords){
    		for(var i = 0; i < scriptCalcRecords.length; i++){
    			var startTime = scriptCalcRecords[i].startTime == null ? "" : scriptCalcRecords[i].startTime;
    			var finishTime = scriptCalcRecords[i].finishTime == null ? "" : scriptCalcRecords[i].finishTime;
    			var times = "";
    			//if(startTime == "" || finishTime == ""){
    			if(startTime == ""){//如果没有结束时间，结束时间取当前时间
    				times = "";
    			}else{
    				times = $.calculateTimes(startTime,finishTime);
    			}
    			scriptCalcRecords[i].times = times;
    		}
    		
    		return scriptCalcRecords;
    	};
    	
		$scope.createScriptCalcRecord = function(scriptCalcRecord){
			ScriptCalcRecordService.create(scriptCalcRecord).then(function(scriptCalcRecord){
				$state.go('scriptCalcRecords'); // 当为弹出窗口时为 $state.reload(); 
			});
		};
		
		$scope.editScriptCalcRecord = function(scriptCalcRecord){
			ScriptCalcRecordService.update(scriptCalcRecord).then(function(scriptCalcRecord){
				$scope.tableParams.reload();
				$scope.$hide;
			});
		};
		
		$scope.saveScriptCalcRecord = function(scriptCalcRecord){
			scriptCalcRecord.id === undefined ? $scope.createScriptCalcRecord (scriptCalcRecord) : $scope.editScriptCalcRecord (scriptCalcRecord);
		};
		
		$scope.removeScriptCalcRecord = function(scriptCalcRecord){    		
			ScriptCalcRecordService.remove(scriptCalcRecord).then(function(scriptCalcRecord){
				$scope.tableParams.reload();
			});
		};
		
		$scope.search = function(){    		
			$scope.tableParams.filter({'calcType':$scope.scriptCalcType,'q' : $scope.searchValue});
		};
		
		$scope.refrashDatas = function(){
			$scope.tableParams.reload();
		}
		
		$scope.downloadScriptCalcRecord = function(calcObject){
			if(calcObject.status == 2){
				ScriptCalcRecordService.downloadScriptCalcRecord(calcObject).then(function(response){
        			var params = {
        				url : '/dmp-web/admin/attachments/'+calcObject.id+'/download/'
        			}
        			$.createDownloadIframe(params);
	    			
	    		},function(response) {
    				if(response.data && !response.data.success){
    					$.Pop.alerts(response.data.msg);
    				}
					
				});
			}else{
				$.Pop.alerts("未计算完成，不能下载");
				return false;
			}
    		
		}
		
		$scope.restartCompute = function(calcObject){
			$.layerLoading.show();
			ScriptCalcRecordService.restartCompute(calcObject).then(function(data){
				$.layerLoading.hide();
				$scope.tableParams.reload();
    		},function(response) {
    			$.layerLoading.hide();
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
		}
		
		$scope.initDicByName = function(){
			var params = {         
			        dicName : 'DMP_OBJECT_STATUS,DMP_BASE_CALC_RECORD_STATUS,CROWD_EXPORT_WAY'
				};
    		DicService.getDicByName(params).then(function(dicMap){
    			$scope.init();
    		});
    	}
    	$scope.initDicByName();
    }];
});
