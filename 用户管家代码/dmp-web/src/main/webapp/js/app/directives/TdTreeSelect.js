define(['app','angularAMD','css!/enterprise/css/libs/zTreeStyle/zTreeStyle','jquery.ztree.core-3.5','jquery.ztree.excheck-3.5','jquery.ztree.exedit-3.5'], function (app,angularAMD) {
    'use strict';
    angularAMD.directive('tdTreeSelect',['$timeout','$state', function($timeout,$state) {
    	return {
    		restrict : 'EA',
    		scope:{
    			treeKeywords :"=",
    			menuElem:"=",
    			selectNodeText :"=",
    			treeSourceList:"=",
    			noApply:"=",
    			treeSelectCallback: "&"
    		},
    		templateUrl : "html/common/TdTreeSelect.html",
    		link: function(scope, elem, attrs) {
    			var $elem = $(elem);
    			
    	    	scope.beforeClick = function(treeId, treeNode) {
    	    		var $menuElem = $("#"+scope.menuElem);
        			var $selectTreeObj = $menuElem.children(".ztree");
        			var selectTreeId = $selectTreeObj.attr("id");
        			
    				var zTree = $.fn.zTree.getZTreeObj(selectTreeId);
    				zTree.checkNode(treeNode, !treeNode.checked, null, true);
    				return false;
    			}

    			scope.onCheck = function(e, treeId, treeNode) {
    				var $menuElem = $("#"+scope.menuElem);
    				$menuElem.fadeOut("fast");
    				scope.$apply(function (){
    					scope.selectNodeName = treeNode.name;
    			    });
    				scope.treeSelectChange(treeNode);
    			}
    			
    			scope.treeSelectChange = function(callback){
    				if(angular.isFunction(scope.treeSelectCallback)){
    	            	scope.treeSelectCallback()(callback);
    	            }
    			}
    			
    			scope.resetNodes = function(){
    				var newNodes = [];
    				var treeDatas = angular.copy(scope.treeSourceList);
    				newNodes = scope.getNodesByParamFuzzy(treeDatas,'name',scope.treeKeywords);
    				return newNodes;
    			};
    			
    			scope.getNodesByParamFuzzy = function(nodes, key, value) {
    				if (!nodes || !key) return [];
    				var childKey = 'children',
    				result = [];
    				value = value.toLowerCase();
    				for (var i = 0, l = nodes.length; i < l; i++) {
    					if (typeof nodes[i][key] == "string") {
    						if(nodes[i][key].toLowerCase().indexOf(value)>-1){
    							result.push(nodes[i]);
    						}else{
    							if(nodes[i][childKey]){
    								result = result.concat(scope.getNodesByParamFuzzy( nodes[i][childKey], key, value));
    							}
    						}
    					}
    				}
    				return result;
    			};
    			
    			scope.findNodes = function(){
    				var treeDatas = angular.copy(scope.treeSourceList);
    				if(scope.treeKeywords){
    					treeDatas = scope.resetNodes();
    				}
    				scope.drawSelectTree(treeDatas);
    			}
    			
    			scope.$watch('treeKeywords', function(){
    				scope.findNodes();
    			});
    			
    			scope.$watch('selectNodeText', function(){
    				scope.selectNodeName = scope.selectNodeText;
    			});

    			scope.showSelectTreeMenu = function() {
    				var $menuElem = $("#"+scope.menuElem);
    				var cityObj = $elem;
    				var cityOffset = $elem.offset();
    				var outerWidth = cityObj.outerWidth();
    				$menuElem.css({
    					//width:outerWidth+'px',
    					left : cityOffset.left + "px",
    					top : cityOffset.top + cityObj.outerHeight() + "px"
    				}).slideDown("fast");
    				$("body").bind("mousedown", scope.onBodyDown);
    				
    				if (window.parent && window.parent.iFrameScrollHeight) {
    					window.setTimeout(window.parent.iFrameScrollHeight, 200);
    				}
    			}

    			scope.hideMenu = function() {
    				var $menuElem = $("#"+scope.menuElem);
    				$menuElem.fadeOut("fast");
    				$("body").unbind("mousedown", scope.onBodyDown);

    				/*if (window.parent && window.parent.iFrameHeight) {
    					window.setTimeout(window.parent.iFrameHeight, 200);
    				}*/
    			}
    			scope.onBodyDown = function(event) {
    				if (!(event.target.id == scope.menuElem || $(event.target).parents("#"+scope.menuElem).length > 0)) {
    					scope.hideMenu();
    				}
    			}
    			
    			scope.openTreeSource = function(obj){
    				if(obj && obj.length > 0){
    					for(var i = 0; i< obj.length;i++){
    						if(obj[i].children && obj[i].children.length > 0){
    							obj[i].open = true;
    							//obj[i].nocheck = true;
    							scope.openTreeSource(obj[i].children);
    						}
    					}
    				}
    			}
    			
    			scope.drawSelectTree = function(treeDatas) {
    				var $menuElem = $("#"+scope.menuElem);
        			var $selectTreeObj = $menuElem.children(".ztree");
    				scope.openTreeSource(treeDatas);
    				
    				var setting = {
    					check: {
    						enable: true,
    						chkStyle: "radio",
    						radioType: "all"
    					},
    					view : {
    						dblClickExpand : false,
    						showLine: false
    					},
    					data : {
    						simpleData : {
    							enable : true
    						}
    					},
    					callback : {
    						beforeClick : scope.beforeClick,
    						onCheck : scope.onCheck
    					}
    				};
    				$.fn.zTree.init($selectTreeObj, setting, treeDatas);
    				
    			}
    			
    			$("#content").parent().scroll(function () {
    				scope.hideMenu();
    			});
    			
    			scope.init = function(){
    				if(scope.treeSourceList && scope.treeSourceList.length > 0){
    					if(scope.noApply){
    						scope.selectNodeName = scope.selectNodeText;
    					}else{
    						scope.$apply(function (){
        						scope.selectNodeName = scope.selectNodeText;
        					});
    					}
    					
    					var treeDatas = angular.copy(scope.treeSourceList);
    					scope.drawSelectTree(treeDatas);
    				}else{
    					setTimeout(function(){
    						scope.init();
    	    			},200);
    				}
    			}
    			scope.init();
		    }
    	}
    }]);
});
