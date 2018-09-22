define([ 'app','appCommon', 'angularAMD','app/service/ReportService','app/directive/TdSecondDateCondition',
         'app/directive/TdDateCondition','app/directive/TdHtml','app/directive/TdPanel',
         'app/directive/TdSelectUsergroup','app/directive/TdCalendar',
         'app/filter/Substring4',
         'app/filter/platFormat'
         ],	function(app, angularAMD) {'use strict';
		return ['$scope', '$location', '$filter','BreakCrumbService',"ReportService" ,"$state",'$stateParams',
		        
        function($scope, $location, $filter,BreakCrumbService,reportService,$state,$stateParams) {
			$scope.redrectSummaryRadio = 1;
			$scope.redrectSummaryRuleRadio=2;
			$scope.dataroot={};
			$scope.dataproduct={};
			/*tid&tname&tdesc*/
			var tname= $stateParams.tname;
			var tdesc= $stateParams.tdesc;
			$scope.onupdate=$stateParams.onupdate;
			$scope.templet={};
			$scope.templet.tname=tname;
			$scope.templet.tdesc=tdesc;
			$scope.templet.tids=$stateParams.tids;
			$scope.templet.rids=$stateParams.rids;
			$scope.returnAddress=$stateParams.returnAddress;
			$scope.templet=appConfig.Templetmanage!=null?appConfig.Templetmanage:{};
			if($stateParams.umid){
				$scope.roluser={};
				$scope.roluser.umid=$stateParams.umid;
				$scope.roluser.userName=$stateParams.userName;
				$scope.roluser.email=$stateParams.email;
				$scope.roluser.title=$stateParams.title;
				appConfig.roluser=$scope.roluser;
			}
			
			
			//该租户购买的项目
			$scope.authAppList=appConfig.authAppList;
			$scope.istop11=$scope.authAppList.length>12?true:false;
			$scope.authAppListTop11=new Array();
			angular.forEach($scope.authAppList,function(item,index){
				if(index<12){
					$scope.authAppListTop11.push(item);
				}
			});
			$scope.appindex=0;
			$scope.showLeft=false;
			$scope.showRight=true;
			$scope.switchPageApp= function(flg){
				$scope.authAppListTop11=new Array();
				if(flg == 1 && $scope.appindex>0){
					$scope.appindex--;
				}else if(flg == 2 &&($scope.authAppList.length-$scope.appindex)>12){
					$scope.appindex++;
				}
				$scope.showLeft=$scope.appindex < 1?false:true;
				$scope.showRight=($scope.authAppList.length-$scope.appindex)<13?false:true;
				var appflg=true;
				angular.forEach($scope.authAppList,function(item,index){
					if(index>=$scope.appindex && index<($scope.appindex+12)){
						if($scope.oldcode ==item.appCode){
							appflg=false;
						}
						$scope.authAppListTop11.push(item);
					}
				});
				
				if(appflg){
					$scope.switchApp($scope.authAppListTop11[0]);
					$scope.switchPage($scope.authAppListTop11[0].appCode);
				}

			}
			if($scope.onupdate){
				$scope.title="查看权限模板"
			}else if(!$scope.onupdate&&tname!=''){
				$scope.title="修改权限模板"
			}else{
				$scope.title="创建权限模板"
			}
			$scope.role={};
			
			$scope.oldcode="";
			$scope.switchApp= function(data){
				$("#"+$scope.oldcode).removeClass("active");
				$("#"+data.appCode).addClass("active");
				$("#"+$scope.oldcode+"_img").hide();
				$("#"+data.appCode+"_img").show();
				
				$scope.oldcode=data.appCode;
				if(window.parent && window.parent.iFrameHeight){
					window.setTimeout(window.parent.iFrameHeight,200);
				}
				/*var $nav_bar = $("#nav-bar");
				$nav_bar.find("li").bind('click', function() {
					var $li = $(this);
					var curAppUrl = $li.find("a").attr("href");
					
					$li.addClass("active")
					$li.siblings().removeClass("active");
					//window.location.reload();
				});*/
			};
			
			
			$scope.savepush= function(datas,repotresourceids){
			 angular.forEach(datas,function(item,index){
				  	if(item.checked){
						repotresourceids.push(item.rid)
					}
						angular.forEach(item.children,function(item1,index){
							if(item1.checked){
								repotresourceids.push(item1.rid)
							}
								angular.forEach(item1.children,function(item2,index){
									if(item2.checked){
										repotresourceids.push(item2.rid)
									}
									
								});
							
						});
					
					
				});
			}
			//保存数据
			$scope.saveUserSegmentation = function(){
				
				 if(!$scope.templet.tname){
					 $.Pop.alerts("请输入权限模板名称！");
					 return ;
				 }
				 var params = {
					      roleName:$scope.templet.tname,
					      roleDesc:$scope.templet.tdesc,
					      tids:$scope.templet.tids,
					      rids:$scope.templet.rids
			  	};
				 var _repotresList=new Array();
				 angular.forEach($scope.allList,function(item,index){
					 var templist=[];
					 if(!item.value.list[0]||!item.value.list[0].children) return;
					 $scope.savepush(item.value.list[0].children,templist);
					 if(templist.length>0){
						 templist.push(item.value.list[0].rid)
					 }
					 var temp={
						key:item.key,
						value:templist.join("_"),
					 }
					 _repotresList.push(temp);	
				 });
				 params._repotresList=_repotresList;
				  reportService.getSaveRoleByParams(params).then(function(data){
					  var datas=data;
						if(!data.success){
	    					$.Pop.alerts(data.msg);
	    					return;
	    				}
	    				if(data.success){
	    					 $state.go("nativepage/templetmanage");
	    				}
					 
				  });
			}
			$scope.allList;
			$scope.resourcesList;
			$scope.produceList;
			//初始化操作
			$scope.init = function(){
				
				var params={};
				params.tids=$scope.templet.tids;
				params.rids=$scope.templet.rids;
				params.vtimecc = Math.random();
				reportService.getResourceByParams(params).then(function(data){
					//data=data.resources[0].children;
					$scope.allList=data.list;
					$scope.resourcesList=$scope.allList[0].value.list!=null?$scope.allList[0].value.list:[];
					$scope.pageflg=$scope.allList[0].value.flg;
					angular.forEach($scope.allList,function(item,index){
						var keys=item.key.split("_");
						var reportkey=$scope.allList[0]["key"].split("_");
						$scope.isreport=reportkey[2];
						if(reportkey[2] == 'report' && keys[2] == 'report' && keys[3]=='productlist'){//28说明是产品
							$scope.produceList=item.value.list[0];
							$scope.pageShow=true;
							$scope.productpageflg=item.value.flg;
						}
						
						if(reportkey[2] == 'screen' && keys[2] == 'screen' && keys[3]=='productlist'){//28说明是产品
							$scope.produceList=item.value.list[0];
							$scope.pageShow=true;
							$scope.productpageflg=item.value.flg;
						}
						
						if(reportkey[2] == 'push' && keys[2] == 'push' && keys[3]=='productlist'){//28说明是产品
							$scope.produceList=item.value.list[0];
							$scope.pageShow=true;
							$scope.productpageflg=item.value.flg;
						}
						
					});
					if(!$scope.pageShow){
						$scope.productpageflg=true;
					}
					$("#"+$scope.authAppList[0].appCode).addClass("active");
					$("#"+$scope.authAppList[0].appCode+"_img").show();
					
					$scope.oldcode=$scope.authAppList[0].appCode;
					if(window.parent && window.parent.iFrameHeightM){
						window.setTimeout(window.parent.iFrameHeightM,200);
					}	
					/*	$scope.resourcesList=$scope.allList[$scope.authAppList.rid+"_1"][0].children;
					$scope.produceList*/
				})
			}
			
			
			$scope.init();
			$scope.repotresources;
			$scope.dmpresources;
			$scope.lesseeumsources;
			$scope.pageShow=false;
			$scope.switchPage = function(rid){
				$scope.pageShow=false;
				$scope.isreport=rid;
				/*$scope.resourcesList.checked=false;*/
				angular.forEach($scope.allList,function(item,index){
					var keys=item.key.split("_");
					if(keys[2]==rid&&keys[3]!='productlist'){
						$scope.resourcesList=item.value.list;
						$scope.pageflg=item.value.flg;
					}
					if(keys[2]==rid&&keys[3]=='productlist'){//28说明是产品
						$scope.produceList=item.value.list[0];
						$scope.pageShow=true;
						$scope.productpageflg=item.value.flg;
					}
				});
				if(!$scope.pageShow){
					$scope.productpageflg=true;
				}
				if(window.parent && window.parent.iFrameHeightM){
					window.setTimeout(window.parent.iFrameHeightM,200);
				}
				//$scope.init(params,productparams,val);
			}
			
			$scope.showconfigure= function(){
				$scope.productpageflg=false;
				$scope.pageflg=false;
			}
			
			//选中
			$scope.checkselected = function(data,data1,data2,datas){
				if( data2.checked == true){
					angular.forEach(datas,function(item,index){
						if(data.rid==item.rid){
							item.checked = true;
							angular.forEach(item.children,function(item1,index){
								if(data1.rid==item1.rid){
									item1.checked = true;
									angular.forEach(item1.children,function(item2,index){
										if(data2.rid==item2.rid){
											item2.checked = true;
										}
										
									});
								}
								
							});
						}
						
					});
				}/*else if(data.key != -1 && data.checked == true){
					datas[0].checked =false;
				}*/
			}
			
			$scope.checkdata =function(data,datas){
				var flg=true;
					angular.forEach(datas,function(item,index){
						if(data.rid!=item.rid && item.checked){
							flg=false;
						}
					});
					return flg;
			}
			
			$scope.checkdatarpoot =function(datas){
				var flg=true;
					angular.forEach(datas,function(item,index){
						if(item.checked){
							flg=false;
						}
					});
					return flg;
			}
			
			
			//选中事件监听
			$scope.checkselectUninfo = function(pageShow,children,data,data1,data2,flag){
				
				if(data2!=0&&data2!=null){
					/*$scope.checkselected(data,data1,data2,$scope.resourcesList);*/
					if(data2.checked){
						data.checked=true;
						data1.checked=true;
						children.checked=true;
					}else{
						var droot=$scope.checkdata(data,children.children);
						var dflg=$scope.checkdata(data1,data.children);
						var dflg1=$scope.checkdata(data2,data1.children);
						if(droot&&dflg&&dflg1){
							children.checked=false;
						}
						if(dflg&&dflg1){
							data.checked=false;
							data1.checked=false;
						}
						if(dflg1){
							data1.checked=false;
						}
						
					}
				}else if((data1!=0&&data1!=null)&&(data2==0||data2==null)){
					/*$scope.checkselected(data,data1,$scope.resourcesList);*/
					if(data1.checked){
						data.checked=true;
						children.checked=true;
						angular.forEach(data1.children,function(item,index){
								item.checked=true;
						});
					}else{
						var droot=$scope.checkdata(data,children.children);
						var dflg=$scope.checkdata(data1,data.children);
						if(droot&&dflg){
							children.checked=false;
						}
						if(dflg){
							data.checked=false;
						}
						angular.forEach(data1.children,function(item,index){
								if(data.rid!=item.rid && item.checked){
									item.checked=false;
								}
						});
						
						
					}
				}else if(data!=0&&data!=null&&(data1==0||data1==null)&&(data2==0||data2==null)){
					/*$scope.checkselected(data,data1,$scope.resourcesList);*/
					if(data.checked){
						data.checked=true;
						children.checked=true;
						angular.forEach(data.children,function(item,index){
								item.checked = true;
								angular.forEach(item.children,function(item1,index){
										item1.checked = true;
										angular.forEach(item1.children,function(item2,index){
												item2.checked = true;
											
										});
									
								});
						});
					}else{
						var droot=$scope.checkdata(data,children.children);
						if(droot){
							children.checked=false;
						}
						angular.forEach(data.children,function(item,index){
							item.checked = false;
							angular.forEach(item.children,function(item1,index){
									item1.checked = false;
									angular.forEach(item1.children,function(item2,index){
											item2.checked = false;
										
									});
								
							});
					});
						
						
					}
				}else{
					/*$scope.checkselected(data,data1,$scope.resourcesList);*/
					if(children.checked){
						children.checked=true;
						angular.forEach(children.children,function(item,index){
								item.checked = true;
								angular.forEach(item.children,function(item1,index){
										item1.checked = true;
										angular.forEach(item1.children,function(item2,index){
												item2.checked = true;
												angular.forEach(item2.children,function(item3,index){
													item3.checked = true;
												
											    });
										});
									
								});
						});
					}else{
						angular.forEach(children.children,function(item,index){
							item.checked = false;
							angular.forEach(item.children,function(item1,index){
									item1.checked = false;
									angular.forEach(item1.children,function(item2,index){
											item2.checked = false;
											angular.forEach(item2.children,function(item3,index){
												item3.checked = false;
											
										    });
									});
								
							});
					});
						
						
					}
				}
			}
			
			
			$scope.checkselectUninforoot = function(pageShow,data,flag){
					/*$scope.checkselected(data,data1,$scope.resources);*/
					if(data.checked){
						angular.forEach($scope.resourcesList.children,function(itemR,index){
							itemR.checked = true;
							angular.forEach(itemR.children,function(item,index){
									item.checked = true;
									angular.forEach(item.children,function(item1,index){
											item1.checked = true;
											angular.forEach(item1.children,function(item2,index){
													item2.checked = true;
												
											});
										
									});
							});
						});
					}else{
						angular.forEach($scope.resourcesList.children,function(itemR,index){
							itemR.checked = false;
							angular.forEach(itemR.children,function(item,index){
									item.checked = false;
									angular.forEach(item.children,function(item1,index){
											item1.checked = false;
											angular.forEach(item1.children,function(item2,index){
													item2.checked = false;
												
											});
										
									});
							});
						});
						
						
					}
				
			}
			
			$scope.checkselectUninfoproductroot = function(data,flag){
				/*$scope.checkselected(data,data1,$scope.resources);*/
				if(data.checked){
					angular.forEach($scope.produceList.children,function(itemR,index){
						itemR.checked = true;
					});
				}else{
					angular.forEach($scope.produceList.children,function(itemR,index){
						itemR.checked = false;
					});
					
					
				}
			
		}
			
	    $scope.checkselectUninfoproduct = function(data,flag){
				/*$scope.checkselected(data,data1,$scope.resources);*/
				if(data.checked){
					$scope.produceList.checked=true;
				}else{
					var flg=true;
					angular.forEach($scope.produceList.children,function(item,index){
						if(data.rid!=item.rid && item.checked){
							flg=false;
						}
						
					});
					if(flg){
						$scope.produceList.checked=false;
					}
					
					
				}
			
		}
			
			
		
		
			if(window.parent && window.parent.iFrameHeightM){
				window.setTimeout(window.parent.iFrameHeightM,200);
			}	
			
		
			
    }];
});
