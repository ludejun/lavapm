define([ 'app','appCommon', 'angularAMD','app/service/ReportService','app/directive/TdHighchar','app/directive/TdHighcharMap','app/directive/TdSecondDateCondition',
         'app/directive/TdDateCondition','app/directive/TdFilterBox','app/directive/TdPanel','app/filter/DateStrSubstring',
         'app/directive/TdSelectVersion','app/filter/eventImgFilter','app/filter/eventTitleFilter','app/filter/DateStrSubstringmin15',
         'app/common/TableOptions','app/directive/TdSelect','app/common/HighchartsOptions','app/filter/platFormat','app/common/FormartUtils'],	function(app, angularAMD) {'use strict';
		return ['$scope', '$location', '$filter', 'NgTableParams',"ReportService" ,'$state','$timeout','Upload',
        function($scope, $location, $filter, ngTableParams,reportService,$state,$timeout,Upload) {
			$scope.redrectSummaryRadio = 3;
			$scope.redrectSummaryRuleRadio=2;
			$scope.page;
			//创建默认实例
			var product = {};
			if(window.parent && window.parent.iFrameHeight){
				window.setTimeout(window.parent.iFrameHeight,200);
			}
		
			//初始化操作
			$scope.init = function(params){
			
				params.vtimecc = Math.random();
				$scope.tableLoading = true;
				reportService.getByParams(params).then(function(data){
					//获取事件信息
					$scope.tableLoading = false;
					var events = data.ruleList;
					$scope.ruledatas=data.ruleList;
					if(events && events.length > 0){
						$scope.baseTableStatus = false ;
					}else {
						$scope.baseTableStatus = true ;
					}
					
					angular.forEach(events,function(data,index,array){
						if(data.createTime!=null){
							data.createTime =FormartUtils.longToDateStrymd(data.createTime);
						}
					})
					$scope.tableDatas = new ngTableParams({
						page : 1, // show first page
						count : 10, // count per page
						refresh: Math.random()
					}, {
						total : events.length, // length of data
						getData : function($defer, params) {
							if(window.parent && window.parent.iFrameHeight){
								 window.setTimeout(window.parent.iFrameHeight,200);
								}
							$defer.resolve(events.slice((params.page() - 1) * params.count(), params.page() * params.count()));
						}
					});
				})
			}
			
			
			$scope.isiu='新增';
        	$scope.askUserGroupInfo = function(rule){
        		$scope.isiu='修改';
				$scope._rule=angular.copy(rule);
				
			}
        	$scope.rule={};
        	$scope.askSve = function(rule){
        		$scope.isiu='新增';
				$scope._rule={};
				$scope._rule.extAttr4='0';
				
			}
        	
        	$scope.submitCondition = function(callback){
        		  if(!$scope._rule.resourceName){
        			  $.Pop.alerts("请输入产品名称！");
        			  return ;
        		  }
        		  if($scope._rule.resourceName.length>50){
        			  $.Pop.alerts("产品名称最多50个字符！");
        			  return ;
        		  }
        		  if($scope._rule.resourceDesc!=null&&$scope._rule.resourceDesc.length>500){
        			  $.Pop.alerts("产品名称描述最多200个字符！");
        			  return ;
        		  }
				if($scope.isiu=='修改'){
					var params={
    						rid:$scope._rule.rid+'',
    						resourceName:$scope._rule.resourceName,
							extAttr4:$scope._rule.extAttr4,
							resourceDesc:$scope._rule.resourceDesc,
							/*extAttr6:"0,1,2,3",
							extAttr5:"1,2,4",*/
    						servertype : '2'
    				};
					reportService.getByParams(params).then(function(data){
    					$scope.rule={};
    					$scope._rule={};
        				$scope.init($scope.product);
        				if(window.parent && window.parent.iFrameHeightM){
        					window.setTimeout(window.parent.iFrameHeightM,200);
        				}
        				callback.call();
        				
    				});
					
				}else{
					var params={
							resourceName:$scope._rule.resourceName,
							extAttr4:$scope._rule.extAttr4,
							resourceDesc:$scope._rule.resourceDesc,
							extAttr6:"0,1,2,3",
							extAttr5:"1,2,4",
    						servertype : '1'
    				};
					reportService.getByParams(params).then(function(data){
    					$scope.rule={};
    					$scope._rule={};
        				$scope.init($scope.product);
        				if(window.parent && window.parent.iFrameHeightM){
        					window.setTimeout(window.parent.iFrameHeightM,200);
        				}
        				callback.call();
        					
    				});
				}
				
			}
			
        	
        	$scope.stopEvent = function(event){
        		$.Pop.confirms('确认删除'+event.resourceName+'？',function(){
        			var params={
    						rid:event.rid+"",
    						servertype : '3'
    				};
        			reportService.getByParams(params).then(function (data){	
	        			$scope.init($scope.product);
    				});
				});
        		
        		
			}
			
			//查询对象
			$scope.condition = {} ;
			
			//初始化操作
			$scope.query = function(){
				var params = angular.extend({},product,$scope.condition);
				params.vtimecc = Math.random();
				$scope.init(params);
			}
			
			product.servertype = "0" ; //查询
			$scope.product=product;
			$scope.init(product);
			
			
			
    }];
});
