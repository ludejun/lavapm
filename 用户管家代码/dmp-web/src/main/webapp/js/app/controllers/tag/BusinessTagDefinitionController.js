define([ 'app/lib/tag/builder/DefinitionBuilder','app/lib/tag/parser/DefinitionParser', 'app/controllers/tag/TagBuilder', './BusinessTagDefinitionBuilderHtml'], function(DefinitionBuilder,DefinitionParser, TagBuilder, BusinessTagDefinitionBuilderHtml) {
	var prototype = {
		model : {
			deviceType : "",
			tagId:'',
			tagMap:{},
			tagIdsMap:{},
			businessTagMap:{}
		},
		initHtml : function() {
			var deviceType = this.model.deviceType;
			//var tableTypes = TagBuilder.getTableTypeSelector(deviceType);
			var html = BusinessTagDefinitionBuilderHtml.initRelationPanel();
			html += BusinessTagDefinitionBuilderHtml.createAddRelationBtn();
			return html;
		},
		buildTagHtmlByTagDefinitionData : function(definition, tableTypes) {
			var tagList = [];
			var $tag_relations_panel = $("#tag-relations-panel");
			var that = this;
			var deviceType = that.model.deviceType;
			var html = '<div class="clrfix relations-panel" id="relations-panel">';
			if (definition && definition.filter && definition.condition) {
				var filter = definition.filter || {};
				var condition = definition.condition || {};
				var relationLogic = "";
				var conditionName = "";
				
				var filterChildNode = {};
				if(filter.hasOwnProperty('and')){
					relationLogic = "and";
					filterChildNode = filter.and;
				} else if (filter.hasOwnProperty('or')) {
					relationLogic = "or";
					filterChildNode = filter.or;
				} else if (filter.hasOwnProperty('condition')) {
					filterChildNode = filter;
					conditionName = filter.condition;
				}
				
				if (filterChildNode && filterChildNode.length > 0) {
					for (var i = 0; i < filterChildNode.length; i++) {
						var itemNode = filterChildNode[i];
						var groupLogic = "";
						var itemNodeChildren = {};
						
						if(itemNode.hasOwnProperty('and')){
							groupLogic = "and";
							itemNodeChildren = itemNode.and;
							if(itemNodeChildren && itemNodeChildren.length > 0){
								if(itemNodeChildren[0].hasOwnProperty('not')){
									var not = itemNodeChildren[0]['not'];
									conditionName = not['and'][0].condition;
								}else{
									conditionName = itemNodeChildren[0].condition;
								}
							}
						}else if(itemNode.hasOwnProperty('or')){
							groupLogic = "or";
							itemNodeChildren = itemNode.or;
							if(itemNodeChildren && itemNodeChildren.length > 0){
								if(itemNodeChildren[0].hasOwnProperty('not')){
									var not = itemNodeChildren[0]['not'];
									conditionName = not['and'][0].condition;
								}else{
									conditionName = itemNodeChildren[0].condition;
								}
							}
						}else if(itemNode.hasOwnProperty('condition')){
							itemNodeChildren = itemNode;
							conditionName = itemNode.condition;
						}
						
						var tableType = that._getTableTypeByObjectType(conditionName);
						html += '<div class="relation-item relation-item-'+tableType+'">';
						html += BusinessTagDefinitionBuilderHtml.createRelationItemHead(tableType,conditionName);
						html += '<div class="ralation-logic">';
						if(relationLogic == 'and'){
							html += '<div class="logic '+relationLogic+'" onclick="dmpapp.BusinessTagDefinitionController.toggleRelationLogic($(this));">并且</div>';
						}else if(relationLogic == 'or'){
							html += '<div class="logic '+relationLogic+'" onclick="dmpapp.BusinessTagDefinitionController.toggleRelationLogic($(this));">或者</div>';
						}
						html += '</div>';
						html += '<div class="ralation-box">';		
						
						if(itemNodeChildren && itemNodeChildren.length > 0){
							for(var j = 0; j < itemNodeChildren.length;j++){
								var hasNotFilter = false;
								if(itemNodeChildren[j].hasOwnProperty('not')){
									hasNotFilter = true;
									var not = itemNodeChildren[j]['not'];
									conditionName = not['and'][0].condition;
								}else{
									conditionName = itemNodeChildren[j].condition;
								}
								
								
								if(tableType == 'businessTag'){
									
									var tagIdsMap = that.model.tagIdsMap;;
									if(tagIdsMap && tagIdsMap.total && tagIdsMap.total > 0){
										tagList = tagIdsMap.rows;
										
										var attributeCode = that._getAttributeCodeByDefinition(conditionName);
										var definitionParams = that._getDefinitionParams(conditionName,definition);
										html += BusinessTagDefinitionBuilderHtml.createGroupComboHtml(tableType,tagList,groupLogic,attributeCode,conditionName,definitionParams,'');
										
										html += BusinessTagDefinitionBuilderHtml.createAddGroupComboBtn(tableType);
									}else{
										html += '<div class="no-select-tag">当前人群类型下，没有可选择的标签</div>';
									}
									
								}
							}
						}
						
						html += '</div>';
						html += '</div>';
					}
				}
				html += '</div>';
				html += BusinessTagDefinitionBuilderHtml.createAddRelationBtn();
			}
			
			$tag_relations_panel.html(html);
			that.checkIsShowAddGroupComboBtn();
			that.checkIsShowAddRelationBtn();
			that._selectTagEventBind();
		},
		rebuildDefinition:function(definition){
			var that = this;
			var dp = new DefinitionParser();    
    		dp.fromMap(definition);
    		var def = dp.toDefinition();
    		definition = def;
    		that.model.definition = definition;
    		return definition;
		},
		_getTagIdsByDefinition:function(definition){
			var that = this;
			var tagIds = "";
			if(definition && definition.condition){
				var condition = definition.condition;
				for(var c in condition){
					var definitionParams = that._getDefinitionParams(c,definition);
					if(definitionParams && definitionParams.operatorValue && definitionParams.operatorValue.eq){
						tagIds += definitionParams.operatorValue.eq + ',';
					}
				}
			}
			return tagIds;
		},
		getTagListByDefinition:function(definition){
			var that = this;
			definition = that.rebuildDefinition(definition);
    		var tagIds = that._getTagIdsByDefinition(definition);
    		var tagIdList = tagIds.split(',');
    		
			var random = that._getRandomNum(1,100000000);
			var deviceType = that.model.deviceType;
			var data = {
				page:1,
				q:'',
				random:random,
				rows: 0,
				//type:'TB',
				tagIds:tagIds,
				touchPointType:deviceType,
				status:2,
				gtCrowdCount:0
			};
			var param = {
				url : '/dmp-web/tag/tags/fastQuery',
				callType : 'get',
				contentType : 'application/json',
				dataType : 'json',
				data : data
			
			};
			$.layerLoading.show();
			$.callApi(param, function(response) {
				$.layerLoading.hide();
				if(response && response.rows){
					that.model.tagIdsMap = response;
					that.buildTagHtmlByTagDefinitionData(definition);
				}
				
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				$.layerLoading.hide();
			});
		},
		_selectTagEventBind:function(){
			var that = this;
			var tagMap = that.model.tagMap;
			var tags = [];
			if(tagMap && tagMap.total && tagMap.total > 0){
				tags = tagMap.rows;
			}
			$(".select-tag").each(function(){
				var $select = $(this);
				that._renderSelectSearch($select,tags);
				that._selectTextEvent($select);
				if(tagMap.total > 10){
					that._selectSearchEvent($select);
				}
			});
		},
		_selectTextEvent:function($select){
			var that = this;
			var $selectText = $select.parent().find(".select-text");
			var $tagType = $select.parent().find(".select-tag-type");
			$selectText.bind('click',function(){
				var tagType = $tagType.val() || 'TB';
				var list = [];
				if(tagType == 'TC'){
					var businessTagMap = that.model.businessTagMap;
					if(businessTagMap && businessTagMap.total){
						list = businessTagMap.rows;
						that._renderSelectSearch($select,list);
					}else{
						var random = that._getRandomNum(1,100000000);
						var deviceType = that.model.deviceType;
						var data = {
							page:1,
							q:'',
							random:random,
							rows: 20,
							type:tagType,
							tagIds:'',
							touchPointType:deviceType,
							status:2,
							gtCrowdCount:0
						};
						var param = {
							url : '/dmp-web/tag/tags/fastQuery',
							callType : 'get',
							contentType : 'application/json',
							dataType : 'json',
							data : data
						
						};
						$.layerLoading.show();
						$.callApi(param, function(response) {
							$.layerLoading.hide();
							if(response && response.rows){
								that.model.businessTagMap = response;
								list = response.rows;
								that._renderSelectSearch($select,list);
							}
						}, function(XMLHttpRequest, textStatus, errorThrown) {
							$.layerLoading.hide();
						});
					}
				}
			});
		},
		
		_checkHasAttributeTableAttributes:function(attributeTables){
			var has = false;
			if(attributeTables && attributeTables.length > 0){
				var tableLength = attributeTables.length;
				for(var i = 0;i < tableLength;i++){
					var table = attributeTables[i];
					var attributes = table.attributes;
					if(attributes && attributes.length > 0){
						has = true;
						break;
					}
				}
			}
			return has;
		},
		createCrowdAttributesBehaviors:function($btn){
			var that = this;
			var $relation_item = $btn.parentsUntil(".relation-item").parent();
			var $ralation_box = $btn.parentsUntil(".ralation-box").parent();
			var $group_logic = $ralation_box.children('.group-combo').eq(0).find(".group-logic .logic");
			var group_logic = "or";
			if($group_logic.hasClass("and")){
				group_logic = "and";
			}
			//var $group_combo = $ralation_box.find(".group-combo");
			//$group_combo.removeClass("group-combo-last");
			
			var deviceType = that.model.deviceType;
			var tagMap = that.model.tagMap;;
			var tableType = $btn.attr("tableType");
			if(tableType == 'businessTag'){
				if(tagMap && tagMap.total && tagMap.total > 0){
					var tags = tagMap.rows;
					
					var html = BusinessTagDefinitionBuilderHtml.createGroupComboHtml(tableType,tags,group_logic,'','','','',tags);
					html += BusinessTagDefinitionBuilderHtml.createAddGroupComboBtn(tableType);
					if($btn.parent().hasClass("welcome-btn")){
						$ralation_box.eq(0).html(html);
						$ralation_box.find(".welcome-box").remove();
					}else{
						$ralation_box.find(".add-group-combo").remove();
						$ralation_box.append(html);
					}
					
					var $select = $ralation_box.children(".group-combo").last().find(".select-tag");
					that._renderSelectSearch($select,tags);
					
					if(tagMap.total > 10){
						that._selectSearchEvent($select);
					}
					
					that.checkIsShowAddRelationBtn();
					that.checkIsShowAddGroupComboBtn();

					
				}else{
					var html = '<div class="no-select-tag">当前人群类型下，没有可选择的标签</div>';
					$ralation_box.eq(0).html(html);
				}
				
			}
			
		},
		changeBusinessTagType:function($tagType){
			var that = this;
			var $select = $tagType.siblings(".select-tag");
			$select.val("").attr("val","").attr("txt","").attr("code",""); 
			$select.parent().find(".select-text").html("请选择一类标签");
			var deviceType = that.model.deviceType;
			var type = $tagType.val();
			var random = that._getRandomNum(1,100000000);
			var data = {
				page:1,
				q:'',
				random:random,
				rows:20,
				type:type,
				tagIds:'',
				touchPointType:deviceType,
				status:2,
				gtCrowdCount:0
			};
			var param = {
				url : '/dmp-web/tag/tags/fastQuery',
				callType : 'get',
				contentType : 'application/json',
				dataType : 'json',
				data : data
			
			};
			$.layerLoading.show();
			$.callApi(param, function(response) {
				$.layerLoading.hide();
				if(response && response.rows){
					var tables = response.rows;
					that._renderSelectSearch($select,tables,true);
				}
				
			}, function(XMLHttpRequest, textStatus, errorThrown) {
				$.layerLoading.hide();
			});
		},
		_selectSearchEvent:function($select){
			var that = this;
			var deviceType = that.model.deviceType;
			var $selectSearchInput = $select.parent().find(".select-search-input");
			var times;
			$selectSearchInput.bind('keyup',function(){
				var $tagType = $select.siblings(".select-tag-type");
				var tagType = $tagType.val() || "";
				try{
					clearTimeout(times); 
				}catch(e){
				};
				times=setTimeout(function(){
					var q = $selectSearchInput.val();
					var random = that._getRandomNum(1,100000000);
					var data = {
						page:1,
						q:q,
						random:random,
						rows:20,
						type:tagType,
						tagIds:'',
						touchPointType:deviceType,
						status:2,
						gtCrowdCount:0
					};
					var param = {
						url : '/dmp-web/tag/tags/fastQuery',
						callType : 'get',
						contentType : 'application/json',
						dataType : 'json',
						data : data
					
					};
					$.layerLoading.show();
					$.callApi(param, function(response) {
						$.layerLoading.hide();
						if(response && response.rows){
							tables = response.rows;
							that._renderSelectSearch($select,tables);
						}
						
					}, function(XMLHttpRequest, textStatus, errorThrown) {
						$.layerLoading.hide();
					});
					
				},1000);
				
				
			}).bind('blur',function(){
				try{
					clearTimeout(times); 
				}catch(e) 
				{
					//alert("输入有误，请检查!");
				};
			});
		},
		
		_renderSelectSearch : function($select, list,isRefreshOptions) {
			var that = this;
			var tagId = that.model.tagId;
			var $tagator = $select.data('tagator');
			if ($tagator === undefined) {
				$select.jquerySearchSelect({
					list:list,
					label:'请选择一类标签',
					tagId : tagId
				});
			}else{
				$tagator.refresh(list,isRefreshOptions);
			}
		},
		
		_getTableTypeByObjectType : function(conditionName) {
			var definition = this.model.definition;
			var tableType = "";
			var objectType = '';//api
			if(conditionName && definition){
				var definitionParams = this._getDefinitionParams(conditionName,definition);
				objectType = definitionParams.indice.objectType;
				if (objectType == 'MetaBehavior') {// 行为
					tableType = 'behaviorTable';
				} else if (objectType == 'MetaAccount' || objectType == 'MetaStaticAttributeCollection') {// 属性
					tableType = 'attributeTable';
				}else if(objectType == 'MetaTag'){
					tableType = 'businessTag';
				}
			}
			return tableType;
		},
		_getAttributeCodeByDefinition : function(conditionName) {
			var definition = this.model.definition;
			var attributeCode = "";
			if(conditionName && definition){
				var definitionParams = this._getDefinitionParams(conditionName,definition);
				attributeCode = definitionParams.attributeCode;
			}
			return attributeCode;
		},
		_getDefinitionParams:function(conditionName,definition){
			var dp = new DefinitionParser();    
    		dp.fromMap(definition);
    		var def = dp.toDefinition();
    		var definitionParams = {};
    		var conditionMap = dp.getConditions();
    		for(var p in conditionMap){
    			if(conditionName == p){
        			var qualifier = dp.getFirstQualifier(p);
        			definitionParams = {
        				indice : dp.getIndice(p),
        				qualifierType : qualifier.findQualifierType(),
        				attributeCode : qualifier.findQualifierAttributeCode(),
        				operatorValue : qualifier.findQualifierOperatorValue()
        			};
        			
        			/*var qualifierSecond = dp.getSecondQualifier(p);
        			if(qualifierSecond){
        				definitionParams['dateOperatorValue'] = qualifierSecond.findQualifierOperatorValue();
        			}*/
        			break;
    			}
    		}
    		return definitionParams;
		},
		toggleGroupLogic:function($logic){
			var $ralation_box = $logic.parentsUntil(".ralation-box").parent();
			if ($logic.hasClass("and")) {
				$ralation_box.find(".group-logic .logic").removeClass("and").addClass("or").html("或者");
			} else if ($logic.hasClass("or")) {
				$ralation_box.find(".group-logic .logic").removeClass("or").addClass("and").html("并且");
			}
		},
		toggleRelationLogic:function($logic){
			var $ralation_logic = $(".ralation-logic");
			if ($logic.hasClass("and")) {
				$ralation_logic.find(".logic").removeClass("and").addClass("or").html("或者");
			} else if ($logic.hasClass("or")) {
				$ralation_logic.find(".logic").removeClass("or").addClass("and").html("并且");
			}
		},
		removeGroupCombo:function($delGroupCombo){
			var $relations_panel = $("#relations-panel");
			var $relation_item = $delGroupCombo.parentsUntil(".relation-item").parent();
			var $group_combo = $delGroupCombo.parentsUntil(".group-combo").parent();
			var $ralation_box = $group_combo.parent();
			var tableType = $group_combo.attr("tableType");
			$group_combo.remove();
			if($ralation_box.children(".group-combo").length == 0){
				var html = BusinessTagDefinitionBuilderHtml.createRelationWelcome(tableType);
				$ralation_box.html(html);
				if(tableType == 'businessTag'){
					if($relations_panel.children(".relation-item-businessTag").length > 1){
						$ralation_box.parent().remove();
					}
				}
			}
			this.checkIsShowAddRelationBtn();
			this.checkIsShowAddGroupComboBtn();
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			}
		},
		checkIsShowAddGroupComboBtn:function(){
			var $relations_panel = $("#relations-panel");
			$relations_panel.children(".relation-item").each(function(){
				var $relation_item = $(this);
				var $ralation_box = $relation_item.find(".ralation-box");
				var $add_group_combo = $ralation_box.find(".add-group-combo");
				var length = 0;
				$ralation_box.children(".group-combo").each(function(){
					length++;
				});
				if(length>4){
					$add_group_combo.addClass("hide");
				}else{
					$add_group_combo.removeClass("hide");
				}
			});
		},
		checkIsShowAddRelationBtn:function(){
			var isShow = false;
			var $tag_relations_panel = $("#tag-relations-panel");
			var $add_relation = $tag_relations_panel.find(".add-relation");
			
			if($tag_relations_panel.find(".relation-item").length >= 3){
				isShow = false;
			}else{
				if($tag_relations_panel.find(".relation-item-behaviorTable").length == 0){
					isShow = true;
				}else{
					if($tag_relations_panel.find(".relation-item-behaviorTable .group-combo").length > 0){
						isShow = true;
					}else{
						isShow = false;
					}
				} 
			}
			
			if(isShow){
				$add_relation.removeClass("hide");
			}else{
				$add_relation.addClass("hide");
			}
			return isShow;
		},
		createRelationHtml:function($btnAddRelation,tableType){
			tableType = 'businessTag';
			var $relations_panel = $("#relations-panel");
			var html = BusinessTagDefinitionBuilderHtml.createRelationItem(tableType);
			var $firstLogic;
			if(tableType == 'attributeTable'){//属性块在第一个
				$firstLogic = $relations_panel.children(".relation-item").eq(1).find(".ralation-logic .logic");
				$relations_panel.children().first().before(html);
			}else{
				$firstLogic = $relations_panel.children(".relation-item").eq(0).find(".ralation-logic .logic");
				$relations_panel.append(html);
			}
			
			if($firstLogic.hasClass("or")){
				$(".ralation-logic .logic").removeClass("and").addClass("or").html("或者");
			}else if($firstLogic.hasClass("and")){
				$(".ralation-logic .logic").removeClass("or").addClass("and").html("并且");
			}
			this.checkIsShowAddRelationBtn();
			
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			}
		},
		addGroupComboHtml:function($btnAddGroupCombo){
			this.createCrowdAttributesBehaviors($btnAddGroupCombo);
		},
		getOperators:function(attributeTableAttributes,attributeCode){
			var operators = [];
			if(attributeCode && attributeTableAttributes && attributeTableAttributes.length > 0){
				for(var i =0;i < attributeTableAttributes.length;i++){
					var attributes = attributeTableAttributes[i].attributes;
					if(attributes && attributes.length > 0){
						for(var j = 0;j < attributes.length;j++){
							var attribute = attributes[j];
							if(attribute.id == attributeCode){
								var enumerable = attribute.enumerable;
								var valueType = attribute.valueType;
								var operators = TagBuilder.getOperators(enumerable, valueType);
								break;
							}
						}
						
					}
				}
			}
			return operators;
		},
		
		getObjectKeyValue : function(object){
			var obj ={
				key:'',
				value:''
			}
			for(var o in object){
				obj ={
					key:o,
					value: object[o]
				}
				break;
			}
			return obj;
		},
		_getOperatorValueByDefinition:function(conditionName,definition,attributeCode){
			var dp = new DefinitionParser();    
    		dp.fromMap(definition);
    		var def = dp.toDefinition();
    		var operatorValueObj = {};
    		
			var query = dp.getQuery(conditionName);
			if(query && !query.hasOwnProperty('sub')){
				var qualifiers = dp.getQualifiers(conditionName);
				for(var i = 0;i < qualifiers.length;i++){
					var qualifier = qualifiers[i];
					var qualifierType = qualifier.findQualifierType();
					if(qualifierType == 'term'){
						if(attributeCode == qualifier.findQualifierAttributeCode()){
							var operatorValue = qualifier.findQualifierOperatorValue();
							operatorValueObj = this.getObjectKeyValue(operatorValue);
							break;
						}
					}
				}
			}else if(query && query.hasOwnProperty('sub')){
				var subQuery = dp.getSubQuery(conditionName);
				var must = subQuery.getBool().getMust();
				for(var i=0;i<must.length;i++){
					if(must[i].hasOwnProperty('term')){
						var term = must[i].term;
						var obj = this.getObjectKeyValue(term);
						if(attributeCode == obj.key){
							operatorValueObj = this.getObjectKeyValue(obj.value);
							break;
						}
						
					}
				}
			}
			return operatorValueObj;
		},
		
		parseMapTerm:{
			getLenByMapTerm:function(term){
				var len = 0;
				if(term){
					for(var p in term){
						len++;
					}
				}
				return len;
			},
			getKeyByMapTerm:function(term,pos){
				var key = "";
				if(term){
					var index = 0;
					for(var p in term){
						if(pos == index){
							var keyAttr =p.split('.');
							key = keyAttr[1];
							break;
						}
						index++;
					}
				}
				return key;
			},
			getOperatorByMapTerm:function(term,pos){
				var operator = "";
				if(term){
					var index = 0;
					for(var p in term){
						if(pos == index){
							var operatorValue = term[p];
							for(var o in operatorValue){
								operator = o;
								break;
							}
							break;
						}
						index++;
					}
				}
				return operator;
			},
			getValuesByMapTerm:function(term,pos){
				var values = [];
				if(term){
					var index = 0;
					for(var p in term){
						if(pos == index){
							var operatorValue = term[p];
							for(var o in operatorValue){
								values = operatorValue[o];
								break;
							}
							break;
						}
						index++;
					}
				}
				return values;
			}
		},
		
		_filterEventParamKey:function(keys,$ul){
			var newKeys = keys;
			if($ul && keys && keys.length > 0){
				$ul.children("li").each(function(){
					var $li = $(this);
					var $eventKey = $li.find(".event-key");
					var eventKey = $eventKey.val();
					if(eventKey){
						newKeys = _.filter(newKeys, function(item){
							return item.key != eventKey; 
						});
					}
				});
			}
			return newKeys;
		},
		
		
		_buildTagNodeConditionItem : function($group_combo, pos, db) {
			var that = this;
			var deviceType = this.model.deviceType;
			var table_type = $group_combo.attr("tableType");
			
			if(!deviceType || !table_type){
				return false;
			}
			var condition = "condition" + pos;
			if (table_type == 'businessTag') {
				var $tag = $group_combo.find(".select-tag");
				var attribute = 'tag_id';
				var operator = 'eq';
				var value = $tag.val();
				var objectType = 'MetaTag';
				var objectcode = $tag.attr("code");
				
				if(!attribute || !value){
					return false;
				}
				
				var indice = db.buildIndice("", deviceType, objectType, objectcode);
				var query = db.buildMustQueryWithQualifier(db.buildTermQualifier(attribute, db._buildOperatorValue(operator, value)));
				
				db.setIndice(condition, indice);
				db.setQuery(condition, query);

			}
		},
		_getTotalCountAttribute:function(objectType,objectCode){
			var attributeName = "";
			var attributes = TagBuilder.getAttributes(objectType, objectCode,'accountId');
			if(attributes && attributes.length > 0){
				attributeName = attributes[0].id;
			}
			return attributeName;
		},
		_buildDefinitionCondition:function(db){
			var that = this;
			var $relations_panel = $("#relations-panel");
			var pos = 0;
			$relations_panel.find(".group-combo").each(function(){
				var $group_combo = $(this);
				pos++;
				that._buildTagNodeConditionItem($group_combo, pos, db);
			});
		},
		_buildDefinitionFilter:function(db){
			var that = this;
			var $relations_panel = $("#relations-panel");
			var pos = 0;
			var rootFilters = [];
			$relations_panel.children(".relation-item").each(function(){
				var $relation_item = $(this);
				var conditions = [];
				var filter = {};
				$relation_item.find(".group-combo").each(function(){
					var $group_combo = $(this);
					
					var $group_logic = $group_combo.find(".group-logic .logic");
					pos++;
					
					if($group_combo.hasClass("behaviorTable")){
						var $behavior_types = $group_combo.find(".behavior-types");
						var behavior_types = $behavior_types.val();
						if(behavior_types == 'not_happened'){
							var conds = [];
							conds.push("condition" + pos);
							var andFilter = db.buildAndFilterWithFilters(conds);
							var notfilter = db.buildNotFilter(andFilter);
							conditions.push(notfilter);
						}else{
							conditions.push("condition" + pos);
						}
					}else{
						conditions.push("condition" + pos);
					}
					
					if(conditions.length > 0){
						if($group_logic.hasClass("and")) {
							filter = db.buildAndFilterWithFilters(conditions);
						}else if($group_logic.hasClass("or")){
							filter = db.buildOrFilterWithFilters(conditions);
						}
					}
				});
				if(conditions.length > 0){
					rootFilters.push(filter);
				}
			});
			
			var $ralation_logic = $relations_panel.children(".relation-item").eq(0).find(".ralation-logic .logic");
			if(rootFilters.length > 0){
				if($ralation_logic.hasClass("and")){
					db.setFilter(db.buildAndFilterWithFilters(rootFilters));
				}else if($ralation_logic.hasClass("or")){
					db.setFilter(db.buildOrFilterWithFilters(rootFilters));
				}
			}
		},
		buildDefinition : function() {
			var that = this;
			var respone = this._checkInputRequiredIsCorrect();
			if (!respone.success) {
				return respone;
			} else {
				var db = new DefinitionBuilder();
				db.initDefinition();
				that._buildDefinitionCondition(db);
				that._buildDefinitionFilter(db);
				if(db){
					respone.db = db;
				}
				return respone;
			}
			return respone;
		},
		isFunc : function(test){
		    return typeof test == 'function';
		},
		buildDescription : function(condition,relation,accountDesc){
			var musts = condition.query.bool.must;
			for(var i=0;i<musts.length;i++){
				var must = musts[i];
				for(var mustKey in must){
					if(mustKey && mustKey=='term'){
						var term = must[mustKey];
						for(var termKey in term){
							var metaAcc = term[termKey];
							for(var mKey in metaAcc) {
								if(metaAcc[mKey] && !this.isFunc(metaAcc[mKey])){
									accountDesc += '&emsp;&emsp;';
									accountDesc += termKey;
									accountDesc += ' '+mKey+' ';
									accountDesc += metaAcc[mKey];
									accountDesc += '<br>';
								}
							}
						}
					}
				}
				if(i<musts.length){
					accountDesc += '&emsp;&emsp;<b>';
					accountDesc += relation;
					accountDesc += '</b><br>';
				}
			}
			return accountDesc;
		},
		buildBehavior : function(condition,relation,behaviorDesc){
			var musts = condition.query.bool.must;
			if(condition.query.sub){
				for ( var mustKey in musts[0]) {
					var totalcount = musts[0][mustKey];
					for ( var totalKey in totalcount) {
						for(var vKey in totalcount[totalKey]){
							if(totalcount[totalKey][vKey] && !this.isFunc(totalcount[totalKey][vKey])){
								behaviorDesc += '&emsp;&emsp;';
								behaviorDesc += totalKey;
								behaviorDesc += ' '+vKey+' ';
								behaviorDesc += totalcount[totalKey][vKey];
								behaviorDesc += '<br>';
								
								behaviorDesc += '&emsp;&emsp;<b>';
								behaviorDesc += relation;
								behaviorDesc += '</b><br>';
							}
						}
					}
				}
				musts = condition.query.sub.query.bool.must;
			}
			for(var i=0;i<musts.length;i++){
				var must = musts[i];
				for ( var key in must) {
					var term = must[key];
					for (var termKey in term) {
						var behavior = term[termKey];
						for ( var bKey in behavior) {
							if(behavior[bKey] && !this.isFunc(behavior[bKey])){
								behaviorDesc += '&emsp;&emsp;';
								behaviorDesc += termKey;
								behaviorDesc += ' '+bKey+' ';
								behaviorDesc += behavior[bKey];
								behaviorDesc += '<br>';
							}
						}
						behaviorDesc += '&emsp;&emsp;<b>';
						behaviorDesc += relation;
						behaviorDesc += '</b><br>';
					}
				}
			}
			return behaviorDesc;
		},
		buildNexus : function(definition){
			//人群属性
			var accountDesc = '<b style="color:#5f93e1;">属性满足</b><br>';
			//人群行为
			var behaviorDesc = '<b style="color:#5f93e1;">行为满足</b><br>';
			var nexus = '&emsp;<b style="color:#5f93e1;"> ';
			for ( var key in definition.filter) {
				var nexusNodes = definition.filter[key];
				if(!nexusNodes || this.isFunc(nexusNodes)){
					continue;
				}
				nexus += key;
				nexus += ' </b><br>';
				for(var nexKey in nexusNodes){
					var nexusNode = nexusNodes[nexKey];
					for ( var nodeRelation in nexusNode) {
						var nodeRelations = nexusNode[nodeRelation];
						if(nodeRelations && !this.isFunc(nodeRelations)){
							for(var j=0;j<nodeRelations.length;j++){
								for(var nkey in nodeRelations[j]){
									if(nkey){
										if(nkey=='condition'){
											var conditions = definition.condition;
											for (var conditionkey in conditions){
												if(conditionkey&& conditionkey == nodeRelations[j][nkey]){
													var condition = conditions[conditionkey];
													var objectType = condition.indice.objectType;
													if(objectType&& objectType=='MetaAccount'){
														accountDesc = this.buildDescription(condition,nodeRelation,accountDesc);
													}else{
														behaviorDesc = this.buildBehavior(condition,nodeRelation,behaviorDesc);
													}
												}
											}
										}else if(nkey=='not'){
											var notCondition = nodeRelations[j][nkey];
											for ( var notKey in notCondition) {
												for (var notConKey in notCondition[notKey]){
													var not = notCondition[notKey][notConKey];
													for ( var k in not) {
														var conditionName = not[k];
														var conditions = definition.condition;
														for (var conditionkey in conditions){
															if(conditionkey&& conditionkey == conditionName){
																var condition = conditions[conditionkey];
																behaviorDesc = this.buildBehavior(condition,nkey,behaviorDesc);
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				var accountIndex = accountDesc.lastIndexOf('&emsp;&emsp;<b>');
				accountDesc = accountDesc.substring(0,accountIndex);
				var behaviorIndex = behaviorDesc.lastIndexOf('&emsp;&emsp;<b>');
				behaviorDesc = behaviorDesc.substring(0,behaviorIndex);
//				alert(accountDesc);
//				alert(behaviorDesc);
				var descript;
				if(-1 == accountIndex || -1 == behaviorDesc){
					descript = accountDesc + behaviorDesc;
				}else{
					descript = accountDesc + nexus + behaviorDesc;
				}
				alert(descript);
			}
		},
		validInputValue:function($input){
			var val = $input.val();
			if($input.hasClass("input-required")){
				if(!val){
					$input.addClass("input-error");
				}else{
					$input.removeClass("input-error");
				}
			}
		},
		validInputEventKey:function($input){
			var isReat = false;
			var input = $input.val();
			var $li = $input.parent();
			$li.prevAll("li").each(function(){
				var $curLi = $(this);
				var $curEventKey = $curLi.find(".event-key");
				var curEventKey = $curEventKey.val();
				if(curEventKey == input){
					//$.Pop.alerts('"'+input+'"已经存在，请重新输入');
					//$input.val("");
					//$input.addClass("input-error");
					isReat = true;
				}
			});
			return isReat;
		},
		_checkInputRequiredIsCorrect : function() {
			var that = this;
			var respone = {
				success : true,
				msg : ''
			};
			$(".input-required").each(function(){
				var $inputRequired = $(this);
				var $attributes = $inputRequired.siblings(".attributes");
				var attributesText = $attributes.find('option:selected').text();
				if(!$inputRequired.hasClass("hide")){
					var curInputValue = $inputRequired.val();
					if(!curInputValue){
						$inputRequired.addClass("input-error");
						if($inputRequired.hasClass("tables-type")){
							respone = {
								success : false,
								msg : '请选择条件'
							};
						}else if($inputRequired.hasClass("attributes")){
							respone = {
								success : false,
								msg : '请选择一个属性'
							};
						}else if($inputRequired.hasClass("operators")){
							respone = {
								success : false,
								msg : '请选择操作符'
							};
						}else if($inputRequired.hasClass("input-tagator")){
							var $tagator_input = $inputRequired.siblings(".tagator").find(".tagator_input");
							var tagator_input = $tagator_input.val();
							if(tagator_input){
								respone = {
									success : false,
									msg : '未找到匹配关键字"'+tagator_input + '"的值,请重新输入'
								};
							}else{
								respone = {
									success : false,
									msg : '请输入关键字'
								};
							}
							$inputRequired.siblings(".tagator").addClass("input-error");
						}else if($inputRequired.hasClass("behavior-events")){
							respone = {
								success : false,
								msg : '请选择发生行为的具体事件'
							};
						}else if($inputRequired.hasClass("times-operators")){
							respone = {
								success : false,
								msg : '请选择发生行为次数的操作符'
							};
						}else if($inputRequired.hasClass("times-input")){
							respone = {
								success : false,
								msg : '请输入发生行为的次数'
							};
						}else if($inputRequired.hasClass("input-value")){
							respone = {
								success : false,
								msg : '请输入“'+attributesText+'”的参数值'
							};
							if($inputRequired.hasClass("event-key")){
								respone = {
									success : false,
									msg : '请输入key'
								};
							}else if($inputRequired.hasClass("event-value")){
								respone = {
									success : false,
									msg : '请输入value'
								};
							}else if($inputRequired.hasClass("event-values")){
								respone = {
									success : false,
									msg : '请输入value'
								};
							}
						}else if($inputRequired.hasClass("form-date")){
							respone = {
								success : false,
								msg : '请选择日期'
							};
						}else if($inputRequired.hasClass("event-key")){
							respone = {
								success : false,
								msg : '请选择key'
							};
						}else if($inputRequired.hasClass("event-params-operators")){
							respone = {
								success : false,
								msg : '请选择操作符'
							};
						}else if($inputRequired.hasClass("select-tag")){
							respone = {
								success : false,
								msg : '请选择一类标签'
							};
							$inputRequired.addClass("input-error");
							$inputRequired.siblings(".dropdown-panel").addClass("input-error");
						}
						return false;
					}else{
						if($inputRequired.hasClass("times-input")){
							if(!$.checkNumberIsInteger(curInputValue)){
								respone = {
									success : false,
									msg : '发生行为的次数只能是大于0的正整数'
								};
								$inputRequired.addClass("input-error");
								return false;
							}else if(curInputValue == 0){
								respone = {
									success : false,
									msg : '发生行为的次数只能是大于0的正整数'
								};
								$inputRequired.addClass("input-error");
								return false;
							}
						}else if($inputRequired.hasClass("input-int")){
							if(!$.checkNumberIsInteger(curInputValue)){
								respone = {
									success : false,
									msg :'“'+attributesText + '”只能是大于0的正整数'
								};
								$inputRequired.addClass("input-error");
								return false;
							}else if(curInputValue == 0){
								respone = {
									success : false,
									msg : '“'+attributesText + '”只能是大于0的正整数'
								};
								$inputRequired.addClass("input-error");
								return false;
							}
						}else if($inputRequired.hasClass("event-key")){
							var isReat = that.validInputEventKey($inputRequired);
							if(isReat){
								respone = {
									success : false,
									msg : '“'+curInputValue + '”已经存在，请重新输入'
								};
								$inputRequired.addClass("input-error");
								return false;
							}
						}else if($inputRequired.hasClass("select-tag")){
							$inputRequired.siblings(".dropdown-panel").removeClass("input-error");
						}
						$inputRequired.removeClass("input-error");
						
					}
				}
			});
			
			return respone;
		},
		isShowBehaviorAttributeLabelBtn:function($behavior_attributes){
			if($behavior_attributes.children("ul").children("li").length > 0){
				$behavior_attributes.find(".condition-label").removeClass("hide");
				if($behavior_attributes.children("ul").children("li").length >= 3){
					$behavior_attributes.find(".add-behavior-attribute").addClass("hide");
				}else{
					$behavior_attributes.find(".add-behavior-attribute").removeClass("hide");
				}
			}else{
				$behavior_attributes.find(".add-behavior-attribute").removeClass("hide");
				$behavior_attributes.find(".condition-label").addClass("hide");
			}
		},
		_querySearchInputTagatorValuesList:function($inputTagator,attributeCode,response){
			var that = this;
			var namesList = that._buildTagatorNamesList(response);
			var datasList = [];
			if($inputTagator.attr("datasList")){
				datasList = JSON.parse($inputTagator.attr("datasList"));
				if(datasList && datasList.length > 0){
					datasList = _.union(datasList,response);
				}else{
					datasList = response;
				}
			}else{
				datasList = response;
			}
			$inputTagator.attr("datasList",JSON.stringify(datasList));
			that._renderSearchInputTagator($inputTagator, namesList,'','');
		},
		_buildTagatorNamesList:function(list){
			var namesList = [];
			for(var i = 0;i < list.length;i++){
				namesList.push(list[i].value);
			}
			return namesList;
		},
		_renderSearchInputTagator : function($input_tagator, namesList, placeHolder, minWidthClass) {
			var nameList = namesList;
			var $tagator = $input_tagator.data('tagator');
			if ($tagator === undefined) {
				$input_tagator.tagator({
					autocomplete : nameList,
					allowCustom : false,
					showAllOptionsOnFocus : true,
					placeHolder : placeHolder,
					minWidthClass : minWidthClass
				});
			}else{
				//if(namesList && namesList.length > 0){
					var autocomplete = $tagator.settings.autocomplete;
					$tagator.settings.autocomplete =  namesList;
					$tagator.refresh();
				//}
			}
		},
		_getValuesFromDatasList:function(datasList,keys){
			var values = [];
			for(var i = 0;i <keys.length;i++){
				for(var j = 0;j < datasList.length;j++){
					if(keys[i] == datasList[j].key){
						values.push(datasList[j].value);
						break;
					}
				}
			}
			return values;
		},
		_buildTrueFlaseStringToBoolean : function(string) {
			var boolean = false;
			if (string == 'false') {
				boolean = false;
			} else if (string == 'true') {
				boolean = true;
			}
			return boolean;
		},
		_buildBehaviorAttributeTableAttributes:function(attributeTables){
			var attributeTableAttributes = [];
			if(attributeTables && attributeTables.length > 0){
				var deviceType = this.model.deviceType;
				var group = TagBuilder.findByAttributeGroupTypeAndCode(deviceType,"tag_visible","tag_visible");
				for(var i = 0;i < attributeTables.length;i++){
					var attributeTable = attributeTables[i];
					var objectCode = attributeTable.id;
					var objectType = attributeTable.objectType;
					var attributes = TagBuilder.getAttributesByObject(group, attributeTables[i].id);
						attributeTable.attributes = attributes;
						attributeTableAttributes.push(attributeTable);
						
				}
				
			}
			return attributeTableAttributes;
		},
		_getRandomNum :function(min,max){   
			var range = max - min;   
			var rand = Math.random();   
			return(min + Math.round(rand * range)); 
		},
		_buildAttributeTableAttributes:function(attributeTables){
			var attributeTableAttributes = [];
			if(attributeTables && attributeTables.length > 0){
				var deviceType = this.model.deviceType;
				var group = TagBuilder.findByAttributeGroupTypeAndCode(deviceType,"tag_visible","tag_visible");
				for(var i = 0;i < attributeTables.length;i++){
					var attributeTable = attributeTables[i];
					var attributes = TagBuilder.getAttributesByObject(group, attributeTable.id);
//					var objectCode = attributeTable.id;
//					var objectType = attributeTable.objectType;
//					var attributes = TagBuilder.getAttributes(objectType, objectCode,'tagUsed');
					attributeTable.attributes = attributes;
				}
				attributeTableAttributes = attributeTables;
			}
			return attributeTableAttributes;
		}
	};

	window.dmpapp = window.dmpapp || {};
	window.dmpapp.BusinessTagDefinitionController = prototype;
	
	var func = new Function();
	func.prototype = prototype;
	return func;
});
