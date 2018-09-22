define([ 'app','appCommon', 'angularAMD','app/service/ReportService','app/directive/TdHighchar','app/directive/TdHighcharMap','app/directive/TdSecondDateCondition',
         'app/directive/TdDateCondition','app/directive/TdFilterBox','app/directive/TdPanel','app/filter/DateStrSubstring',
         'app/directive/TdSelectVersion','app/filter/eventImgFilter','app/filter/eventTitleFilter','app/filter/DateStrSubstringmin15',
         'app/common/TableOptions','app/directive/TdSelect','app/common/HighchartsOptions','app/filter/platFormat','app/common/FormartUtils'],	function(app, angularAMD) {'use strict';
		return ['$scope', '$location', '$filter', 'NgTableParams',"ReportService" ,'$state','$timeout','Upload','$stateParams',
        function($scope, $location, $filter, ngTableParams,reportService,$state,$timeout,Upload,$stateParams) {
			$scope.redrectSummaryRadio = 3;
			$scope.redrectSummaryRuleRadio=2;
			$scope.page;
			$scope.roluser={};
			$scope.roluser.umid=$stateParams.umid;
			$scope.roluser.userName=$stateParams.userName;
			$scope.roluser.email=$stateParams.email;
			$scope.roluser.title=$stateParams.title;
			
			//创建默认实例
			var product = {};
		
        	$scope.stopName="禁用";
        	$scope.rule={};
        	$scope.askSve = function(rule){
        		$scope.isiu='新增';
				$scope._user={};
				//$scope._rule.extAttr4='0';
				
			}
        	
        	
        
        	$scope.submitRoleUser= function(callback){
        		 var roleusers=[];
        		var tableDatas = $scope.tableDatas.data;
        		angular.forEach(tableDatas, function(item,index,array){
					if(item.checked){
						roleusers.push(item.rids);
					}
				});
				var params={
						umid:$scope.roluser.umid,
						rids:roleusers.join("_"),
				};
				reportService.getRoleUserByParams(params).then(function(data){
					$scope._rule={};
    				//$scope.init($scope.product);
    				if(window.parent && window.parent.iFrameHeightM){
    					window.setTimeout(window.parent.iFrameHeightM,200);
    				}
    				if(!data.success){
    					$.Pop.alerts(data.msg);
    					return;
    				}
    				callback.call();
    				if(data.success){
    					//$.Pop.alerts(data.data.pwd);
    					$scope.initTemRoleUser();
    				}
    				
				});
			
        	}
        
        	$scope.usermanage="用户授权";
        	$scope.showRole=false;
       
        	
        	$scope.initTemRoleUser = function(){
        		var roleuserparams={};
        		roleuserparams.vtimecc = Math.random();
        		roleuserparams.umid=$scope.roluser.umid;
				$scope.tableRoleUserLoading = true;
				reportService.getRoleUserListByParams(roleuserparams).then(function(data){
					//获取事件信息
					$scope.tableRoleUserLoading = false;
					var events = data.list;
					$scope.ruledatas=data.ruleList;
					if(events && events.length > 0){
						$scope.baseTableStatus = false ;
					}else {
						$scope.baseTableStatus = true ;
					}
					
					angular.forEach(events,function(data,index,array){
						if(data.update_time!=null){
							data.update_time =FormartUtils.longToDateStr(data.update_time);
						}
					})
					$scope.tableDatasRoleUser = new ngTableParams({
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
        	
        	
        	
        	
        	$scope.stopRoleUser = function(roleUser){
        		/*$.Pop.confirms('确认'+event.resourceName+'？',function(){*/
	        		
        			var params={
    						umid:$scope.roluser.umid+"",
    						rids:roleUser.rids
    				};
        			reportService.deleteUserRole(params).then(function (data){	
	        			$scope.initTemRoleUser();
    				});
				/*});*/
        		
        		
			}
			
        	$scope.initTem = function(params){
    			
				params.vtimecc = Math.random();
				$scope.tableLoading = true;
				reportService.getRoleByParams(params).then(function(data){
					//获取事件信息
					$scope.tableLoading = false;
					var events = data.list;
					$scope.ruledatas=data.ruleList;
					if(events && events.length > 0){
						$scope.baseTableStatus = false ;
					}else {
						$scope.baseTableStatus = true ;
					}
					
					angular.forEach(events,function(data,index,array){
						if(data.update_time!=null){
							data.update_time =FormartUtils.longToDateStr(data.update_time);
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
			
			//查询对象
			$scope.condition = {} ;
			
			//初始化操作
			$scope.query = function(){
				var params = angular.extend({},product,$scope.condition);
				params.vtimecc = Math.random();
				$scope.initTemRoleUser();
			}
			
			product.servertype = "0" ; //查询
			$scope.product=product;
			$scope.initTem(product);
			$scope.initTemRoleUser();
			
			
    }];
});
