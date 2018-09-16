define([], function() {
	return CrowdDefinitionBuilderHtml = {
		initRelationPanel:function(){
			var html = '<div class="clrfix relations-panel" id="relations-panel">';
			html += this.createRelationItem('attributeTable');
			//html += this.createRelationItem('behaviorTable');
			html += '</div>';
			return html;
		},
		createRelationItemHead:function(tableType,conditionName,definitionParams,dp){
			var html = '<div class="tag-define-panel-head clrfix">';
			if(tableType == 'attributeTable'){
				html += '<h2>人群属性</h2>';
			}else if(tableType == 'behaviorTable'){
				html += '<h2>人群行为</h2>';
				html += this._createBehaviorLatelyDate(conditionName,definitionParams,dp);
			}
			html += '</div>';
			return html;
		},
		createRelationItem:function(tableType){
			var html = '<div class="relation-item relation-item-'+tableType+'">';
			//html += this.createRelationItemHead(tableType);
			html += this._createRalationLogic();
			html += this._createRelationBox(tableType);
			html += '</div>';
			return html;
		},
		createAddRelationBtn:function(){
			var html = '<div class="clrfix add-relation hide">';
			html += '<span class="btn-add-relation" onclick="dmpapp.CrowdDefinitionController.createRelationHtml($(this));">';
			html += '<i class="tag-definition-icons tag-definition-icons-add"></i>添加行为块</span>';
			html += '</div>';
			return html;
		},
		_createRalationLogic:function(){
			var html = '<div class="ralation-logic">';
			html += '<div class="logic and" onclick="dmpapp.CrowdDefinitionController.toggleRelationLogic($(this));">并且</div>';
			html += '</div>';
			return html;
		},
		createRelationWelcome:function(tableType){
			var html = '<div class="welcome-box">';
			if(tableType == 'attributeTable'){
				html += '<div class="welcome-text">';
				html += '<p>通过创建用户属性条件来搜索用户。</p>';
				html += '</div>';
				html += '<div class="welcome-btn">';
				html += '<span tableType="'+tableType+'" onclick="dmpapp.CrowdDefinitionController.createCrowdAttributesBehaviors($(this));">创建搜索条件</span>';
				html += '</div>';
			}else if(tableType == 'behaviorTable'){
				html += '<div class="welcome-text">';
				html += '<p>创建人群行为条件，根据用户行为习惯来实现目标。</p>';
				html += '</div>';
				html += '<div class="welcome-btn">';
				html += '<span tableType="'+tableType+'" onclick="dmpapp.CrowdDefinitionController.createCrowdAttributesBehaviors($(this));">创建人群行为</span>';
				html += '</div>';
			}
			html += "</div>";
			return html;
		},
		_createRelationBox:function(tableType){
			var html = '<div class="ralation-box">';
			html += this.createRelationWelcome(tableType);
			html += '</div>';
			return html;
		},
		_createGroupLogic:function(groupLogic){
			groupLogic = groupLogic || 'or';
			var html = '<div class="group-logic">';
			html += '<div class="logic '+groupLogic+'" onclick="dmpapp.CrowdDefinitionController.toggleGroupLogic($(this));">';
			if(groupLogic == 'and'){
				html += '并且';
			}else if(groupLogic == 'or'){
				html += '或者';
			}
			
			html += '</div>';
			html += '</div>';
			return html;
		},
		_createGroupLabel:function(){
			var html = '<div class="group-label">';
			html += '<div class="label-name">用户</div>';
			html += '</div>';
			return html;
		},
		createDateRangeHtml : function(operator, dates) {
			var html = "";
			html += '<div class="input-daterange fl">';

			if (dates && dates.length > 0) {
				var date_start = "";
				var date_end = "";
				if (dates.length > 1) {
					date_start = dates[0];
					date_end = dates[1];
				} else {
					date_start = dates[0];
				}

				html += '<input onclick="dmpapp.CrowdDefinitionController.showHideCalendar(this);" onchange="dmpapp.CrowdDefinitionController.changeFormDateValue(this);" value="' + date_start + '" type="text" class="form-control form-item form-input form-date date-start input-required" name="start" readonly placeholder="请选择日期"/>';
				if (date_start && date_end) {
					html += '<span class="form-item form-span">至</span>';
					html += '<input onclick="dmpapp.CrowdDefinitionController.showHideCalendar(this);" onchange="dmpapp.CrowdDefinitionController.changeFormDateValue(this);" value="' + date_end + '" type="text" class="form-control form-item form-input form-date date-end input-required" name="end" readonly placeholder="请选择日期"/>';
				} else {
					html += '<span class="form-item form-span hide">至</span>';
					html += '<input onclick="dmpapp.CrowdDefinitionController.showHideCalendar(this);" onchange="dmpapp.CrowdDefinitionController.changeFormDateValue(this);" type="text" class="form-control form-item form-input form-date date-end hide input-required" name="end" readonly placeholder="请选择日期"/>';
				}
			} else {
				html += '<input onclick="dmpapp.CrowdDefinitionController.showHideCalendar(this);" onchange="dmpapp.CrowdDefinitionController.changeFormDateValue(this);" type="text" class="form-control form-item form-input form-date date-start input-required" name="start" readonly placeholder="请选择日期"/>';
				if (operator == 'range') {// 时间范围
					html += '<span class="form-item form-span">至</span>';
					html += '<input onclick="dmpapp.CrowdDefinitionController.showHideCalendar(this);" onchange="dmpapp.CrowdDefinitionController.changeFormDateValue(this);" type="text" class="form-control form-item form-input form-date date-end input-required" name="end" readonly placeholder="请选择日期"/>';
				} else {
					html += '<span class="form-item form-span hide">至</span>';
					html += '<input onclick="dmpapp.CrowdDefinitionController.showHideCalendar(this);" onchange="dmpapp.CrowdDefinitionController.changeFormDateValue(this);" type="text" class="form-control form-item form-input form-date date-end hide input-required" name="end" readonly placeholder="请选择日期"/>';
				}
			}
			html += '<div class="calendar-box start-calendar hide"></div>';
			html += '<div class="calendar-box end-calendar hide"></div>';
			html += '</div>';
			return html;
		},
		createInputHtml : function(value) {
			var html = "";
			html = '<input value="'+value+'" class="input-required form-control form-item input-value" />';
			return html;
		},
		createParamValueSearchHtml : function(values) {
			var html = "";
			var valueStr = "";
			var length = values.length;
			if (values && length > 0) {
				for(var i = 0; i < length;i++){
					if(length-1 == i){
						valueStr += values[i];
					}else{
						valueStr += values[i] + ',';
					}
				}
			}
			html = '<input value="' + valueStr + '" class="input-required input-tagator input-values" style="display: none;" />';
			return html;
		},
		createOperatorsHtml : function(operators, operator) {
			var html = "";
			html += '<select class="form-control form-item form-select operators input-required" onchange="dmpapp.CrowdDefinitionController.changeOperators($(this));">';
			if (operators) {
				for (var i = 0; i < operators.length; i++) {
					if (operator && operators[i].operator == operator) {
							html += '<option multiValue="' + operators[i].multiValue + '" ';
							html += 'valueType="' + operators[i].valueType + '"';
							html += 'value="' + operators[i].operator + '" selected>'
							html += operators[i].operatorName + '</option>';
					} else {
						html += '<option multiValue="' + operators[i].multiValue + '" ';
						html += 'valueType="' + operators[i].valueType + '"';
						html += 'value="' + operators[i].operator + '">'
						html += operators[i].operatorName + '</option>';
					}
				}
			}
			html += '</select>';
			return html;
		},
		createAggregationOperatorsHtml : function(aggregationOperator,behavior_types) {
			var aggregationOperators = dmpapp.CrowdDefinitionController.model.aggregationOperators;
			var html = "";
			if(behavior_types == 'not_happened'){
				html += '<select disabled class="form-control form-item form-select aggregation-operators input-required" onchange="dmpapp.CrowdDefinitionController.changeAggregationOperators($(this));">';
			}else {
				html += '<select class="form-control form-item form-select aggregation-operators input-required" onchange="dmpapp.CrowdDefinitionController.changeAggregationOperators($(this));">';
			}
			
			if (aggregationOperators) {
				for (var i = 0; i < aggregationOperators.length; i++) {
					if (aggregationOperator && aggregationOperators[i].id == aggregationOperator) {
							html += '<option value="' + aggregationOperators[i].id + '" selected>'
							html += aggregationOperators[i].label + '</option>';
					} else {
						html += '<option value="' + aggregationOperators[i].id + '" >'
						html += aggregationOperators[i].label + '</option>';
					}
				}
			}
			html += '</select>';
			return html;
		},
		_createAttributeTableAttributes:function(attributeTableAttributes,tableType,attributeCode,behavior_types,aggregation_name,operator,value,conditionName,definitionParams,dp){
			var html = "";
			operator = operator || '';
			value = value || '';
			
			var objectType = "";
			var objectCode = "";
			if(definitionParams && definitionParams.indice && definitionParams.indice.objectCode && definitionParams.indice.objectType){
				objectType = definitionParams.indice.objectType;
				objectCode = definitionParams.indice.objectCode;
			}
			
			
			if (attributeTableAttributes && attributeTableAttributes.length > 0) {
				html += '<select operator ="'+operator+'" value="'+value+'" class="form-control form-item form-select attributes input-required" onchange="dmpapp.CrowdDefinitionController.changeAttributes($(this));">';
				html += '<option value="">请选择一个属性</option>';
				for (var i = 0; i < attributeTableAttributes.length; i++) {
					var attributeTable = attributeTableAttributes[i];
					
					if(behavior_types == 'happened' && tableType == 'behaviorTable' && i == 0){
						html += '<optgroup label="行为频率">';
						if(aggregation_name == 'totalCount'){
							html += '<option valueType="Number" enumerable="false" objectType="'+attributeTable.objectType+'" objectCode="'+attributeTable.id+'" value="totalCount" selected>行为次数</option>';
						}else{
							html += '<option valueType="Number" enumerable="false" objectType="'+attributeTable.objectType+'" objectCode="'+attributeTable.id+'" value="totalCount">行为次数</option>';
						}
					 	html += '</optgroup>';
					}
					
					var attributes = attributeTable.attributes;
				    if(attributes && attributes.length > 0){
				    	
				    	if(tableType == 'behaviorTable'){
							html += '<optgroup label="基础属性">';
						}else{
							html += '<optgroup label="'+attributeTable.label+'">';
						}
				    	
				    	for(var j = 0;j < attributes.length;j++){
				    		var enumerable = attributes[j].enumerable;
			    			var valueType = attributes[j].valueType;
				    		if(behavior_types == 'not_happened' && tableType == 'behaviorTable'){
				    			if(!(!enumerable && valueType == 'Number')){
				    				if(attributeCode == attributes[j].id && objectType == attributeTable.objectType && objectCode == attributeTable.id){
						    			html += '<option objectType="'+attributeTable.objectType+'" objectCode="'+attributeTable.id+'" enumerable="' + enumerable + '" valueType="' + valueType + '" value="' + attributes[j].id + '" selected>' + attributes[j].label + '</option>';
						    		}else{
						    			html += '<option objectType="'+attributeTable.objectType+'" objectCode="'+attributeTable.id+'" enumerable="' + enumerable + '" valueType="' + valueType + '" value="' + attributes[j].id + '">' + attributes[j].label + '</option>';
						    		}
				    			}
				    		}else{
				    			if(attributeCode == attributes[j].id && objectType == attributeTable.objectType && objectCode == attributeTable.id){
					    			html += '<option objectType="'+attributeTable.objectType+'" objectCode="'+attributeTable.id+'" enumerable="' + enumerable + '" valueType="' + valueType + '" value="' + attributes[j].id + '" selected>' + attributes[j].label + '</option>';
					    		}else{
					    			html += '<option objectType="'+attributeTable.objectType+'" objectCode="'+attributeTable.id+'" enumerable="' + enumerable + '" valueType="' + valueType + '" value="' + attributes[j].id + '">' + attributes[j].label + '</option>';
					    		}
				    		}
				    	}
				    	
				    	 html += '</optgroup>';
				    	
				    }
				   
				}
				html += '</select>';
			}
			return html;
		},
		_createAttributeGroups:function(attributeTableAttributes,attributeCode,conditionName,definitionParams,dp){
			var html = "";
			html += this._createAttributeTableAttributes(attributeTableAttributes,'attributeTable',attributeCode,'','','','',conditionName,definitionParams,dp);
			return html;
		},
		createAttributeLatelyDate:function(definitionParams){
			var html = '<div class="lately-date-box clrfix">';
			html += '<div class="form-item lately-date">';
			html += '<div class="select-box">';
			
			if(definitionParams && definitionParams.qualifierType == 'range'){
				var operatorValue = definitionParams.operatorValue;
				if(operatorValue && operatorValue.gte && operatorValue.gte.indexOf(',') != -1){
					var start_time = operatorValue.gte.split(',')[2];
					start_time = start_time.split(')')[0];
					var startDate = parseInt(start_time);
					html += '<div class="select-label" startDate="'+startDate+'" endDate="">近'+startDate+'日</div>';
				}else{
					var startDate = operatorValue['gte'];
					var endDate = operatorValue['lte'];
					var dateLabel = startDate + '~' +endDate;
					html += '<div class="select-label" startDate="'+startDate+'" endDate="'+endDate+'">'+dateLabel+'</div>';
				}
			}else{
				html += '<div class="select-label" startDate="7" endDate="">近7日</div>';
			}
			
			html += '<div class="select-sign"></div>';
			html += '</div>';
			
			html += '<div class="calendar-tools hide">';
			html += '<ul>';
			html += '<li onclick="dmpapp.CrowdDefinitionController.fastSelectLatelyDate($(this));" date="3">近3日</li>';
			html += '<li onclick="dmpapp.CrowdDefinitionController.fastSelectLatelyDate($(this));" date="7">近7日</li>';
			html += '<li onclick="dmpapp.CrowdDefinitionController.fastSelectLatelyDate($(this));" date="30">近30日</li>';
			html += '</ul>';
			html += '<div class="lately-input">';
			html += '<span>自定义：近</span><input type="text" onkeyup="dmpapp.CrowdDefinitionController.checkLatelyDate($(this));"/><span>日</span>';
			html += '<span class="lately-button" onclick="dmpapp.CrowdDefinitionController.comfirmSelectLatelyDate($(this));">确定</span>';
			html += '</div>';
			html += '</div>';
			
			html += '<div class="date-box" onclick="dmpapp.CrowdDefinitionController.showTdCalendar($(this));"></div>';
			
			html += '<div class="form-actions hide">';
			html += '<span><font>';
			html += '<a href="javascript:;" onclick="dmpapp.CrowdDefinitionController.hideTdCalendar($(this));" class="cancelFilter Sievecolse r">取消</a>';
			html += '<a href="javascript:;" onclick="dmpapp.CrowdDefinitionController.hideTdCalendar($(this));" class="confirm Sievecolse r">确定</a>';
		    html += '</font></span></div>'; 
			
			html += '</div>';
			html += '</div>';
			return html;
		},
		_createBehaviorLatelyDate:function(conditionName,definitionParams,dp){
			var html = '';
			var attributeCode = ''
			if(conditionName && definitionParams){
				attributeCode = definitionParams.attributeCode;
				html += '<div class="lately-date-box clrfix">';
			}else{
				html += '<div class="lately-date-box clrfix hide">';
			}
			
			html += '<div class="form-item form-span">在</div>';
			html += '<div class="form-item lately-date">';
			html += '<div class="select-box">';
			
			if(dp && definitionParams && (
					attributeCode == 'totalCount' || 
					attributeCode == 'totalSum' || 
					attributeCode == 'totalMax' || 
					attributeCode == 'totalMin' || 
					attributeCode == 'totalAvg' )){
				var query = dp.getQuery(conditionName);
				if(query && query.hasOwnProperty('sub')){
					var subQuery = dp.getSubQuery(conditionName);
					var must = subQuery.getBool().getMust();
					for(var i = 0;i < must.length;i++){
						if(must[i].hasOwnProperty('range')){
							var range = must[i].range;
							var obj = dmpapp.CrowdDefinitionController.getObjectKeyValue(range);
							
							if(obj.value['gte'] && obj.value['gte'].indexOf(',') != -1){
								var start_time = obj.value['gte'].split(',')[2];
								start_time = start_time.split(')')[0];
								var startDate = parseInt(start_time);
								html += '<div class="select-label" startDate="'+startDate+'" endDate="">近'+startDate+'日</div>';
							}else{
								var operatorValue = obj.value;
								var startDate = operatorValue['gte'];
								var endDate = operatorValue['lte'];
								var dateLabel = startDate + '~' +endDate;
								html += '<div class="select-label" startDate="'+startDate+'" endDate="'+endDate+'">'+dateLabel+'</div>';
							}
							
						}
					}
				}
				
			}else if(dp && definitionParams && definitionParams.attributeCode == 'start_time'){
				if(definitionParams.operatorValue){
					var operatorValue = definitionParams.operatorValue;
					var startDate = operatorValue['gte'];
					var endDate = operatorValue['lte'];
					var dateLabel = startDate + '~' +endDate;
					if(startDate && startDate.indexOf(',') != -1){
						var start_time = startDate.split(',')[2];
						start_time = start_time.split(')')[0];
						start_time = parseInt(start_time);
						html += '<div class="select-label" startDate="'+start_time+'" endDate="">近'+start_time+'日</div>';
					}else{
						html += '<div class="select-label" startDate="'+startDate+'" endDate="'+endDate+'">'+dateLabel+'</div>';
					}
				}
				
			}else{
				html += '<div class="select-label" startDate="7" endDate="">近7日</div>';
			}
			
			html += '<div class="select-sign"></div>';
			html += '</div>';
			
			html += '<div class="calendar-tools hide">';
			html += '<ul>';
			html += '<li onclick="dmpapp.CrowdDefinitionController.fastSelectLatelyDate($(this));" date="3">近3日</li>';
			html += '<li onclick="dmpapp.CrowdDefinitionController.fastSelectLatelyDate($(this));" date="7">近7日</li>';
			html += '<li onclick="dmpapp.CrowdDefinitionController.fastSelectLatelyDate($(this));" date="30">近30日</li>';
			html += '</ul>';
			html += '<div class="lately-input">';
			html += '<span>自定义：近</span><input type="text" onkeyup="dmpapp.CrowdDefinitionController.checkLatelyDate($(this));"/><span>日</span>';
			html += '<span class="lately-button" onclick="dmpapp.CrowdDefinitionController.comfirmSelectLatelyDate($(this));">确定</span>';
			html += '</div>';
			html += '</div>';
			
			html += '<div class="date-box" onclick="dmpapp.CrowdDefinitionController.showTdCalendar($(this));"></div>';
			
			html += '<div class="form-actions hide">';
			html += '<span><font>';
			html += '<a href="javascript:;" onclick="dmpapp.CrowdDefinitionController.hideTdCalendar($(this));" class="cancelFilter Sievecolse r">取消</a>';
			html += '<a href="javascript:;" onclick="dmpapp.CrowdDefinitionController.hideTdCalendar($(this));" class="confirm Sievecolse r">确定</a>';
		    html += '</font></span></div>'; 
			
			html += '</div>';
			html += '</div>';
			return html;
		},
		_createBehaviorTypes:function(hasNotFilter){
			var behavior_types = '';
			if(hasNotFilter){
				behavior_types = 'not_happened';
			}
			var html = '<select class="form-control form-item form-select behavior-types input-required" onchange="dmpapp.CrowdDefinitionController.changeBehaviorTypes($(this));">';
			html += '<option value="happened">发生行为</option>'; 
			if(behavior_types == 'not_happened'){
				html += '<option value="not_happened" selected>未发生行为</option>';
			}else{
				html += '<option value="not_happened">未发生行为</option>';
			}
			html += '</select>';
			return html;
		},
		_createBehaviorEvents:function(attributeTables,definitionParams){
			var html = '<select class="form-control form-item form-select behavior-events input-required" onchange="dmpapp.CrowdDefinitionController.changeBehaviorEvents($(this));">';
			
			var objectCode = '';
			if(definitionParams && definitionParams.indice && definitionParams.indice.objectCode){
				objectCode = definitionParams.indice.objectCode;
			}
			
			if(attributeTables && attributeTables.length > 0){
				for (var i = 0; i < attributeTables.length; i++) {
					if(objectCode == attributeTables[i].id){
						html += '<option objectType="' + attributeTables[i].objectType + '" value="' + attributeTables[i].id + '" selected>' + attributeTables[i].label + '</option>';
					}else{
						html += '<option objectType="' + attributeTables[i].objectType + '" value="' + attributeTables[i].id + '">' + attributeTables[i].label + '</option>';
					}
				}
			}
			html += '</select>';
			return html;
		},
		createBehaviorTimesOperators:function(operator){
			var operators = [{
				operator:'eq',
				operatorName : '等于'
			},{
				operator:'gt',
				operatorName : '大于'
			},{
				operator:'lt',
				operatorName : '小于'
			},{
				operator:'gte',
				operatorName : '大于等于'
			},{
				operator:'lte',
				operatorName : '小于等于'
			}];
			var html = "";
			html += '<select class="form-control form-item form-select times-operators input-required" onchange="dmpapp.CrowdDefinitionController.changeTimesOperators($(this));">';
			if (operators) {
				for (var i = 0; i < operators.length; i++) {
					if (operator && operators[i].operator == operator) {
							html += '<option value="' + operators[i].operator + '" selected>'
							html += operators[i].operatorName + '</option>';
					} else {
						html += '<option value="' + operators[i].operator + '">'
						html += operators[i].operatorName + '</option>';
					}
				}
			}
			html += '</select>';
			return html;
		},
		_createBehaviorTimesInput:function(value){
			value = value || '';
			var html = '<input  onkeyup="dmpapp.CrowdDefinitionController.checkBehaviorTimes($(this));" value="'+value+'" class="input-required form-control form-item times-input "/>';
			html += '<div class="form-item form-span times-span">次</div>';
			return html;
		},
		createBehaviorAttributesItem:function(attributeTableAttributes,attributeCode,operator,value,behavior_types,definitionParams,aggregation_name,conditionName,dp){
			var html = '<li class="clrfix">';
			html += '<div class="attributes-form clrfix">';
			if(behavior_types == 'happened' && aggregation_name && aggregation_name == 'totalCount'){//行为次数
				if(definitionParams && definitionParams.attributeCode == 'totalCount'){
					var timesOperator = "";
					var timesValue = "";
					if(definitionParams.operatorValue){
						var obj = dmpapp.CrowdDefinitionController.getObjectKeyValue(definitionParams.operatorValue);
						timesOperator = obj.key;
						timesValue = obj.value;
						html += this._createAttributeTableAttributes(attributeTableAttributes,'behaviorTable',attributeCode,behavior_types,aggregation_name,'','',conditionName,definitionParams,dp);
						html += this.createBehaviorTimesOperators(timesOperator);
						html += this._createBehaviorTimesInput(timesValue);
					}
				}
			}else{
				html += this._createAttributeTableAttributes(attributeTableAttributes,'behaviorTable',attributeCode,behavior_types,aggregation_name,operator,value,conditionName,definitionParams,dp);
				
				/*if(aggregation_name){
					var aggregationOperator = this.getAggregationOperatorByName(aggregation_name);
					html += this.createAggregationOperatorsHtml(aggregationOperator,behavior_types);
				}
				
				if(operator){
					var operators = dmpapp.CrowdDefinitionController.getOperators(attributeTableAttributes,attributeCode);
					html += this.createOperatorsHtml(operators,operator);
				}*/
			}
			
			
			html += '</div>';
			html += '<div class="del-attr" onclick="dmpapp.CrowdDefinitionController.removeBehaviorAttributeHtml($(this));"></div>';
			html += '</li>';
			return html;
		},
		getAggregationOperatorByName:function(aggregation_name){
			var aggregationOperator = "";
			if(aggregation_name == 'totalSum'){
				aggregationOperator = "sum";
			}else if(aggregation_name == 'totalMax'){
				aggregationOperator = "max";
			}else if(aggregation_name == 'totalMin'){
				aggregationOperator = "min";
			}else if(aggregation_name == 'totalAvg'){
				aggregationOperator = "avg";
			}
			return aggregationOperator;
		},
		_createBehaviorAttributes:function(attributeTableAttributes,conditionName,dp,definitionParams,hasNotFilter){
			var html = '<div class="behavior-attributes clrfix">';
			html += '<ul>';
			var aggregation_name = '';
			if(dp && conditionName){
				var query = dp.getQuery(conditionName);
				var bool = query.getBool();
				var behavior_types = '';
				if(hasNotFilter){
					behavior_types = 'not_happened';
				}else{
					behavior_types = 'happened';
				}
				if(query && !query.hasOwnProperty('sub')){
					var qualifiers = dp.getQualifiers(conditionName);
					for(var i = 0;i < qualifiers.length;i++){
						var qualifier = qualifiers[i];
						var qualifierType = qualifier.findQualifierType();
						if(qualifierType == 'term'){
							var attributeCode = qualifier.findQualifierAttributeCode();
							var operatorValue = qualifier.findQualifierOperatorValue();
							var obj = dmpapp.CrowdDefinitionController.getObjectKeyValue(operatorValue);
							var operator = obj.key;
							var value = obj.value;
							html += this.createBehaviorAttributesItem(attributeTableAttributes,attributeCode,operator,value,behavior_types,definitionParams,aggregation_name,conditionName,dp);
						}
					}
				}else if(query && query.hasOwnProperty('sub')){
					var sub = query.sub;
					if(sub.hasOwnProperty('aggs')){
						var aggs = sub.aggs;
						if(aggs && definitionParams && definitionParams.attributeCode){
							aggregation_name = definitionParams.attributeCode;
							if(aggs.hasOwnProperty('totalCount')){//创建行为频率
								html += this.createBehaviorAttributesItem(attributeTableAttributes,attributeCode,operator,value,behavior_types,definitionParams,aggregation_name,conditionName,dp);
							}
						}
					}
					
					var subQuery = dp.getSubQuery(conditionName);
					var must = subQuery.getBool().getMust();
					for(var i=0;i<must.length;i++){
						if(must[i].hasOwnProperty('term')){
							var term = must[i].term;
							var obj = dmpapp.CrowdDefinitionController.getObjectKeyValue(term);
							var attributeCode = obj.key;
							var operatorValue = dmpapp.CrowdDefinitionController.getObjectKeyValue(obj.value);
							var operator = operatorValue.key;
							var value = operatorValue.value;
							html += this.createBehaviorAttributesItem(attributeTableAttributes,attributeCode,operator,value,behavior_types,definitionParams,aggregation_name,conditionName,dp);
						}
					}
				}
				
			}
			
			html += '</ul>';
			html += '<div class="clrfix add-behavior-attribute">';
			html += '<span class="btn-add-behavior-attribute" onclick="dmpapp.CrowdDefinitionController.addBehaviorAttributeHtml($(this));">';
			html += '<i class="tag-definition-icons tag-definition-icons-add"></i>添加属性';
			html += '</span></div>';
			html += '<div class="condition-label form-span hide">满足</div>';
			html += '</div>';
			return html;
		},
		_createBehaviorGroups:function(attributeTableAttributes,conditionName,definitionParams,dp,attributeTables,hasNotFilter){
			var html = "";
			//html += this._createBehaviorLatelyDate(conditionName,definitionParams,dp);
			html += '<div class="behavior-box clrfix">';
			html += this._createBehaviorTypes(hasNotFilter);
			html += this._createBehaviorEvents(attributeTables,definitionParams);
			
			/*if(definitionParams){
				var operator = "";
				var value = "";
				if(definitionParams.attributeCode == 'totalCount'){
					if(definitionParams.operatorValue){
						var obj = dmpapp.CrowdDefinitionController.getObjectKeyValue(definitionParams.operatorValue);
						operator = obj.key;
						value = obj.value;
					}
					html += this.createBehaviorTimesOperators(operator);
					html += this._createBehaviorTimesInput(value);
				}
			}else{
				html += this.createBehaviorTimesOperators();
				html += this._createBehaviorTimesInput();
			}*/
			html += '</div>';
			html += this._createBehaviorAttributes(attributeTableAttributes,conditionName,dp,definitionParams,hasNotFilter);
			return html;
		},
		_createGroups:function(tableType,attributeTableAttributes,attributeCode,conditionName,definitionParams,dp,attributeTables,hasNotFilter){
			var html = '<div class="groups clrfix">';
			if(tableType == 'attributeTable'){
				html += this._createAttributeGroups(attributeTableAttributes,attributeCode,conditionName,definitionParams,dp);
			}else if(tableType == 'behaviorTable'){
				html += this._createBehaviorGroups(attributeTableAttributes,conditionName,definitionParams,dp,attributeTables,hasNotFilter);
			}
			html += '</div>';
			return html;
		},
		_createGroupBox:function(tableType,attributeTableAttributes,attributeCode,conditionName,definitionParams,dp,attributeTables,hasNotFilter){
			var html = '<div class="group-box">';
			html += '<i class="group-close" onclick="dmpapp.CrowdDefinitionController.removeGroupCombo($(this));"></i>';
			html += this._createGroups(tableType,attributeTableAttributes,attributeCode,conditionName,definitionParams,dp,attributeTables,hasNotFilter);
			html += '</div>';
			return html;
		},
		createGroupComboHtml:function(tableType,attributeTableAttributes,groupLogic,attributeCode,conditionName,definitionParams,dp,attributeTables,hasNotFilter){
			conditionName = conditionName || '';
			var html = '';
			if(tableType && attributeTableAttributes && attributeTableAttributes.length > 0){
				var objectType = attributeTableAttributes[0].objectType;
				var objectCode = attributeTableAttributes[0].id;
				html += '<div conditionName = "'+conditionName+'" class="group-combo '+tableType+'" tableType="'+tableType+'"  objectType="'+objectType+'" objectCode="'+objectCode+'">';
				html += this._createGroupLogic(groupLogic);
				html += this._createGroupLabel();
				html += this._createGroupBox(tableType,attributeTableAttributes,attributeCode,conditionName,definitionParams,dp,attributeTables,hasNotFilter);
				html += '</div>';
			}
			return html;
		},
		createAddGroupComboBtn:function(tableType){
			var html = '<div class="clrfix add-group-combo">';
			html += '<span class="btn-add-group-combo" tableType="'+tableType+'" onclick="dmpapp.CrowdDefinitionController.addGroupComboHtml($(this));">';
			if(tableType == 'attributeTable'){
				html += '<i class="tag-definition-icons tag-definition-icons-add"></i>添加属性';	
			}else if(tableType == 'behaviorTable'){
				html += '<i class="tag-definition-icons tag-definition-icons-add"></i>添加行为';	
			}
			
			html += '</span>';
			html += '</div>';
			return html;
		}
	};
});
