define(['angularAMD','app/controllers/common/EchartsOptions','app/services/crowd/CrowdRelationService','app/services/crowd/CrowdPortraitService','app/directives/TdEcharts','app/filters/common/CommonFilter'], function (angularAMD, EchartsOptions) {
    'use strict';
    return ['$scope','$rootScope','CrowdRelationService','CrowdPortraitService','$state','$stateParams', '$location', function ($scope,$rootScope,CrowdRelationService,CrowdPortraitService,$state,$stateParams,$location) {
    	$scope.init = function(){
	    	$scope.crowdId = $stateParams.crowdId;
	    	$scope.echartCrowdRelation = {};
	    	$scope.crowdRelationDatas = {};
	    	$scope.crowdRelation = [];
	    	$scope.queryCrowdDetailsCrowdId();
	    	$scope.renderCrowdRelation();	    	
    	};
    	
    	$scope.queryCrowdDetailsCrowdId = function(){
    		CrowdPortraitService.getCrowdWithScale($scope.crowdId).then(function(crowd){
    			//
    			$rootScope.crowdName = crowd.name;
    		});
    	};
    	
    	$scope.renderCrowdRelation = function(){
    		
    		CrowdRelationService.queryCrowdRelation($scope.crowdId).then(function(crowdRelation){
    			//console.dir(["crowdRelation",crowdRelation]);
    			$scope.crowdRelation = angular.copy(crowdRelation);
    			$scope.crowdRelationParams = {}
    			$scope.resetRelationParams();
    			
    			/*$scope.crowdRelationDatas = {
    	    			name : '人群',
    	    			data : ['叶子节点','非叶子节点', '根节点'],
    	    			categories : [
    	    			        {
    			                    name: '叶子节点'
    			                },
    			                {
    			                    name: '非叶子节点'
    			                },
    			                {
    			                    name: '根节点'
    			                }
    			         ]
    			 			,
    			         nodes : [],
    			         links:[]
    	    		}
    			
    			var links = [];
    			for(var i = 0; i < $scope.crowdRelation.length; i++){//计算category和links
    				if($scope.crowdRelation[i].type == 1){//type=1是根，2是非叶子结点，3叶子结点
    					$scope.crowdRelation[i].category = 2;
    				}else if($scope.crowdRelation[i].type == 2){
    					$scope.crowdRelation[i].category = 1;
    				}else if($scope.crowdRelation[i].type == 3){
    					$scope.crowdRelation[i].category = 0;
    				}
    				if($scope.crowdRelation[i].nodeId != -1){//nodeId等于-1根结点，排除根结点，计算links结点
    					links.push({"source":$scope.crowdRelation[i].depth,"target":$scope.crowdRelation[i].id,"weight":1});
    				}else{
    					$scope.crowdRelation[i].value = 10;
    				}
    			}
    			$scope.crowdRelationDatas.nodes = $scope.crowdRelation;
    			$scope.crowdRelationDatas.links = links;*/
    			//$scope.echartCrowdRelation = EchartsOptions.relationChart($scope.crowdRelationDatas);
    			$scope.echartCrowdRelation = EchartsOptions.relation($scope.crowdRelationParams);
    			
    			
			},function(response) {
				if(response.data != null && !response.data.success){
					$.Pop.alerts(response.data.msg);
				}
			});
    	}
    	
    	$scope.resetRelationParams = function(){
    		$scope.crowdRelationParams = {
    			name : '人群',
    			data : ['关联人群'],
    			categories :[
    			                {
    			                    name: '根人群'
    			                },
    			                {
    			                    name: '关联人群'
    			                }
    			                
    			            ],
		         nodes : [
			                /*{category:0, name: '乔布斯', value : 10, label: '乔布斯\n（根人群）'},
			                {category:1, name: '丽萨-乔布斯',value : 2},
			                {category:1, name: '保罗-乔布斯',value : 3},
			                {category:1, name: '克拉拉-乔布斯',value : 3},
			                {category:1, name: '劳伦-鲍威尔',value : 7},
			                {category:1, name: '史蒂夫-沃兹尼艾克',value : 5},
			                {category:1, name: '奥巴马',value : 8},
			                {category:1, name: '比尔-盖茨',value : 9},
			                {category:1, name: '乔纳森-艾夫',value : 4},
			                {category:1, name: '蒂姆-库克',value : 4},
			                {category:1, name: '龙-韦恩',value : 1},*/
			            ],
		         links:[/*
		                {source : '丽萨-乔布斯', target : '乔布斯', weight : 1, name: '女儿',value:2},
		                {source : '保罗-乔布斯', target : '乔布斯', weight : 2, name: '父亲',value:3},
		                {source : '克拉拉-乔布斯', target : '乔布斯', weight : 1, name: '母亲',value:3},
		                {source : '劳伦-鲍威尔', target : '乔布斯', weight : 2,value:7},
		                {source : '史蒂夫-沃兹尼艾克', target : '乔布斯', weight : 3, name: '合伙人',value:5},
		                {source : '奥巴马', target : '乔布斯', weight : 1,value:8},
		                {source : '比尔-盖茨', target : '乔布斯', weight : 1, name: '竞争对手',value:9},
		                {source : '乔纳森-艾夫', target : '乔布斯', weight : 1, name: '爱将',value:4},
		                {source : '蒂姆-库克', target : '乔布斯', weight : 1,value:4},
		                {source : '龙-韦恩', target : '乔布斯', weight : 1,value:1}*/
		                
		            ]
    		}
    		var nodes = [],links = [];
    		if($scope.crowdRelation && $scope.crowdRelation.length > 0){
    			for(var i = 0; i < $scope.crowdRelation.length; i++){//计算category和links
    				if(i <= 10){//最多显示10个关联人群
    					var nodeItem = {};
        				if($scope.crowdRelation[i].type == 1){//type=1是根，2是非叶子结点，3叶子结点
        					nodeItem = {category:0,name:$scope.crowdRelation[i].name,value:$scope.crowdRelation[i].value || 10.0,label:$scope.crowdRelation[i].name};
        				
        				}else{
        					var nodeVal = $scope.crowdRelation[i].value;
        					if(nodeVal > 0){//关联度大于0的节点，圆更大
        						nodeVal = 6;
        					}
        					nodeItem = {category:1,name:$scope.crowdRelation[i].name,value:nodeVal || 0.0,label:$scope.crowdRelation[i].name};
        				}
        				if($scope.crowdRelation[i].nodeId != -1){//nodeId等于-1根结点，排除根结点，计算links结点
        					var parentNodeName = $scope.getParentNodeName($scope.crowdRelation[i].parentNodeId);
        					var weight = parseInt($scope.crowdRelation[i].value);
        					if(weight <= 0){
        						weight = 1;
        					}
        					
        					links.push({"source":$scope.crowdRelation[i].name,"target":parentNodeName,"weight":weight,"value":$scope.crowdRelation[i].value});
        				}
        				nodes.push(nodeItem);
    				}
    				
    			}
    			$scope.crowdRelationParams.nodes = nodes;
    			$scope.crowdRelationParams.links = links;
    		}
    		 
    	}
    	
    	$scope.getParentNodeName = function(parentNodeId){//根据父节点的id获取父节点的name
    		var parentNodeName = "";
    		if(!parentNodeId){
    			parentNodeName = "";
    		}else{
    			if($scope.crowdRelation && $scope.crowdRelation.length > 0){
        			for(var i = 0; i < $scope.crowdRelation.length; i++){
        				if($scope.crowdRelation[i].nodeId == parentNodeId){
        					parentNodeName = $scope.crowdRelation[i].name;
        					break;
        				}
        			}
    			}
    		}
    		return parentNodeName;
    	}
		$scope.init();
		
    }];
});


