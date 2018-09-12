define([ 'app/lib/tag/builder/DefinitionBuilder','app/lib/tag/parser/DefinitionParser', 'app/controllers/tag/TagBuilder', './CrowdDefinitionBuilderHtml', 'app/controllers/common/searchTagator'], function(DefinitionBuilder,DefinitionParser, TagBuilder, CrowdDefinitionBuilderHtml) {
	var prototype = {
		model : {
			deviceType : "",
			aggregationOperators : [{
				id:'value',
				label : '数值'
			},{
				id:'sum',
				label : '求和值'
			},{
				id:'max',
				label : '最大值'
			},{
				id:'min',
				label : '最小值'
			},{
				id:'avg',
				label : '平均值'
			}]
		},
		getAccountIdTypes:function(){
			return TagBuilder.getAccountIdTypes();
		},
		initHtml : function() {
			var deviceType = this.model.deviceType;
			//var tableTypes = TagBuilder.getTableTypeSelector(deviceType);
			var html = CrowdDefinitionBuilderHtml.initRelationPanel();
			//html += CrowdDefinitionBuilderHtml.createAddRelationBtn();
			return html;
		},
		resetSearchConditions:function(){
			var html = CrowdDefinitionBuilderHtml.createRelationWelcome('attributeTable');
			return html;
		},
		buildTagHtmlByTagDefinitionData : function(definition, tableTypes) {
			var that = this;
			var deviceType = that.model.deviceType;
			var dp = new DefinitionParser();    
    		dp.fromMap(definition);
    		var def = dp.toDefinition();
    		definition = def;
    		that.model.definition = definition;
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
									conditionName = itemNodeChildren[i].condition;
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
									conditionName = itemNodeChildren[i].condition;
								}
							}
						}else if(itemNode.hasOwnProperty('condition')){
							itemNodeChildren = itemNode;
							conditionName = itemNode.condition;
						}
						
						var tableType = that._getTableTypeByObjectType(conditionName);
						html += '<div class="relation-item relation-item-'+tableType+'">';
						var behaviorDefinitionParams = that._getDefinitionParams(conditionName,definition);
						html += CrowdDefinitionBuilderHtml.createRelationItemHead(tableType,conditionName,behaviorDefinitionParams,dp);
						html += '<div class="ralation-logic">';
						if(relationLogic == 'and'){
							html += '<div class="logic '+relationLogic+'" onclick="dmpapp.CrowdDefinitionController.toggleRelationLogic($(this));">并且</div>';
						}else if(relationLogic == 'or'){
							html += '<div class="logic '+relationLogic+'" onclick="dmpapp.CrowdDefinitionController.toggleRelationLogic($(this));">或者</div>';
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
								
								var attributeTables = [];
								if(tableType == 'attributeTable'){
									var attributeCode = that._getAttributeCodeByDefinition(conditionName);
									attributeTables = TagBuilder.getAttributeTables(deviceType);
									var attributeTableAttributes = that._buildAttributeTableAttributes(attributeTables);
									var definitionParams = that._getDefinitionParams(conditionName,definition);
									html += CrowdDefinitionBuilderHtml.createGroupComboHtml(tableType,attributeTableAttributes,groupLogic,attributeCode,conditionName,definitionParams,dp);
									html += CrowdDefinitionBuilderHtml.createAddGroupComboBtn(tableType);
								}else if(tableType == 'behaviorTable'){
									var attributeCode = '';
									var definitionParams = that._getDefinitionParams(conditionName,definition);
									attributeTables = TagBuilder.getBehaviorTables(deviceType);
									//var attributeTableAttributes = that._buildAttributeTableAttributes(attributeTables);
									
									var objectCode = definitionParams.indice.objectCode;
									var attributeTablesWithSac = TagBuilder.getBehaviorTablesWithSac(deviceType,objectCode);
									var attributeTableAttributes = this._buildBehaviorAttributeTableAttributes(attributeTablesWithSac);
									
									html += CrowdDefinitionBuilderHtml.createGroupComboHtml(tableType,attributeTableAttributes,groupLogic,attributeCode,conditionName,definitionParams,dp,attributeTables,hasNotFilter);
									html += CrowdDefinitionBuilderHtml.createAddGroupComboBtn(tableType);
								}
							}
						}
						
						html += '</div>';
						html += '</div>';
					}
				}
				html += '</div>';
				//html += CrowdDefinitionBuilderHtml.createAddRelationBtn();
			}
			return html;
		},
		_getUserTable:function(attributeTables){
			var table = [];
			if(attributeTables && attributeTables.length > 0){
				for(var i = 0;i < attributeTables.length;i++){
					if(attributeTables[i].id == 'fpd_account_user'){//fpd_account_user
						table.push(attributeTables[i]);
						break;
					}
				}
			}
			return table;
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
			
			var deviceType = this.model.deviceType;
			var attributeTables = [];
			var attributeTableAttributes = [];
			var tableType = $btn.attr("tableType");
			if(tableType == 'attributeTable'){
				attributeTables = TagBuilder.getAttributeTables(deviceType);
				//attributeTables = this._getUserTable(attributeTables);
				attributeTableAttributes = this._buildAttributeTableAttributes(attributeTables);
				if(!attributeTables || attributeTables.length == 0){
					$.Pop.alerts("还没有可以创建用户属性条件的数据源");
					return false;
				}else{
					/*var has = that._checkHasAttributeTableAttributes(attributeTableAttributes);
					if(!has){
						$.Pop.alerts("还没有可以创建用户属性条件的数据源");
						return false;
					}*/
				}
			}else if(tableType == 'behaviorTable'){
				attributeTables = TagBuilder.getBehaviorTables(deviceType);
				/*var objectCode = definitionParams.indice.objectCode;
				var attributeTablesWithSac = TagBuilder.getBehaviorTablesWithSac(deviceType,objectCode);
				attributeTableAttributes = this._buildBehaviorAttributeTableAttributes(attributeTablesWithSac);*/
				attributeTableAttributes = this._buildAttributeTableAttributes(attributeTables);
				if(!attributeTables || attributeTables.length == 0){
					$.Pop.alerts("还没有可以创建用户行为条件的数据源");
					return false;
				}else{
					var has = that._checkHasAttributeTableAttributes(attributeTableAttributes);
					if(!has){
						$.Pop.alerts("还没有可以创建用户行为条件的数据源");
						return false;
					}
				}
				$relation_item.find(".lately-date-box").removeClass("hide");
			}
			
			$ralation_box.find(".welcome-box").remove();
			$ralation_box.find(".add-group-combo").remove();
			
			var html = CrowdDefinitionBuilderHtml.createGroupComboHtml(tableType,attributeTableAttributes,group_logic,'','','','',attributeTables);
			html += CrowdDefinitionBuilderHtml.createAddGroupComboBtn(tableType);
			$ralation_box.append(html);
			//$ralation_box.children(".group-combo").last().addClass("group-combo-last");
			
			this.checkIsShowAddRelationBtn();
			this.checkIsShowAddGroupComboBtn();
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
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
				var html = CrowdDefinitionBuilderHtml.createRelationWelcome(tableType);
				$ralation_box.html(html);
				if(tableType == 'behaviorTable'){
					$relation_item.find(".lately-date-box").addClass("hide");
					if($relations_panel.children(".relation-item-behaviorTable").length > 1){
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
			tableType = tableType || 'behaviorTable';
			var $relations_panel = $("#relations-panel");
			var html = CrowdDefinitionBuilderHtml.createRelationItem(tableType);
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
		changeTimesOperators:function($timesOperator){
			
		},
		_checkBehaviorAggregationAttributes:function($behavior_attributes){
			var that = this;
			var response = {
				isOk : true,
				msg :''
			};
			var len = 0;
			var attributeName = "";
			$behavior_attributes.find("ul").children("li").each(function(){
				var $li = $(this);
				var $attributes = $li.find(".attributes");
				var enumerable = $attributes.find("option:selected").attr("enumerable");
				enumerable = that._buildTrueFlaseStringToBoolean(enumerable);
				var valueType = $attributes.find("option:selected").attr("valueType");
				attributeName = $attributes.find('option:selected').text();
				
				/*var $aggregation_operators = $li.find(".aggregation-operators");
				var aggregation_operators = $aggregation_operators.val();
				if(aggregation_operators){
					if(aggregation_operators != 'value'){
					}
				}else{*/
					if(!enumerable && valueType == 'Number'){
						len++;
					}
				//}
				
			});
			if(len > 1){
				response = {
					isOk : false,
					msg :'只能添加一个聚合类型的属性，请重新选择'
				};
			}
			return response;
		},
		changeAttributes:function($attributes){
			var $relation_item = $attributes.parentsUntil(".relation-item").parent();
			var $group_combo = $attributes.parentsUntil(".group-combo").parent();
			var $behavior_attributes = $group_combo.find(".behavior-attributes");
			$attributes.removeClass("input-error").nextAll().remove();
			var attribute = $attributes.val();
			if(attribute){
				var objectType = $attributes.find("option:selected").attr("objectType");
				if(objectType == 'MetaBehavior' && attribute == 'totalCount'){//行为次数
					var response = this._checkBehaviorAggregationAttributes($behavior_attributes);
					if(response.isOk){
						var html = "";
						html += CrowdDefinitionBuilderHtml.createBehaviorTimesOperators();
						html += CrowdDefinitionBuilderHtml._createBehaviorTimesInput();
						$attributes.after(html);
					}else{
						$.Pop.alerts(response.msg);
						$attributes.val("");
					}
				}else{
					var definitionParams = {};
					var response = this._checkBehaviorAggregationAttributes($behavior_attributes);
					if(response.isOk){
						var operator = "";
						var conditionName = $group_combo.attr("conditionName");
						var definition = this.model.definition;
						if(conditionName && definition){
							definitionParams = this._getDefinitionParams(conditionName,definition);
							if(definitionParams && definitionParams.qualifierType == 'range'){
								operator = definitionParams.qualifierType;
							}else{
								var operatorValue = definitionParams.operatorValue;
								for(var o in operatorValue){
									operator = o;
									break;
								}
							}
							
						}
						
						var html = "";
						var enumerable = $attributes.find("option:selected").attr("enumerable");
						enumerable = this._buildTrueFlaseStringToBoolean(enumerable);
						var valueType = $attributes.find("option:selected").attr("valueType");
						
						var $behavior_types = $relation_item.find(".behavior-types");
						var behavior_types = $behavior_types.val();
						if(!enumerable && valueType == 'Number' && objectType == 'MetaBehavior'){
							var aggregationOperator = '';
							if(definitionParams && definitionParams.attributeCode){
								aggregationOperator = CrowdDefinitionBuilderHtml.getAggregationOperatorByName(definitionParams.attributeCode);
							}
							html += CrowdDefinitionBuilderHtml.createAggregationOperatorsHtml(aggregationOperator,behavior_types);
							
						}
						if(objectType == 'MetaBehavior'){
							if($attributes.attr("operator")){
								operator = $attributes.attr("operator");
							}
						}
						var operators = TagBuilder.getOperators(enumerable, valueType);
						html += CrowdDefinitionBuilderHtml.createOperatorsHtml(operators,operator);
						$attributes.after(html);
						this.changeOperators($attributes.siblings(".operators"));
					}else{
						$.Pop.alerts(response.msg);
						$attributes.val("");
					}
				}
			}
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
		changeAggregationOperators:function($aggregationOperator){
			
		},
		changeOperators : function($operators) {
			var $group_combo = $operators.parentsUntil(".group-combo").parent();
			$operators.removeClass("input-error").nextAll().remove();
			var operator = $operators.val();
			var multiValue = $operators.find("option:selected").attr("multiValue");
			multiValue = this._buildTrueFlaseStringToBoolean(multiValue);
			var valueType = $operators.find("option:selected").attr("valueType");
			var $attributes = $operators.siblings(".attributes");
			var objectType = $attributes.find("option:selected").attr("objectType");
			var objectCode = $attributes.find("option:selected").attr("objectCode");
			var attributeCode = $attributes.val();
			
			var that = this;
			var conditionName = $group_combo.attr("conditionName") || '';
			var definition = that.model.definition;
			if (valueType == 'Number' || valueType == 'String') {// 字符串类型
				if(multiValue){
					var values = [];//api
					if(conditionName && definition){
						var tableType = $group_combo.attr("tableType");
						if(tableType == 'behaviorTable'){
							var operatorValueObj = that._getOperatorValueByDefinition(conditionName,definition,attributeCode);
							if(operator == operatorValueObj.key){
								if(operatorValueObj.value){
									values = operatorValueObj.value;
								}
							}
							
						}else{
							var definitionParams = that._getDefinitionParams(conditionName,definition);
							var operatorValue = definitionParams.operatorValue;
							for(var o in operatorValue){
								if(operator == o){
									values = operatorValue[o] || [];
									break;
								}
							}
						}
						
					}
					
					
					var keys = "";
					if(values && values.length > 0){
						var lenth = values.length;
						for(var i = 0;i < lenth;i++){
							if(i == lenth - 1){
								keys += values[i];
							}else{
								keys += values[i]+",";
							}
						}
					}
					
					var deviceType = that.model.deviceType;
					var param = {
						url : '/dmp-web/tag/metadata/enum/'+objectCode+'/'+attributeCode + '/'+deviceType,
						callType : 'get',
						contentType : 'application/json',
						dataType : 'json',
						data : {q:'',key:keys}
					};
					$.layerLoading.show();
					$.callApi(param, function(response) {
						$.layerLoading.hide();
						values = that._getValuesFromDatasList(response.rows,values);
						var html = CrowdDefinitionBuilderHtml.createParamValueSearchHtml(values);
						$operators.after(html);
						var $input_tagator = $operators.siblings(".input-tagator");
						that._querySearchInputTagatorValuesList($input_tagator,attributeCode,response.rows);
						
						if(response.total >=20){
							that.tagatorInputBindEvent($input_tagator);
						}
					}, function(XMLHttpRequest, textStatus, errorThrown) {
						$.layerLoading.hide();
					});
					
				}else{
					var value = "";//api
					if(conditionName && definition){
						var tableType = $group_combo.attr("tableType");
						if(tableType == 'behaviorTable'){
							var operatorValueObj = that._getOperatorValueByDefinition(conditionName,definition,attributeCode);
							if(operator == operatorValueObj.key){
								if(operatorValueObj.value){
									value = operatorValueObj.value;
								}
							}
							
						}else{
							var definitionParams = that._getDefinitionParams(conditionName,definition);
							var operatorValue = definitionParams.operatorValue;
							for(var o in operatorValue){
								value = operatorValue[o];
								break;
							}
						}
					}
					
					var html = CrowdDefinitionBuilderHtml.createInputHtml(value);
					$operators.after(html);
				}
			} else if (valueType == 'Time') {// 日期
				var definitionParams = {};
				if(conditionName,definition){
					definitionParams = that._getDefinitionParams(conditionName,definition);
				}
				var dates = [];
				var html = "";
				if(operator == 'range'){
					html = CrowdDefinitionBuilderHtml.createAttributeLatelyDate(definitionParams);
				}else{
					if(definitionParams && definitionParams.operatorValue){
						var operatorValue = definitionParams.operatorValue;
						for(var o in operatorValue){
							if(operator == o && operatorValue[o]){
								dates.push(operatorValue[o]);
								break;
							}
						}
					}
					
					html = CrowdDefinitionBuilderHtml.createDateRangeHtml(operator, dates);
				}
				
				$operators.after(html);
				//that._initDatepickerDataRange($operators.siblings(".input-daterange"));
			} else if (valueType == 'Tag') {// 标签

			}
		},
		
		tagatorInputBindEvent:function($input_tagator){
			var that = this;
			var $tagator_input = $input_tagator.siblings(".tagator").find(".tagator_input");
			var $attributes = $input_tagator.siblings(".attributes");
			var objectCode = $attributes.find("option:selected").attr("objectCode");
			var attributeCode = $attributes.val();
			var deviceType = that.model.deviceType;
			var times;
			$tagator_input.bind('keyup',function(){
				var $input = $(this);

				try{
					clearTimeout(times); 
				}catch(e){
					//alert("输入有误，请检查!");
				};
				times=setTimeout(function(){
					
					var val = $input.val() || "";
					if(deviceType && objectCode && attributeCode){
						var param = {
							url : '/dmp-web/tag/metadata/enum/'+objectCode+'/'+attributeCode + '/'+deviceType,
							callType : 'get',
							contentType : 'application/json',
							dataType : 'json',
							data : {q:val,key:""}
						};
						$.layerLoading.show();
						/*$attributes.attr("disabled",true);
						$operators.attr("disabled",true);*/
						$.callApi(param, function(response) {
							$.layerLoading.hide();
							/*$attributes.attr("disabled",false);
							$operators.attr("disabled",false);*/
							that._querySearchInputTagatorValuesList($input_tagator,attributeCode,response.rows);
							
						}, function(XMLHttpRequest, textStatus, errorThrown) {
							$.layerLoading.hide();
							/*$attributes.attr("disabled",false);
							$operators.attr("disabled",false);*/
						});
					}
					
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
		
		changeBehaviorTypes:function($behaviorTypes){
			var $group_box = $behaviorTypes.parentsUntil(".group-box").parent(); 
			var $behavior_attributes = $group_box.find(".behavior-attributes");
			$behavior_attributes.find("ul").html("");
			this.isShowBehaviorAttributeLabelBtn($behavior_attributes);
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight,200);
			}
			/*var $times_operators = $behaviorTypes.siblings(".times-operators");
			var $times_input = $behaviorTypes.siblings(".times-input");
			var $times_span = $behaviorTypes.siblings(".times-span");
			var behaviorType = $behaviorTypes.val();
			if(behaviorType == 'happened'){
				$times_operators.removeClass("hide");
				$times_input.removeClass("hide");
				$times_span.removeClass("hide");
			}else if(behaviorType == 'not_happened'){
				$times_operators.addClass("hide");
				$times_input.addClass("hide");
				$times_span.addClass("hide");
			}*/
		},
		changeBehaviorEvents:function($behaviorEvents){
			var $group_box = $behaviorEvents.parentsUntil(".group-box").parent(); 
			var $behavior_attributes = $group_box.find(".behavior-attributes");
			$behavior_attributes.find("ul").html("");
			this.isShowBehaviorAttributeLabelBtn($behavior_attributes);
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight,200);
			}
		},
		removeBehaviorAttributeHtml:function($delAttr){
			var $behavior_attributes = $delAttr.parentsUntil(".behavior-attributes").parent();
			$delAttr.parent().remove();
			this.isShowBehaviorAttributeLabelBtn($behavior_attributes);
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight,200);
			}
		},
		showHideCalendar:function(target){
			var $target = $(target);
			$(".calendar-box").addClass("hide");
			$(".TD_Calendar").addClass("hide");
			$(".calendar-tools").addClass("hide");
			$(".form-actions").addClass("hide");
			$(".calendar-box .TD_Calendar").removeClass("hide");
			if($target.hasClass("date-start")){
				$target.siblings(".start-calendar").removeClass("hide");
			}else if($target.hasClass("date-end")){
				$target.siblings(".end-calendar").removeClass("hide");
			}
			var $input_daterange = $target.parent();
			this._initDatepickerDataRange($input_daterange);
			if (window.parent && window.parent.iFrameScrollHeight) {
				window.setTimeout(window.parent.iFrameScrollHeight, 200);
			}
			if(document.all){
    			window.event.cancelBubble = true;
    	 	}else{
    			event.stopPropagation(); 
    		}
		},
		_initDatepickerDataRange : function($input_daterange) {
			$input_daterange.find(".calendar-box").html("");
			var that = this;
			var $start_calendar = $input_daterange.find(".start-calendar");
			var $date_start = $start_calendar.siblings(".date-start");
			var date_start = $date_start.val();
			var $end_calendar = $input_daterange.find(".end-calendar");
			var $date_end = $start_calendar.siblings(".date-end");
			var date_end = $date_end.val();
			var today = that._getTodayDate();
			$start_calendar.html("");
			$end_calendar.html("");
			var dateStart = new TD.ui.Calendar($start_calendar,{
				number:1,//多日历
		        intervals:false,//时段选择
		        dayOperationStatus : true,
		        format : "yyyy-MM-dd",//日期格式
		        uiStyle:"TD_",//样式,
		        language : "zh_CN",//语言
		        preNextMonthButton : {
		            pre : true,
		            next : true
		        },
		        date:{start : date_start,end : date_start},
		        disable : {
	            	first : '',
	            	last : today
	            }
			});
			
			document.onclick = function(){
				if (!($(event.target).parents(".TD_Calendar").length > 0)) {
					that.hideTdCalendar();
				}
	    	};
			
			$(dateStart).on("selectDay",function(e,msg){
				if(document.all){
	    			window.event.cancelBubble = true;
	    	 	}else{
	    			event.stopPropagation(); 
	    		}
				
				if(msg && msg.status == 'disable'){
					return false;
				}
				//console.dir([e,msg,'dd']);
				var startVal = msg.selected;
				$date_start.removeClass("input-error");
				$start_calendar.addClass("hide");
				$date_start.val(startVal);
			});
			
			var dateEnd = new TD.ui.Calendar($end_calendar,{
				number:1,//多日历
		        intervals:false,//时段选择
		        dayOperationStatus : true,
		        format : "yyyy-MM-dd",//日期格式
		        uiStyle:"TD_",//样式,
		        language : "zh_CN",//语言
		        preNextMonthButton : {
		            pre : true,
		            next : true
		        },
		        date:{start : date_end,end : date_end},
		        disable : {
	            	first : '',
	            	last : today
	            }
			});
			$(dateEnd).on("selectDay",function(e,msg){
				if(document.all){
	    			window.event.cancelBubble = true;
	    	 	}else{
	    			event.stopPropagation(); 
	    		}
				//console.dir([e,msg,'dd']);
				var endVal = msg.selected;
				$end_calendar.addClass("hide");
				$date_end.val(endVal);
				var response = that._checkDateRangeValue(date_start, endVal);
				if (!response.isCorret) {
					$date_start.val(endVal);
					$date_start.removeClass("input-error");
					$date_end.removeClass("input-error");
				}
				return false;
			});
		},
		_checkDateRangeValue:function(startDate, endDate){
			var response = {
				isCorret : true,
				msg :''
			};
			if(startDate && endDate){
    			var date_start = new Date(startDate);
				var date_end = new Date(endDate);
				var startDateTime = parseFloat(date_start.getTime());
				var endDateTime = parseFloat(date_end.getTime());
				if(startDateTime < endDateTime){
					var times = endDateTime - startDateTime;
					//计算出相差天数
					var days=Math.floor(times/(24*3600*1000));
					if(days > 90){
						response = {
							isCorret : false,
							msg :'日期范围不能超过90天，请重新选择'
						};
					}
				}else{
					response = {
						isCorret : false,
						msg :'开始日期不能大于结束日期，请重新选择'
					};
				}
    		}
			return response;
		},
		showTdCalendar:function($calendarBox){
			if($calendarBox.children().length == 0){
				this.initTdCalendar($calendarBox);
			}
			
			$(".calendar-tools").addClass("hide");
			$(".form-actions").addClass("hide");
			$(".TD_Calendar").addClass("hide");
			
			var $calendar_tools = $calendarBox.siblings(".calendar-tools");
			$calendar_tools.removeClass("hide");
			$calendarBox.removeClass("hide");
			$calendarBox.find(".TD_Calendar").removeClass("hide");
			$calendar_tools.siblings(".form-actions").removeClass("hide");
			
			
			$calendar_tools.find(".lately-input input").val("").removeClass("input-error");
			
			if(document.all){
    			window.event.cancelBubble = true;
    	 	}else{
    			event.stopPropagation(); 
    		}
			
			if (window.parent && window.parent.iFrameScrollHeight) {
				window.setTimeout(window.parent.iFrameScrollHeight, 200);
			}
		},
		hideTdCalendar:function($btn){
    		if($btn){
    			var $lately_date = $btn.parentsUntil(".lately-date").parent();
        		var $date_box = $lately_date.find(".date-box");
    			if($btn.hasClass("confirm")){
            		var $select_label = $lately_date.find(".select-label");
            		var dateLabel = $date_box.attr("dateLabel");
            		var startDate = $date_box.attr("startDate");
            		var endDate = $date_box.attr("endDate");
            		if(startDate && endDate){
            			var date_start = new Date(startDate);
        				var date_end = new Date(endDate);
        				var startDateTime = parseFloat(date_start.getTime());
        				var endDateTime = parseFloat(date_end.getTime());
        				if(startDateTime < endDateTime){
        					var times = endDateTime - startDateTime;
        					//计算出相差天数
        					var days=Math.floor(times/(24*3600*1000));
        					if(days > 90){
        						$.Pop.alerts("日期范围不能超过90天，请重新选择");
        						return false;
        					}
        				}
            		}
            		$select_label.html(dateLabel).attr("startDate",startDate).attr("endDate",endDate);
        		}
    		}
    		
    		$(".TD_Calendar").addClass("hide");
    		$(".calendar-tools").addClass("hide");
    		$(".lately-date-box .form-actions").addClass("hide");
		},
		
		checkLatelyDate:function($date){
			var date = $date.val();
			if(date && $.checkNumberIsInteger(date)){
				$date.removeClass("input-error");
			}else{
				$date.removeClass("input-error");
			}
		},
		checkBehaviorTimes:function($times){
			var times = $times.val();
			if(times && $.checkNumberIsInteger(times)){
				$times.removeClass("input-error");
			}else{
				$times.addClass("input-error");
			}
		},
		fastSelectLatelyDate:function($fastDate){
			var $lately_date = $fastDate.parentsUntil(".lately-date").parent();
			var $select_label = $lately_date.find(".select-label");
			var $calendar_tools = $lately_date.find(".calendar-tools");
			var $date_box = $lately_date.find(".date-box");
				
			var startDate = $fastDate.attr("date");
			var select_label = $fastDate.html();
			$select_label.html(select_label).attr("startDate",startDate).attr("endDate","");
			$calendar_tools.addClass("hide");
			$date_box.find(".TD_Calendar").addClass("hide");
			$(".lately-date-box .form-actions").addClass("hide");
		},
		comfirmSelectLatelyDate:function($latelyButton){
			var $lately_date = $latelyButton.parentsUntil(".lately-date").parent();
			var $select_label = $lately_date.find(".select-label");
			var $calendar_tools = $lately_date.find(".calendar-tools");
			var $date_box = $lately_date.find(".date-box");
			
			var $startDate = $latelyButton.siblings("input");
			var startDate = $startDate.val();
			
			if($.checkNumberIsInteger(startDate)){
				if(startDate > 90){
					$.Pop.alerts("天数最长不能大于90天，请重新输入");
					$startDate.addClass("input-error");
				}else{
					var select_label = '近' + startDate + '日';
					$select_label.html(select_label).attr("startDate",startDate).attr("endDate","");
					$calendar_tools.addClass("hide");
					$date_box.find(".TD_Calendar").addClass("hide");
					$(".lately-date-box .form-actions").addClass("hide");
				}
			}else{
				$.Pop.alerts("天数只能为正整数，请重新输入");
				$startDate.addClass("input-error");
			}
		},
		_getTodayDate:function(){
			var today = '';
			var myDate = new Date();
			var fullYear = myDate.getFullYear();
			var month = myDate.getMonth() + 1;  
			var date = myDate.getDate();
			today = fullYear + '-' + month +'-'+date;
			return today;
		},
		initTdCalendar:function($calendar){
			var that = this;
			var today = that._getTodayDate();
			var calendar = new TD.ui.Calendar($calendar,{
				number:2,//多日历
				intervals:true,//时段选择
				date:{start : '',end : ''},
				disable : {
		            first : '',
		            last : today,
		        },
		        dayOperationStatus : true,
				format : "yyyy-MM-dd",//日期格式
				uiStyle:"TD_",//样式,
				language : "zh_CN",//语言
				preNextMonthButton : {
					pre : true,
					next : true
				}
			});
			$(calendar).on("selectDay",function(e,msg){
				var startDate = msg.date.start;
				var endDate = msg.date.end;
				var dateLabel = startDate + '~' + endDate;
				$calendar.attr("dateLabel",dateLabel).attr("startDate",startDate).attr("endDate",endDate);
				//console.dir([e,msg,$calendar]);
			});
			
			document.onclick = function(){
				if (!($(event.target).parents(".TD_Calendar").length > 0)) {
					that.hideTdCalendar();
				}
	    	};
	    	
	    	$(".lately-date-box .form-actions").bind('click',function(){
	    		if(document.all){
	    			window.event.cancelBubble = true;
	    	 	}else{
	    			event.stopPropagation(); 
	    		}
	    	}); 
	    	
	    	$(".calendar-tools").bind('click',function(){
	    		if(document.all){
	    			window.event.cancelBubble = true;
	    	 	}else{
	    			event.stopPropagation(); 
	    		}
	    	}); 
		},
		addBehaviorAttributeHtml:function($btnAddBehaviorAttribute){
			var $group_combo = $btnAddBehaviorAttribute.parentsUntil(".group-combo").parent();
			var $behavior_types = $group_combo.find(".behavior-types");
			var behavior_types = $behavior_types.val();
			var $behavior_attributes = $group_combo.find(".behavior-attributes");
			var $behavior_events =  $group_combo.find(".behavior-events");
			var attributeTableId = $behavior_events.val();
			var deviceType = this.model.deviceType;
			var attributeTables = TagBuilder.getBehaviorTablesWithSac(deviceType,attributeTableId);
			var attributeTableAttributes = this._buildBehaviorAttributeTableAttributes(attributeTables);
			var html = CrowdDefinitionBuilderHtml.createBehaviorAttributesItem(attributeTableAttributes,'','','',behavior_types);
			$behavior_attributes.children("ul").append(html);
			this.isShowBehaviorAttributeLabelBtn($behavior_attributes);
			
			if (window.parent && window.parent.iFrameHeight) {
				window.setTimeout(window.parent.iFrameHeight, 200);
			}
		},
		_getKeysFromDatasList:function($input_values,values){
			var keys = [];
			var datasList = JSON.parse($input_values.attr("datasList"));
			if(datasList && datasList.length > 0){
				for(var i = 0;i <values.length;i++){
					for(var j = 0;j < datasList.length;j++){
						if(values[i] == datasList[j].value){
							keys.push(datasList[j].key);
							break;
						}
					}
				}
			}
			return keys;
		},
		_buildInputValue:function($group_combo){
			var $operators = $group_combo.find(".operators");
			var operator = $operators.val();
			var valueType = $operators.find("option:selected").attr("valueType");
			var value;
			if(valueType == 'Time'){
				value = [];
				var $input_daterange = $group_combo.find(".input-daterange");
				var $date_start = $input_daterange.find(".date-start");
				var $date_end = $input_daterange.find(".date-end");
				var date_start = $date_start.val();
				var date_end = $date_end.val();
				if (operator == 'range') {
					value.push(date_start);
					value.push(date_end);
				} else {
					value.push(date_start);
				}
			}else{
				if($group_combo.find(".input-values").length > 0){
					var $input_values = $group_combo.find(".input-values");
					var valueStr = $input_values.val();
					if(valueStr){
						value = valueStr.split(",");
					}
					value = this._getKeysFromDatasList($input_values,value);
				} else {
					var $input_value = $group_combo.find(".input-value");
					value = $input_value.val();
				}
			}
			return value;
		},
		_buildBehaviorTimeValue:function($group_combo){
			var $relation_item = $group_combo.parentsUntil(".relation-item").parent();
			var value = [];
			var $date = $relation_item.find(".lately-date .select-label");
			var startDate = $date.attr("startDate");
			var endDate = $date.attr("endDate");
			if (startDate && endDate) {
				value.push(startDate);
				value.push(endDate);
			} else {
				value.push(startDate);
			}
			return value;
		},
		_buildTagNodeConditionItem : function($group_combo, pos, db) {
			var that = this;
			var deviceType = this.model.deviceType;
			var table_type = $group_combo.attr("tableType");
			
			if(!deviceType || !table_type){
				return false;
			}
			var condition = "condition" + pos;
			if (table_type == 'attributeTable') {// 属性
				var $attributes = $group_combo.find(".attributes");
				var $operators = $group_combo.find(".operators");
				var $aggregation_operators = $group_combo.find(".aggregation-operators");
				
				var attribute = $attributes.val();
				var operator = $operators.val();
				var aggregation_operators = $aggregation_operators.val();
				
				var objectType = $attributes.find("option:selected").attr("objectType");
				var objectcode = $attributes.find("option:selected").attr("objectCode");
				
				if(!objectcode || !objectType || !attribute){
					return false;
				}
				
				var value = this._buildInputValue($group_combo);
				var valueType = $operators.find("option:selected").attr("valueType");
				var indice = db.buildIndice("", deviceType, objectType, objectcode);
				var query;
				
				var multivalue = $operators.find("option:selected").attr("multivalue");
				if(multivalue == "true"){
					query = db.buildMustQueryWithQualifier(db.buildTermQualifier(attribute, db._buildOperatorValue(operator, value)));
				} else {
					if(valueType == "Time"){
						if(operator == 'range'){
							var qualifiers = [];
							var timeRangeValue = that._buildBehaviorTimeValue($group_combo);
							var startTime, endTime;
							
							if(timeRangeValue.length == 1){
								startTime = "date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'), " + (parseInt(timeRangeValue[0]) ) + ")";
								endTime = "date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'), 1)";
							} else {
								startTime = timeRangeValue[0];
								endTime = timeRangeValue[1];
							}
							qualifiers.push(db.buildRangeQualifier(attribute, db.buildRangeOperatorValue("gte", startTime, "lte", endTime)));
							query = db.buildMustQueryWithQualifiers(qualifiers);
							//query = db.buildMustQueryWithQualifier(db.buildRangeQualifier(attribute, db.buildRangeOperatorValue("gte", value[0], "lte", value[1])));
						}else{
							query = db.buildMustQueryWithQualifier(db.buildTermQualifier(attribute, db._buildOperatorValue(operator, value.length == 1 ? value[0] : value)));
						}
					} else {
						query = db.buildMustQueryWithQualifier(db.buildTermQualifier(attribute, db._buildOperatorValue(operator, value)));
					}
				}
				
				db.setIndice(condition, indice);
				db.setQuery(condition, query);

			} else if (table_type == 'behaviorTable') {// 行为
				var $behavior_events = $group_combo.find(".behavior-events");
				var objectcode = $behavior_events.val();
				var objectType = $behavior_events.find("option:selected").attr("objectType");
				
				if(!objectcode || !objectType){
					return false;
				}
				
				var indice = db.buildIndice("", deviceType, objectType, objectcode);
				db.setIndice(condition, indice);				
				
				var qualifiers = [];
				var timeRangeValue = that._buildBehaviorTimeValue($group_combo);
				var logTime = TagBuilder.getLogTime(deviceType, objectcode);
				var startTime, endTime;
				
				if(timeRangeValue.length == 1){
					startTime = "date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'), " + (parseInt(timeRangeValue[0]) ) + ")";
					endTime = "date_sub(from_unixtime(unix_timestamp(), 'yyyy-MM-dd'), 1)";
				} else {
					startTime = timeRangeValue[0];
					endTime = timeRangeValue[1];
				}
				qualifiers.push(db.buildRangeQualifier(logTime, db.buildRangeOperatorValue("gte", startTime, "lte", endTime)));
				
				var $behavior_types = $group_combo.find(".behavior-types");
				var $times_operators = $group_combo.find(".times-operators");
				var $times_input = $group_combo.find(".times-input");
				var behavior_type = $behavior_types.val();
				var times_operators = $times_operators.val();
				var times_input = $times_input.val();
				
				var $behavior_attributes_ul = $group_combo.find(".behavior-attributes > ul");
				var aggregation_info = {
					name : '',
					attribute : '',
					operator : '',
					value : ''
				};
				
				var aggregation_name = '';
				
				$behavior_attributes_ul.children("li").each(function(index){
					var $li = $(this);
					var $attributes = $li.find(".attributes");
					var $operators = $li.find(".operators");
					var $aggregation_operators = $li.find(".aggregation-operators");
					
					var attribute = $attributes.val();
					var operator = $operators.val();
					var aggregation_operators = $aggregation_operators.val();
					
					if(aggregation_operators == 'sum'){
						aggregation_name = 'totalSum';
					}else if(aggregation_operators == 'max'){
						aggregation_name = 'totalMax';
					}else if(aggregation_operators == 'min'){
						aggregation_name = 'totalMin';
					}else if(aggregation_operators == 'avg'){
						aggregation_name = 'totalAvg';
					}
					
					var value = that._buildInputValue($li);
					
					if(aggregation_name){
						aggregation_info.name = aggregation_name;
						aggregation_info.attribute = attribute;
						aggregation_info.operator = operator;
						aggregation_info.value = value;						
					}
					if(attribute && operator && value){
						var valueType = $operators.find("option:selected").attr("valueType");
						//qualifiers.push(db.buildTermQualifier(attribute, db.buildEqOperatorValue(value)));
						qualifiers.push(db.buildTermQualifier(attribute, db._buildOperatorValue(operator, value)));
					}
					
					
				});
				
				if(behavior_type == 'happened'){					
					var query = db.buildMustQueryWithQualifiers(qualifiers);
					if(times_operators && times_input){
						var attributeName = that._getTotalCountAttribute(objectType,objectcode);
						db.setQuery(condition, db.buildMustQueryWithQualifier(db.buildTermQualifier("totalCount", db._buildOperatorValue(times_operators, times_input))));
						db.setSubQuery(condition, db.buildSubQueryWithQuery(query, "totalCount", db.buildCountAggregation(attributeName)));
					} else if(aggregation_name){
						var attributeName = aggregation_info.attribute;
						db.setQuery(condition, db.buildMustQueryWithQualifier(db.buildTermQualifier(aggregation_info.name, db._buildOperatorValue(aggregation_info.operator, aggregation_info.value))));
						db.setSubQuery(condition, db.buildSubQueryWithQuery(query, aggregation_info.name, db.buildCountAggregation(attributeName)));
					} else{
						db.setQuery(condition, query);
					}
				} else {
					var query = db.buildMustQueryWithQualifiers(qualifiers);
					db.setQuery(condition, query);
				}				
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
		_checkInputRequiredIsCorrect : function() {
			var that = this;
			var respone = {
				success : true,
				msg : ''
			};
			$(".input-required").each(function(){
				var $inputRequired = $(this);
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
								msg : '请输入值'
							};
						}else if($inputRequired.hasClass("form-date")){
							respone = {
								success : false,
								msg : '请选择日期'
							};
						}
						return false;
					}else{
						if($inputRequired.hasClass("times-input")){
							if(!$.checkNumberIsInteger(curInputValue)){
								respone = {
									success : false,
									msg : '发生行为的次数只能是正整数'
								};
								$inputRequired.addClass("input-error");
								return false;
							}else if(curInputValue == 0){
								respone = {
									success : false,
									msg : '发生行为的次数必须大于0次'
								};
								$inputRequired.addClass("input-error");
								return false;
							}
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
		_buildAttributeTableAttributes:function(attributeTables){
			var attributeTableAttributes = [];
			if(attributeTables && attributeTables.length > 0){
				var deviceType = this.model.deviceType;
				var group = TagBuilder.findByAttributeGroupTypeAndCode(deviceType,"user_profile","search_visible");
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
	window.dmpapp.CrowdDefinitionController = prototype;

	var func = new Function();
	func.prototype = prototype;
	return func;
});
