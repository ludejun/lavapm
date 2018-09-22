define([ 'app','appCommon', 'angularAMD','app/service/ReportService','app/directive/TdHighchar','app/directive/TdHighcharMap','app/directive/TdSecondDateCondition',
         'app/directive/TdDateCondition','app/directive/TdFilterBox','app/directive/TdPanel','app/filter/DateStrSubstring',
         'app/directive/TdSelectVersion','app/filter/eventImgFilter','app/filter/DateStrSubstringmin10','app/filter/DateStrSubstringmin15',
         'app/common/TableOptions','app/directive/TdSelect','app/common/HighchartsOptions','app/filter/platFormat','app/common/FormartUtils'],	function(app, angularAMD) {'use strict';
		return ['$scope', '$location', '$filter', 'NgTableParams',"ReportService" ,'$state','$timeout','Upload','$stateParams',
        function($scope, $location, $filter, ngTableParams,reportService,$state,$timeout,Upload,$stateParams) {
			$scope.redrectSummaryRadio = 2;
			$scope.redrectSummaryRuleRadio=2;
			$scope.page;
			//创建默认实例
			var product = {};
			$scope.currentCategory = {};
			if(window.parent && window.parent.iFrameHeight){
				window.setTimeout(window.parent.iFrameHeight,200);
			}
			$scope.askTempletmanageView = function(data){
			    appConfig.Templetmanage=data!=null?data:{};
			}
			$scope.isShowOperation= function(user){
				angular.forEach($scope.datas,function(data,index,array){
					if(data.rid!=user.rid){
						data.isShowOperation=false;
					}
					
				})
				if(user.isShowOperation==null||user.isShowOperation==false){
					user.isShowOperation=true;	
				}else{
					user.isShowOperation=false;
				}
				
				if(window.parent && window.parent.iFrameHeight){
					  window.setTimeout(window.parent.iFrameHeight,200);
				}
			}
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
			
			//deleteDepartment updateDepartmentByPrimaryKey insertDepartment
		
			$scope.statusList=[
				{name:"启用",value:"0"},
				{name:"禁用",value:"1"}
			]
			
			$scope.genderList=[
   				{name:"男",value:"男"},
   				{name:"女",value:"女"}
			 ]
			
			$scope.qdUserList=new Array();
			
			//添加 
			$scope.addUserList = function(params){
				var romovearr=new Array();
				var a=[];
				angular.forEach($scope.inittableParams.data,function(data,index,array){
					if(data.checked){
						$scope.qdUserList.push(data.rid);
						$scope.datasdepttableParams.data.push(data);
						
						angular.forEach($scope.qxUserList,function(item,_index,array){
							if(data.rid==item){
								$scope.qxUserList[_index]=0;
							}
						});
						
						
					}else{
						romovearr.push(data);
						
					}

				})
				/*for(var i = 0; i < a.length; i++){
					$scope.qxUserList[i]=0;
				}*/
			var table = { 	
					datas:	$scope.datasdepttableParams.data
						};
			$scope.datasdepttableParams = TableOptions.defaultTableAsc(table,ngTableParams,$filter);
			var tableinit = { 	
					datas:romovearr
			};
			$scope.inittableParams = TableOptions.defaultTableAsc(tableinit,ngTableParams,$filter);
			}
			
			$scope.qxUserList=new Array();
			//取消
			$scope.romoveUserList= function(params){
				var romovearr=new Array();
				var a=[];
				angular.forEach($scope.datasdepttableParams.data,function(data,index,array){
					if(data.checked){
						$scope.inittableParams.data.push(data);
						$scope.qxUserList.push(data.rid);
						angular.forEach($scope.qdUserList,function(item,_index,array){
							if(data.rid==item){
								$scope.qdUserList[_index]=0;
							}
						});
						//$scope.qdUserList.splice(index,1);
					}else{
						romovearr.push(data);
						
					}
				})
				/*for(var i = 0; i < a.length; i++){
					$scope.qdUserList.splice(a[i], 1);
				}*/
				$scope.datasdepttableParams.data=romovearr;
				
				var table = { 	
						datas:	romovearr
							};
				$scope.datasdepttableParams = TableOptions.defaultTableAsc(table,ngTableParams,$filter);
				var tableinit = { 	
						datas:$scope.inittableParams.data
				};
				$scope.inittableParams = TableOptions.defaultTableAsc(tableinit,ngTableParams,$filter);
				
			}
			
			$scope.submitEditUser= function(){
				var params={
					qdurids:$scope.qdUserList&&$scope.qdUserList.length>0?$scope.qdUserList.join(","):"",
					qxurids:$scope.qxUserList&&$scope.qxUserList.length>0?$scope.qxUserList.join(","):"",
					rootdeptrid:$scope.roorid+"",
					deptrid:$scope.editUserderid+""
				}
				reportService.editUsers(params).then(function(data){
					$scope.qdUserList=new Array(); 
					$scope.qxUserList=new Array();
				});
         	}
			$scope.deleteDepartment = function(params){
				reportService.deleteDepartment(params).then(function(data){
	   				if(!data.success){
	   					$.Pop.alerts(data.msg);
	   					return;
	   				}
	   				if(data.success){
	   					$scope.initTree();
	   				}
				});
				
			}
			
        	$scope.askSveDepartment = function(Department){
        		$scope.isiuDepartment='新增';
				$scope._Department={};
				$scope._Department.parenDeptName=$scope._deptName;
				
				//$scope._rule.extAttr4='0';
				
			}
			
        	
         	$scope.submitDepartment= function(callback){
         		if(!$scope._Department.deptName){
	      			  $.Pop.alerts("请输入部门名称！");
	      			  return ;
      		     }
         		if($scope._Department.deptName.length>30){
	      			  $.Pop.alerts("最大长度=30字符");
	      			  return ;
    		     }
       		     var roleusers=[];
	       		
       		    if($scope.isiuDepartment=='修改'){
       		    	var params={
       		    			rid:$scope._Department.rid,
							deptName:$scope._Department.deptName,
							deptDesc:$scope._Department.deptDesc,
							parentRid:$scope._Department.parentRid,
							qdurids:$scope.qdUserList&&$scope.qdUserList.length>0?$scope.qdUserList.join(","):"",
							qxurids:$scope.qxUserList&&$scope.qxUserList.length>0?$scope.qxUserList.join(","):"",
							rootdeptrid:$scope.roorid+"",
							deptrid:$scope.editUserderid+""
					};
					reportService.updateDepartmentByPrimaryKey(params).then(function(data){
		   				if(!data.success){
		   					$.Pop.alerts(data.msg);
		   					return;
		   				}
		   				callback.call();
		   				if(data.success){
		   					$scope.initTree();
		   				}
					});
					
				}else{
					
					var params={
							deptName:$scope._Department.deptName,
							deptDesc:$scope._Department.deptDesc,
							parentRid:$scope._Department.parentRid!=null&&$scope._Department.parentRid!=''?$scope._Department.parentRid:$scope.roorid,
							qdurids:$scope.qdUserList&&$scope.qdUserList.length>0?$scope.qdUserList.join(","):"",
							qxurids:$scope.qxUserList&&$scope.qxUserList.length>0?$scope.qxUserList.join(","):"",
							rootdeptrid:$scope.roorid+"",
							deptrid:$scope.editUserderid+""
					};
					reportService.insertDepartment(params).then(function(data){
		   				if(!data.success){
		   					$.Pop.alerts(data.msg);
		   					return;
		   				}
		   				callback.call();
		   				if(data.success){
		   					$scope.initTree();
		   				}
					});
				}
       	     }
         	
         	
         	$scope.getByDeptRidUserParams = function(params){
    			
				params.vtimecc = Math.random();
				$scope.tableLoading = true;
				reportService.getByDeptRidUserParams(params).then(function(data){
					//获取事件信息
						$scope.datasdept = data.list;
						
						var table = { 	datas:$scope.datasdept
						};
						$scope.datasdepttableParams = TableOptions.defaultTableAsc(table,ngTableParams,$filter);
				})
			}
         	
         	$scope.getByDeptRidUser = function(params){
    			
				params.vtimecc = Math.random();
				reportService.getByDeptRidUserParams(params).then(function(data){
					//获取事件信息
						$scope.datasdept = data.list;
						
						var table = { 	datas:$scope.datasdept
						};
						$scope.datasdepttableParams = TableOptions.defaultTableAsc(table,ngTableParams,$filter);
				})
			}
			//初始化操作
			$scope.init = function(params,init,edit){
			
				params.vtimecc = Math.random();
				$scope.tableLoading = true;
				reportService.getByUserParams(params).then(function(data){
					//获取事件信息
					$scope.tableLoading = false;
					if(init){
						$scope.initdatas = data.list;
						var table = { 	datas:$scope.initdatas
						};
						$scope.inittableParams = TableOptions.defaultTableAsc(table,ngTableParams,$filter);
					}
					if(edit==null){
						$scope.datas = data.list;
						$scope.ruledatas=data.ruleList;
						angular.forEach($scope.datas,function(data,index,array){
							if(data.createTime!=null){
								data.createTime =FormartUtils.longToDateStr(data.createTime);
							}
						})
						var table = { 	datas:$scope.datas
						};
						$scope.tableParams = TableOptions.defaultTableAsc(table,ngTableParams,$filter);
					}
					
				})
			}
			
			$scope.initparams = function(params,init,edit){
			
				params.vtimecc = Math.random();
				reportService.getByUserParams(params).then(function(data){
					//获取事件信息
					$scope.tableLoading = false;
					if(init){
						$scope.initdatas = data.list;
						var table = { 	datas:$scope.initdatas
						};
						$scope.inittableParams = TableOptions.defaultTableAsc(table,ngTableParams,$filter);
					}
					if(edit==null){
						$scope.datas = data.list;
						$scope.ruledatas=data.ruleList;
						angular.forEach($scope.datas,function(data,index,array){
							if(data.createTime!=null){
								data.createTime =FormartUtils.longToDateStr(data.createTime);
							}
						})
						var table = { 	datas:$scope.datas
						};
						$scope.tableParams = TableOptions.defaultTableAsc(table,ngTableParams,$filter);
					}
					
				})
			}
			
			
			$scope.isiu='新增';
        	$scope.askUserGroupInfo = function(user){
        		$scope.isiu='修改';
        		user.isShowOperation=false;
        		/*var tableParams = $scope.tableParams.data;
        		var user={};
        		var num=0;
        		angular.forEach(tableParams, function(data,index,array){
					if(data.checked){
						user=data;
						num++;
					}
				});
        		if(num>1){
        			$.Pop.alerts("只能选择一个用户！");
        		}else if(num<1){
        			$.Pop.alerts("请选择一个用户！");
        		}else{*/
        			$("#update").click();
        			$scope._user=angular.copy(user);
        			$scope._user.status=$scope.statusList[$scope._user.status];
        			if($scope._user.gender=='男'){
        				$scope._user.gender=0;
        			}else{
        				$scope._user.gender=1;
        			}
    				$scope._user.gender=$scope.genderList[$scope._user.gender];
        		/*}*/
				
				
			}
        	$scope.stopName="禁用";
        	$scope.rule={};
        	$scope.askSve = function(rule){
        		$scope.isiu='新增';
				$scope._user={};
				$scope._user.status=$scope.statusList[0];
				$scope._user.gender=$scope.genderList[0];
				//$scope._rule.extAttr4='0';
				//$scope.initTem(product);
				
			
			}
        	
        	$scope.askSveRole = function(rule){
				$scope.initTem(product);
			}
        	
        	$scope.checkall=function(ischec){
        		var tableParams = $scope.tableParams.data;
				angular.forEach($scope.datas, function(data,index,array){
					   if(ischec){
						   data.checked = true;
					   }else{
						   data.checked = false;
					   }
						
				});
        	}
        	$scope.checkallrole=function(ischec){
        		var tableParams = $scope.tableDatas.data;
				angular.forEach(tableParams, function(data,index,array){
					   if(ischec){
						   data.checked = true;
					   }else{
						   data.checked = false;
					   }
						
				});
        	}
        	$scope.checkEditUser=function(data){
        		data.checked==false||data.checked==null||data.checked==''?data.checked=true:data.checked=false;
        	}
        	$scope.checkselectUninfousr=function(data,flg){
        		var tableParams = $scope.tableParams.data;
        		angular.forEach(tableParams, function(item,index,array){
					if(item.umid!=data.umid&&item.rid!=data.rid){
						item.checked=false;
					}
				});
        		if(flg==1){
        			data.checked==false||data.checked==null||data.checked==''?data.checked=true:data.checked=false;
        		}
        		
				if(data.checked&&data.status=='1'){
					$scope.stopName="启用";
				}else{
					$scope.stopName="禁用";
				}
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
        	$scope.submitCondition = function(callback){
        		  if(!$scope._user.userName){
        			  $.Pop.alerts("请输入姓名！");
        			  return ;
        		  }
        		  if(!$scope._user.umid){
        			  $.Pop.alerts("请输入登录账号！");
        			  return ;
        		  }
        		/*  if(!$scope._user.email){
        			  $.Pop.alerts("请输入电子邮箱！");
        			  return ;
        		  }*/
        		  if(!$scope._user.title){
        			  $.Pop.alerts("请输入职位！");
        			  return ;
        		  }
        		  if(!$scope._user.mobile){
        			  $.Pop.alerts("请输入手机！");
        			  return ;
        		  }
        		  var reemail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
         		     if(!(reemail.test($scope._user.umid))){
         		    	 $.Pop.alerts("登录账号必须是邮箱账号！"); 
          		        return false; 
         		     }
        		  var  re = /^1\d{10}$/
        		  if(!(re.test($scope._user.mobile))){ 
        			  $.Pop.alerts("请输入正确的手机号！"); 
        		        return false; 
        		    } 
        		  
				if($scope.isiu=='修改'){
					var params={
							rid:$scope._user.rid,
							umid:$scope._user.umid,
							userName:$scope._user.userName,
							/*email:$scope._user.email,*/
							title:$scope._user.title,
							mobile:$scope._user.mobile,
							gender:$scope._user.gender.value,
							status : $scope._user.status.value,
							deptRid:$scope.currentCategory.nodeId,
							userDesc:$scope._user.userDesc
    				};
					reportService.getSaveByUserParams(params).then(function(data){
    					$scope._rule={};
        				$scope.init($scope.product);
        				if(window.parent && window.parent.iFrameHeightM){
        					window.setTimeout(window.parent.iFrameHeightM,200);
        				}
        				callback.call();
        				$.Pop.alerts(data.msg);
        				
    				});
					
				}else{
					var params={
							isShowPwd:'1',
							isMail:'1',
							umid:$scope._user.umid,
							userName:$scope._user.userName,
							email:$scope._user.email,
							title:$scope._user.title,
							mobile:$scope._user.mobile,
							gender:$scope._user.gender.value,
							status : $scope._user.status.value,
							deptrid:$scope.currentCategory.nodeId,
							userDesc:$scope._user.userDesc
    				};
					reportService.getSaveByUserParams(params).then(function(data){
    					$scope._rule={};
        				$scope.init($scope.product);
        				if(window.parent && window.parent.iFrameHeightM){
        					window.setTimeout(window.parent.iFrameHeightM,200);
        				}
        				if(!data.success){
        					$.Pop.alerts(data.msg);
        					return;
        				}
        				callback.call();
        				if(data.success){
        					$.Pop.alerts(data.data.msg);
        				}
        				
    				});
				}
				
			}
         	$scope.usermanage="用户管理";
        	$scope.showPage=false;
        	if(appConfig.roluser){
        		$scope.showPage=true;
        		$scope.roluser=appConfig.roluser;
        		$scope.currentCategory.nodeId=appConfig.nodeId;
        		$scope.usermanage="用户授权";
        		$scope.initTemRoleUser();
        		appConfig.roluser=null;
        	}
        	$scope.goRole=function(user){
        		
        		if(user){
        			user.isShowOperation=false;
        			/*var tableParams = $scope.tableParams.data;
            		var user;
            		angular.forEach(tableParams, function(data,index,array){
    					if(data.checked){
    						user=data;
    					}
    				});
            		if(user==null){
            			$.Pop.alerts("请选择用户！");
            			return;
            		}*/
        			
        			$scope.showPage=true;
        			
        			$scope.usermanage="用户授权";
        			$scope.roluser=user;
        		}else{
        			$scope.showPage=false;
        			$scope.usermanage="用户管理";
        		}
        		
        		//$state.go('nativepage/userrolemanage',{umid:$scope.roluser.umid,userName:$scope.roluser.userName,email:$scope.roluser.email,title:$scope.roluser.title});
        		$scope.initTemRoleUser();
        	}
        	
        
        	$scope.ResetPwd = function(user){
        		$.Pop.confirms('确认重置'+user.umid+'的密码？',function(){
	        	
        			user.isShowOperation=false;
        			var params={
    						umid:user.umid+"",
    						isShowPwd:'2',
    						isMail:'1',
    				};
        			reportService.getResetPwdByParams(params).then(function (data){	
	        			$scope.init($scope.product);
        				$.Pop.alerts(data.msg);
    				});
        		});
        		
        		
			}
        	
        	$scope.deleteUser = function(user){
        		$.Pop.confirms('确定删除用户'+user.umid+'！',function(){
        			user.isShowOperation=false;
        			var params={
    						umid:user.umid+""
    				};
        			reportService.deleteUser(params).then(function (data){	
	        			$scope.init($scope.product);
        				//$.Pop.alerts(data.msg);
    				});
				});
        			
			}
        	
        	$scope.stopUser = function(user){
        		/*$.Pop.confirms('确认'+event.resourceName+'？',function(){*/
        			var params={
    						umid:user.umid+""
    				};
        			reportService.getChangeStatusByUserParams(params).then(function (data){	
	        			$scope.init($scope.product);
    				});
				/*});*/
        		
        		
			}
        	
        	$scope.stopRoleUser = function(roleUser){
        		$.Pop.confirms('确定禁用模板'+roleUser.t_name+'！',function(){
        			var params={
    						umid:$scope.roluser.umid+"",
    						rids:roleUser.rids
    				};
        			reportService.deleteUserRole(params).then(function (data){	
	        			$scope.initTemRoleUser();
    				});
				});
        		
			}
			
        	$scope.initTem = function(params){
    			
				params.vtimecc = Math.random();
				$scope.tableLoading = true;
				reportService.getRoleByParams(params).then(function(data){
					//获取事件信息
					$scope.tableLoading = false;
					var events = data.list;
					var _events=[];
					$scope.ruledatas=data.ruleList;
					if(events && events.length > 0){
						$scope.baseTableStatus = false ;
					}else {
						$scope.baseTableStatus = true ;
					}
					var indexSize=0;
					var tableDatasRoleUser= $scope.tableDatasRoleUser!=null?$scope.tableDatasRoleUser.data:[];
					angular.forEach(events,function(data,index1,array){
						if(data.update_time!=null){
							data.update_time =FormartUtils.longToDateStr(data.update_time);
						}
						var isShow=true;
						angular.forEach(tableDatasRoleUser, function(item,index,array){
							 if(data.t_name==item.t_name){
								 isShow=false;
							 }
					     });
						if(isShow){
							 _events.push(data);
						 }
					})
					
					$scope.tableDatas = new ngTableParams({
						page : 1, // show first page
						count : 5, // count per page
						refresh: Math.random()
					}, {
						total : _events.length, // length of data
						counts:[5],
						getData : function($defer, params) {
							if(window.parent && window.parent.iFrameHeight){
								 window.setTimeout(window.parent.iFrameHeight,200);
								}
							$defer.resolve(_events.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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
				$scope.init(params);
			}
			
			$scope.addHoverDom = function(treeId, treeNode) {
				//console.dir(["treeId",treeId]);
				//console.dir(["treeNode",treeNode]);
				var _Obj = $("#" + treeNode.tId+ "_a");
				var addStr1 = 
				    "<span id='_showspan1' class='dewidth'>" +
					  "<ul style='padding-left: 0px;'>" +
					  "<li id='addchildrende' style='padding-left: 10px;'>" +
					  "<span class='button addcdept'></span>"+
			          "<span class='item-operator-name'>添加子级部门</span>" +
					  "</li>"+
					  "<li id='edietde' style='padding-left: 10px;'>" +
					  "<span class='button edit'></span>"+
			          "<span class='item-operator-name'>编辑部门</span>" +
					  "</li>" +
					  "<li id='deletede' style='padding-left: 10px;'>" +
					  "<span class='button remove'></span>"+
			          "<span class='item-operator-name'>删除部门</span>" +
					  "</li>" +
					  "<li id='addlevelde' style='padding-left: 10px;'>" +
					  "<span class='button adddept'></span>"+
			          "<span class='item-operator-name'>添加同级部门</span>" +
					  "</li>" +
					
					/*  "<li id='editUserde' style='padding-left: 10px;'>编辑用户</li>" +*/
					  "</ul>" +
					"</span>";
				
				var addStr2 = 
				    "<span id='_showspan1' class='dewidth' style='height: 82px;'>" +
					  "<ul style='padding-left: 0px;'>" +
					  "<li id='edietderoot' style='padding-left: 10px;'>" +
					  "<span class='button edit'></span>"+
			          "<span class='item-operator-name'>编辑部门</span>" +
					  "</li>" +
					  "<li id='addchildrende' style='padding-left: 10px;'>" +
					  "<span class='button addcdept'></span>"+
			          "<span class='item-operator-name'>添加子级部门</span>" +
					  "</li>"+
					  "</ul>" +
					"</span>";
				var edietde = $("#edietde");
				var edietderoot = $("#edietderoot");
				var deletede = $("#deletede");
				var addlevelde = $("#addlevelde");
				var addchildrende = $("#addchildrende");
				var editUserde = $("#editUserde");
				$scope.qdUserList=new Array();
				$scope.qxUserList=new Array();
				if (edietde) edietde.bind("click", function(){
					$('#_showspan1').hide();
					$scope._Department={};
					$scope._Department.deptName = treeNode.deptName;
					$scope._Department.deptDesc = treeNode.deptDesc;
					$scope._Department.rid= treeNode.rid;
					$scope._Department.parentRid=treeNode.parentRid;
					$scope._Department.parenDeptName=treeNode.parentName;
					$scope.isiuDepartment="修改";
					$scope.editUserderid=treeNode.rid;
					var roorids={}
					roorids.deptRid=$scope.roorid+'';
					roorids.odeptRid=treeNode.rid;+'';
					roorids.servertype="0";
					$scope.initparams(roorids,'init','edit');
					$scope.getByDeptRidUser($scope.product);
					$("#updateDepartment").click();
					
				});
				if (edietderoot) edietderoot.bind("click", function(){
					$('#_showspan1').hide();
					$scope._Department={};
					$scope._Department.deptName = treeNode.deptName;
					$scope._Department.deptDesc = treeNode.deptDesc;
					$scope._Department.rid= treeNode.rid;
					$scope._Department.parentRid=treeNode.parentRid;
					$scope._Department.parenDeptName=treeNode.parentName;
					$scope.isiuDepartment="修改";
					$scope.editUserderid=treeNode.rid;
					var roorids={}
					roorids.deptRid=$scope.roorid+'';
					roorids.odeptRid=treeNode.rid;+'';
					roorids.servertype="0";
					$scope.initparams(roorids,'init','edit');
					$scope.getByDeptRidUser($scope.product);
					$("#updateDepartmentroot").click();
					
				});
				if (deletede) deletede.bind("click", function(){
					$.Pop.confirms('删除部门会同时删除所有子部门和并把所有用户放入顶级部门！',function(){
						var params={
								rid:treeNode.rid,
								roorid:$scope.roorid
						};
						$scope.deleteDepartment(params);
					});
					
				});
				
				if (addlevelde) addlevelde.bind("click", function(){
					$scope._Department={};
					$scope._Department.parentRid=treeNode.parentRid;
					$scope._Department.parenDeptName=treeNode.parentName;
					$scope.isiuDepartment="新增";
					$scope.editUserderid=treeNode.rid;
					var roorids={}
					roorids.deptRid=$scope.roorid+'';
					roorids.odeptRid=0+'';
					roorids.servertype="0";
					$scope.initparams(roorids,'init','edit');
					var par=angular.copy($scope.product);
					par.deptRid=0+"";
					$scope.getByDeptRidUser(par);
					$('#_showspan1').hide();
					$("#updateDepartment").click();
				});
				if (editUserde) editUserde.bind("click", function(){
					$scope.editUserderid=treeNode.rid;
					var roorids={}
					roorids.deptRid=$scope.roorid+'';
					roorids.odeptRid=treeNode.rid;+'';
					roorids.servertype="0";
					$scope.initparams(roorids,'init','edit');
					$scope.getByDeptRidUser($scope.product);
					$('#_showspan1').hide();
					$("#editDepartment").click();
					
				});
				
				
				if (addchildrende) addchildrende.bind("click", function(){
					$('#_showspan1').hide();
					$scope._Department={};
					$scope._Department.parentRid=treeNode.rid;
					var level=treeNode.level
					if(level>4){
						$.Pop.alerts("最多支持5级部门。");
					}else{
						$scope._Department.parenDeptName=treeNode.deptName;
						$scope.editUserderid=treeNode.rid;
						var roorids={}
						roorids.deptRid=$scope.roorid+'';
						roorids.odeptRid=0+'';
						roorids.servertype="0";
						$scope.initparams(roorids,'init','edit');
						var par=angular.copy($scope.product);
						par.deptRid=0+"";
						$scope.getByDeptRidUser(par);
						$scope.isiuDepartment="新增";
						$("#updateDepartment").click();
					}
				});
				$('#_showspan1').hover(function(){
					   //$(this).show();
					  }, function(){
					   $(this).remove();
				});
				var sObj = $("#" + treeNode.tId + "_span");
				if (treeNode.editNameFlag || $("#addTagsBtn_"+treeNode.tId).length>0) return;
			
				
				var addStr="<div style='float: right;margin-right: -5px;' class='button add-tags' id='addTagsBtn_" + treeNode.tId
					+ "' title='操作' onfocus='this.blur();'>操作<i class='add-dept-user'>&nbsp;&nbsp;&nbsp;&nbsp;</i></div>";
				sObj.after(addStr);
			/*	$('#_showspan1').hover(function(){
					  $(this).remove();
					  }, function(){
					  $(this).remove();
				});
				*/
				var btn = $("#addTagsBtn_"+treeNode.tId);
				if (btn) btn.bind("click", function(event){
					/**/
					var x=event.pageX || (event.clientX +(document.documentElement.scrollLeft || document.body.scrollLeft));
					var y=event.pageY || (event.clientY +(document.documentElement.scrollTop || document.body.scrollTop));
					if(treeNode.parentRid){
					    _Obj.after(addStr1)
					}else{
						_Obj.after(addStr2)
					}
					y=y-5;
					 if(y>440){
						y=y-130; 
					 }
					 $('#_showspan1').css({'left':''+(x-15)+'px','top':''+y+'px'});
					//return false;
					/*
					$scope.selectedTagList = [];
					$scope.isShowFirstTagDropdownMenu = false;
					var nodeName = treeNode.name;
					var nodeId = treeNode.id;
					$scope.currentCategory.name = nodeName;
					$scope.currentCategory.nodeId = nodeId;
					$('#btnShowAddTags').click();
					var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
					zTree.selectNode(treeNode);
					$('#btn-search').trigger('click');
					$scope.queryTagListByTagCategory();
					return false;
				*/});
				
				var viewBtn = $("#viewPortraitBtn_"+treeNode.tId);
				if (viewBtn) {
					viewBtn.bind("click", function(){
						var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
						zTree.selectNode(treeNode);
						var $this = $(this);
						var tagId = $.trim($this.attr("tagId"));
						if(tagId != ""){
							//window.open("#/tag/portrait/list/"+tagId);
							window.location.href = "#/tag/tags/portrait/"+tagId;
						}
						return false;
					});
				}
			}
			
			$scope.removeHoverDom = function(treeId, treeNode) {
				$("#addBtn_"+treeNode.tId).unbind().remove();
				$("#viewPortraitBtn_"+treeNode.tId).unbind().remove();
				$("#addTagsBtn_"+treeNode.tId).unbind().remove();
				
				
			}
			
			
			$scope.showRenameBtn = function(treeId, treeNode){
				return true;//!treeNode.isLastNode;
			}
			
			$scope.beforeDrag = function(treeId, treeNodes){
				return false;
			}

			$scope.showRemoveBtn = function(treeId, treeNode){
				return true;
				/*if(treeNode.children && treeNode.children.length > 0){
					return false;
				}else{
					return true;
				}*/
				//return !treeNode.isFirstNode;
			}
			
			$scope.beforeEditName = function(treeId, treeNode){
				zTreeOptions.className = (zTreeOptions.className === "dark" ? "":"dark");
				//$.Pop.alerts("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
				var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
				zTree.selectNode(treeNode);
				return true;
				//return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
			}
			
			$scope.beforeRemove = function(treeId, treeNode){
				zTreeOptions.className = (zTreeOptions.className === "dark" ? "":"dark");
				//$.Pop.alerts("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
				var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
				zTree.selectNode(treeNode);
				$scope.onRemove('',treeId, treeNode);
				return false;
				//return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
			}
			
			$scope.beforeRename = function(treeId, treeNode, newName, isCancel){
				zTreeOptions.className = (zTreeOptions.className === "dark" ? "":"dark");
				//$.Pop.alerts((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
				$scope.oldName = treeNode.name;
				if (newName.length == 0) {
					$.Pop.alerts("节点名称不能为空.");
					//var zTree = $.fn.zTree.getZTreeObj("tagCategoryTree");
					//setTimeout(function(){zTree.editName(treeNode)}, 10);
					return false;
				}else{
					/*var nodeId = treeNode.id;
					var parentId = "";
					if(treeNode.parentId){
						parentId = treeNode.parentId;
					}else if(treeNode.pId){
						parentId = treeNode.pId;
					}*/
					
					
					/*var isExist = false;
					var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
					var parentNode = treeObj.getNodeByParam("id",parentId, null);
					var siblingsNodes = parentNode.children;
					if(siblingsNodes.length > 0){
						for(var i = 0; i < siblingsNodes.length; i++){
							if(siblingsNodes[i].id == nodeId){
								$scope.oldName = siblingsNodes[i].name;
								//isExist = true;
								break;
							}
						}
					}*/
					
				}
				return true;
			}
			
			$scope.onRemove = function(e, treeId, treeNode){
				if(treeNode.children && treeNode.children.length > 0){
					$.Pop.alerts("存在子分类或标签，不能删除!");
					return false;
				}
				$.Pop.confirms('确定要删除"'+treeNode.name+'"？',function(){
					var nodeName = treeNode.name;
					var nodeId = treeNode.id;
					var tagCategory = {
						//id : nodeId,
						//name: nodeName,
						//parentId: parentId	
					};
					
					var param = {
						url : '/dmp-web/tag/tagCategories/delTagCategories/'+nodeId,
						callType : 'get',
						contentType : 'application/json',
						dataType : 'json',
						data : {}
					};
					
					/*var urlAddress = '/dmp-web/tag/tagCategories/delTagCategories/'+nodeId;
					var callType = 'get';
					var dataType = 'json';
					callApi(tagCategory, urlAddress,callType,dataType, function(response){*/
					$.callApi(param, function(response){
						//$state.reload();
						if(response.success){
							var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
							var nodes = treeObj.getSelectedNodes();
							for (var i=0, l=nodes.length; i < l; i++) {
								treeObj.removeNode(nodes[i]);
							}
						}else{
							$.Pop.alerts(response.msg);
						}
					});
					
				});
				//$.Pop.alerts("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
			}
			
			$scope.onRename = function(e, treeId, treeNode, isCancel){
				var nodeName = $.trim(treeNode.name);
				var nodeId = treeNode.id;
				var parentId = "";
				if(treeNode.parentId){
					parentId = treeNode.parentId;
				}else if(treeNode.pId){
					parentId = treeNode.pId;
				}
				
				var isExist = false;
				var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
				var parentNode = treeObj.getNodeByParam("id",parentId, null);
				if(parentNode){
					var siblingsNodes = parentNode.children;
					if(siblingsNodes.length > 0){
						for(var i = 0; i < siblingsNodes.length; i++){
							if(siblingsNodes[i].id != nodeId && $.trim(siblingsNodes[i].name) == nodeName){
								isExist = true;
								break;
							}
						}
					}
				}
				
				
				if(isExist){
					treeNode.name = $scope.oldName;
					$.Pop.alerts("编辑失败，同级的节点名称不能重复。");
					var tId = treeNode.tId;
					$("#" + tId+'_span').html($scope.oldName);
					return false;
				}
				
				/*var param = {
					url : '/dmp-web/tag/tagCategories/updateTagCategories',
					callType : 'post',
					contentType : 'application/json',
					dataType : 'json',
					data : {
						"id" : nodeId,
						"name": nodeName,
						"parentId": parentId
					}
				};*/
				
				var tagCategory = {
					"id" : nodeId,
					"name": nodeName,
					"parentId": parentId	
				};
				
				var urlAddress = '/dmp-web/tag/tagCategories/updateTagCategories';
				var callType = 'post';
				var dataType = 'json';
				callApi(tagCategory, urlAddress,callType,dataType, function(response){
				//$.callApi(param, function(response){
					console.dir(["response:",response]);
				});
				//$.Pop.alerts((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
			}

			//单击菜单树事件
			$scope.tagCategoryTreeClick = function(event, treeId, treeNode) {
				$scope.showPage=false;
				var nodeName = treeNode.deptName;
				var nodeId = treeNode.rid;
				$scope.currentCategory.name = nodeName;
				$scope.currentCategory.nodeId = nodeId;
				product.servertype = "0" ; //查询
				product.deptRid=nodeId+'';
				$scope.product=product;
				$scope.depttTitle=nodeName;
				$scope.init(product);
				appConfig.nodeId=$scope.currentCategory.nodeId;
				/*$('#btn-search').trigger('click');*/
	        }
			
			var zTreeOptions = {
					zNodes : [],
					nodeList : [],
					className : "dark",
					newCount : 1,
				    setting : {
				    	view: {
				    		addHoverDom: $scope.addHoverDom,
				    		removeHoverDom: $scope.removeHoverDom,
				    		selectedMulti: false
				    	},
				    	edit: {
				    		enable: true,
				    		editNameSelectAll: true,
				    		showRemoveBtn: $scope.showRemoveBtn,
				    		showRenameBtn: $scope.showRenameBtn
				    	},
				    	data: {
				    		simpleData: {
				    			enable: true
				    		}
				    	},
				    	callback: {
				    		beforeDrag: $scope.beforeDrag,
				    		beforeEditName: $scope.beforeEditName,
				    		beforeRemove: $scope.beforeRemove,
				    		beforeRename: $scope.beforeRename,
				    		onRemove: $scope.onRemove,
				    		onRename: $scope.onRename,
				    		onClick: $scope.tagCategoryTreeClick
				    	}
				    }
				}
			
			$scope.resetTagCategory = function(obj){
				if(obj!=null){
					for(var i = 0; i< obj.length;i++){
						if(obj[i].children && obj[i].children.length > 0){
							obj[i].open = true;
							//obj[i].nocheck = true;
							$scope.resetTagCategory(obj[i].children);
						}
					}	
				}
				
			}
			/*$scope.findNodes = function(){
				zTreeOptions.zNodes = $scope.tagCategoryTree;
				//console.dir(["zTreeOptions.zNodes",zTreeOptions.zNodes]);
				$scope.drawZTree();
			}*/
			
			$scope.drawZTree = function(){
				zTreeOptions.zNodes.open = true;
				$scope.resetTagCategory(zTreeOptions.zNodes.children);
				var $tagCategoryTree = $("#tagCategoryTree");
				if(zTreeOptions.zNodes.length == 0){
					$tagCategoryTree.html("<span style='margin-left: 90px;'>无匹配的部门</span>");
				}else{
					$.fn.zTree.init($tagCategoryTree, zTreeOptions.setting, zTreeOptions.zNodes);
				}
				
				var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
	        	if(treeObj){
	        		var nodes = treeObj.getNodes();
	    			//$scope.selectTagCategory(nodes);
	        	}
			}
			
			$scope.drawZTreeroot = function(){
				zTreeOptions.zNodes.open = true;
				$scope.resetTagCategory(zTreeOptions.zNodes.children);
				var $tagCategoryTree = $("#tagCategoryTree");
				if(zTreeOptions.zNodes.length == 0){
					$tagCategoryTree.html("<span style='margin-left: 90px;'>无匹配的部门</span>");
				}else{
					$.fn.zTree.init($tagCategoryTree, zTreeOptions.setting, zTreeOptions.zNodes);
				}
				
				var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
	        	if(treeObj){
	        		var nodes = treeObj.getNodes();
	    			$scope.selectTagCategory(nodes);
	        	}
			}
			$scope.initp={};
			$scope.selectTagCategory = function(nodes){//选中当前的节点
				var flg=true;
				for(var i = 0;i < nodes.length;i++){
					if(nodes[i].rid == $scope.currentCategory.nodeId){
						var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
						treeObj.selectNode(nodes[i]);
						$scope.currentCategory.name = nodes[i].deptName;
						$scope.initp.servertype = "0" ; //查询
						$scope.initp.deptRid=$scope.currentCategory.nodeId+'';
						$scope.depttTitle=$scope.currentCategory.name;
						$scope.init($scope.initp,'init');
						flg=false;
						break;
					}
					if(nodes[i].children && nodes[i].children.length > 0){
						$scope.selectTagCategory(nodes[i].children);
					}
				}
				if(flg){
						var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
						treeObj.selectNode(nodes[0]);
						$scope.currentCategory.name = nodes[0].deptName;
						$scope.initp.servertype = "0" ; //查询
						$scope.initp.deptRid=nodes[0].rid+'';
						$scope.depttTitle=$scope.currentCategory.name;
						$scope.init($scope.initp,'init');
					
					if(nodes[0].children && nodes[0].children.length > 0){
						$scope.selectTagCategory(nodes[0].children);
					}
				}
			}
		
			
			
			$scope.initTree = function(){
				reportService.treeDepartmentList(product).then(function(data){
					$scope.tagCategoryTree=data.list[0];
					$scope._deptName=data.list[0].deptName;
					$scope._Department={};
					$scope._Department.parentRid=data.list[0].rid;
					if($scope.currentCategory.nodeId==null||$scope.currentCategory.nodeId==''){
						$scope.currentCategory.nodeId=$scope.tagCategoryTree.rid;
						$scope.roorid=$scope.tagCategoryTree.rid;
						product.servertype = "0" ; //查询
						product.deptRid=$scope.tagCategoryTree.rid;
						$scope.product=product;
					}
					$scope.findNodesroot();
					if(window.parent && window.parent.iFrameHeightM){
						window.setTimeout(window.parent.iFrameHeightM,200);
					}
						
				});
			}
			$scope.tagCategortSearch = {
	    			name : ''
	    		};
			$scope.initTree();
			
			$scope.findNodesroot = function(){
				if(!$scope.tagCategortSearch.name){
					zTreeOptions.zNodes = $scope.tagCategoryTree;
				}else{
					var newNodes = $scope.resetNodes();
					zTreeOptions.zNodes = newNodes;
				}
				//console.dir(["zTreeOptions.zNodes",zTreeOptions.zNodes]);
				$scope.drawZTreeroot();
			}
			
			$scope.findNodes = function(){
				if(!$scope.tagCategortSearch.name){
					zTreeOptions.zNodes = $scope.tagCategoryTree;
				}else{
					var newNodes = $scope.resetNodes();
					zTreeOptions.zNodes = newNodes;
				}
				//console.dir(["zTreeOptions.zNodes",zTreeOptions.zNodes]);
				$scope.drawZTree();
			}
			
			$scope.clearTagCategortSearch = function(){
	    		$scope.tagCategortSearch.name = "";
	    		$scope.findNodes();
	    	}
			
			$scope.resetNodes = function(){
				var newNodes = [];
				//var treeObj = $.fn.zTree.getZTreeObj("tagCategoryTree");
				//newNodes =  treeObj.getNodesByParamFuzzy("name", $scope.tagCategoryKeywords, null);
				var treeData = angular.copy($scope.tagCategoryTree);
				var nodes=[treeData];
				newNodes = $scope.getNodesByParamFuzzy(nodes,'deptName',$scope.tagCategortSearch.name);
				return newNodes;
			};
			
			$scope.getNodesByParamFuzzy = function(nodes, key, value) {
				if (!nodes || !key) return [];
				var childKey = 'children',
				result = [];
				value = value.toLowerCase();
				for (var i = 0, l = nodes.length; i < l; i++) {
					if (typeof nodes[i][key] == "string") {
						if(nodes[i][key].toLowerCase().indexOf(value)>-1){
							result.push(nodes[i]);
						}else{
							//console.dir(["nodes[i][childKey]",nodes[i][childKey]]);
							
							if(nodes[i][childKey]){
								/*var parentNode = nodes[i];
								var children = [];
								for(var j = 0; j < nodes[i][childKey].length; j++){
									if(typeof nodes[i][childKey][j][key] == "string" && nodes[i][childKey][j][key].indexOf(value) > -1){
										children.push(nodes[i][childKey][j]);
									}
								}
								if(children.length > 0){
									parentNode.children = children;
									result.push(parentNode);
								}*/
								result = result.concat($scope.getNodesByParamFuzzy( nodes[i][childKey], key, value));
							}
							
						}
					}
					
				}
				return result;
			};
    }];
});
