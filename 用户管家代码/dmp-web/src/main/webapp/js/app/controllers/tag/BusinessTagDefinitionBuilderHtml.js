define([], function() {
	return BusinessTagDefinitionBuilderHtml = {
		initRelationPanel:function(){
			var html = '<div class="clrfix relations-panel" id="relations-panel">';
			html += this.createRelationItem('businessTag');
			//html += this.createRelationItem('behaviorTable');
			html += '</div>';
			return html;
		},
		createRelationItemHead:function(tableType,conditionName){
			var html = '<div class="tag-define-panel-head clrfix">';
			if(tableType == 'businessTag'){
				html += '<h2>选择标签</h2>';
			}
			html += '</div>';
			return html;
		},
		createRelationItem:function(tableType){
			var html = '<div class="relation-item relation-item-'+tableType+'">';
			html += this.createRelationItemHead(tableType);
			html += this._createRalationLogic();
			html += this._createRelationBox(tableType);
			html += '</div>';
			return html;
		},
		createAddRelationBtn:function(){
			var html = '<div class="clrfix add-relation hide">';
			html += '<span class="btn-add-relation" onclick="dmpapp.BusinessTagDefinitionController.createRelationHtml($(this));">';
			html += '<i class="tag-definition-icons tag-definition-icons-add"></i>添加标签组</span>';
			html += '</div>';
			return html;
		},
		_createRalationLogic:function(){
			var html = '<div class="ralation-logic">';
			html += '<div class="logic and" onclick="dmpapp.BusinessTagDefinitionController.toggleRelationLogic($(this));">并且</div>';
			html += '</div>';
			return html;
		},
		createRelationWelcome:function(tableType){
			var html = '<div class="welcome-box">';
			if(tableType == 'businessTag'){
				html += '<div class="welcome-text">';
				html += '<p>创建业务标签，根据基础标签或者业务标签来定义人群。</p>';
				html += '</div>';
				html += '<div class="welcome-btn">';
				html += '<span tableType="'+tableType+'" onclick="dmpapp.BusinessTagDefinitionController.createCrowdAttributesBehaviors($(this));">创建业务标签</span>';
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
			html += '<div class="logic '+groupLogic+'" onclick="dmpapp.BusinessTagDefinitionController.toggleGroupLogic($(this));">';
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
			html += '<div class="label-name">标签</div>';
			html += '</div>';
			return html;
		},
		
		_getObjectById :function(id,list){
			var obj = {};
			if(id && list && list.length > 0){
				for(var i = 0;i < list.length;i++){
					if(id == list[i].id){
						obj = list[i];
						break;
					}
				}
			}
			return obj
		},
		
		_createBusinessTagTableAttributes:function(list,definitionParams){
			var that = this;
			var val = '';
			var object = null;
			if(definitionParams && definitionParams.operatorValue && definitionParams.operatorValue.eq){
				val = definitionParams.operatorValue.eq;
				object = that._getObjectById(val,list);
			}

			var html = "";
			if (list && list.length > 0) {
				if(object && object.id){
					html += '<select val="'+object.id+'" code="'+object.code+'" txt="'+object.name+'" class="form-control form-item form-select input-required select-tag">';
				}else{
					html += '<select class="form-control form-item form-select input-required select-tag">';
				}
				
				html += '<option value="">请选择一个标签</option>';
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					if(item.id == val){
						html += '<option value="' + item.id + '" selected>' + item.name + '</option>';
					}else{
						html += '<option value="' + item.id + '">' + item.name + '</option>';
					}
				}
				html += '</select>';
				
			}
			return html;
		},
		_getBusinessTagTypeByDefinition:function(definitionParams){
			var type = "TB";
			if(definitionParams && definitionParams.indice && definitionParams.indice.objectCode){
				var objectCode = definitionParams.indice.objectCode;
				if(objectCode && objectCode.indexOf('TC') != -1){
					type = "TC";
				}
			}
			return type;
		},
		_createBusinessTagType:function(definitionParams){
			var type = this._getBusinessTagTypeByDefinition(definitionParams);
			
			var html = "";
			var list = [{
				id:'TB',
				name:'基础标签'
			},{
				id:'TC',
				name:'业务标签'
			}];
			html += '<select onchange="dmpapp.BusinessTagDefinitionController.changeBusinessTagType($(this));" class="form-control form-item form-select input-required select-tag-type">';
			if(list && list.length > 0){
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					if(type && item.id == type){
						html += '<option value="' + item.id + '" selected>' + item.name + '</option>';
					}else{
						html += '<option value="' + item.id + '">' + item.name + '</option>';
					}
				}
			}
			html += '</select>';
			return html;
		},
		_createBusinessTagGroups:function(list,definitionParams){
			var html = "";
			html += this._createBusinessTagType(definitionParams);
			html += this._createBusinessTagTableAttributes(list,definitionParams);
			return html;
		},
		
		_createGroups:function(tableType,attributeTableAttributes,attributeCode,conditionName,definitionParams,dp,attributeTables,hasNotFilter){
			var html = '<div class="groups clrfix">';
			if(tableType == 'businessTag'){
				html += this._createBusinessTagGroups(attributeTableAttributes,definitionParams);
			}
			html += '</div>';
			return html;
		},
		_createGroupBox:function(tableType,attributeTableAttributes,attributeCode,conditionName,definitionParams,dp,attributeTables,hasNotFilter){
			var html = '<div class="group-box">';
			html += '<i class="group-close" onclick="dmpapp.BusinessTagDefinitionController.removeGroupCombo($(this));"></i>';
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
			html += '<span class="btn-add-group-combo" tableType="'+tableType+'" onclick="dmpapp.BusinessTagDefinitionController.addGroupComboHtml($(this));">';
			if(tableType == 'businessTag'){
				html += '<i class="tag-definition-icons tag-definition-icons-add"></i>添加标签';	
			}
			
			html += '</span>';
			html += '</div>';
			return html;
		}
	};
});
