define([], function() {
	var TagBuilder = {
		_inited : false,
		model : {},
		init : function(tagMetadata) {
			if (!this._inited) {
				this.model = {
					crowdModel : tagMetadata.crowdModel,
					operatorModel : tagMetadata.operatorModel
				};
				this._inited = true;
			}
		},

		/**
		 * 获取所有的账号类型
		 * 
		 */
		getAccountIdTypes : function() {
			var crowdModel = this.model.crowdModel;
			var accountIdTypes = [];
			if (crowdModel && crowdModel.metaAccountIdTypeMap) {
				var metaAccountIdTypeMap = crowdModel.metaAccountIdTypeMap;
				for ( var p in metaAccountIdTypeMap) {
					var metaAccountIdType = metaAccountIdTypeMap[p];
					accountIdTypes.push({
						id : metaAccountIdType.code,
						label : metaAccountIdType.name,
						majorAccount : metaAccountIdType.majorAccount || false
					});
				}
			}
			return accountIdTypes;
		},

		/**
		 * 根据账户ID类型获取属性表
		 * 
		 */
		getAttributeTables : function(accountIdType) {
			var idIndexMap = {
				'cross_screen_account' : 2,
				'web_browser_attribute' : 4,
				'fpd_account_user' : 1,
				'mobile_attribute' : 3,
				'h5_browser_attribute' : 5
			}
			var crowdModel = this.model.crowdModel;
			var attributeTables = [];
			if (crowdModel && crowdModel.metaAccountMap) {
				var metaAccountMap = crowdModel.metaAccountMap;
				for ( var p in metaAccountMap) {
					var ma = metaAccountMap[p];
					if (ma.accountIdType == accountIdType) {
						attributeTables.push({
							id : ma.objectCode,
							label : ma.objectName,//访问信息
							objectType : 'MetaAccount',
							idx : idIndexMap[ma.objectCode]
						});
						var sacs = ma.metaSACs;
						if (sacs) {
							for ( var i in sacs) {
								var sac = sacs[i];
								if (!this._isOffsetTable(sac)) {
									attributeTables.push({
										id : sac.objectCode,
										label : sac.objectName,
										objectType : 'MetaStaticAttributeCollection',
										idx : idIndexMap[sac.objectCode]
									});
								}
							}
						}
					}
				}
			}
			attributeTables = _.sortBy(attributeTables, 'idx');
			return attributeTables;
		},

		/**
		 * 根据账户ID类型获取行为表
		 * 
		 */
		getBehaviorTables : function(accountIdType) {
			var _this = this;
			var idIndexMap =_this.getBehaviorTableGroup(accountIdType,'tag_visible');
			var crowdModel = _this.model.crowdModel;
			var behaviorTables = [];
			if (crowdModel && crowdModel.metaAccountMap) {
				var metaAccountMap = crowdModel.metaAccountMap;
				for ( var p in metaAccountMap) {
					var ma = metaAccountMap[p];
					if (ma.accountIdType == accountIdType) {
						var behaviors = ma.metaBehaviors;
						if (behaviors) {
							for ( var i in behaviors) {
								var behavior = behaviors[i];
								behaviorTables.push({
									id : behavior.objectCode,
									label : behavior.objectName,
									objectType : 'MetaBehavior',
									logTime : behavior.logTime,
									objInfo : idIndexMap[behavior.objectCode]									
								});								
							}
						}
					}
				}
			}
			behaviorTables = _.sortBy(behaviorTables, function(item){
				return item && item.objInfo && item.objInfo.groupOrder;
			});
			return behaviorTables;
		},
		
		/**
		 * 根据账户ID类型和组类型，获取行为表分组
		 * 
		 */
		getBehaviorTableGroup: function(accountIdType,tableGroupType) {
			var tableGroup = {};
			var crowdModel = this.model.crowdModel;
			if (accountIdType && tableGroupType && crowdModel && crowdModel.metaBehaviorGroup) {
				var key = accountIdType + "," + tableGroupType ;
				var metaBehaviorGroup = crowdModel.metaBehaviorGroup;
				tableGroup = metaBehaviorGroup[key];
			}
			return tableGroup;
		},
		
		getBehaviorTablesWithSac : function(accountIdType, objectCode) {
			var crowdModel = this.model.crowdModel;
			var behaviorTables = [];
			if (crowdModel && crowdModel.metaAccountMap) {
				var metaAccountMap = crowdModel.metaAccountMap;
				for ( var p in metaAccountMap) {
					var ma = metaAccountMap[p];
					if (ma.accountIdType == accountIdType) {
						var behaviors = ma.metaBehaviors;
						if (behaviors) {
							for ( var i in behaviors) {								
								var behavior = behaviors[i];
								if(objectCode == behavior.objectCode){
									behaviorTables.push({
										id : behavior.objectCode,
										label : behavior.objectName,
										objectType : 'MetaBehavior',
										logTime : behavior.logTime,
										
									});
									
									var sacs = behavior.metaSACs;
									if (sacs && sacs.length > 0) {
										for ( var j=0;j<sacs.length;j++) {
											var sac = sacs[j];
											if (!this._isOffsetTable(sac)) {
												behaviorTables.push({
													id : sac.objectCode,
													label : sac.objectName,
													objectType : 'MetaStaticAttributeCollection'
												});
											}
										}
									}
								}
								
							}
						}
					}
				}
			}
			return behaviorTables;
		},

		/**
		 * 根据账户ID类型获取表类型选择器
		 * 
		 */
		getTableTypeSelector : function(accountIdType) {
			var attributeTables = this.getAttributeTables(accountIdType);
			var behaviorTables = this.getBehaviorTables(accountIdType);

			var selectors = [];
			if (attributeTables.length > 0) {
				selectors.push({
					id : 'attributeTable',
					label : '属性条件'
				});
			}
			if (behaviorTables.length > 0) {
				selectors.push({
					id : 'behaviorTable',
					label : '行为事件条件'
				});
			}
			return selectors;
		},

		/**
		 * 根据对象类型、对象ID获取属性列表
		 * 
		 */
		getAttributes : function(objectType, objectCode, attributeType) {
			var crowdModel = this.model.crowdModel;
			var attributes = [];
			if (crowdModel && crowdModel.metaAccountMap) {
				var metaAccountMap = crowdModel.metaAccountMap;

				if (objectType == 'MetaAccount') {
					for ( var p in metaAccountMap) {
						var ma = metaAccountMap[p];
						if (ma.objectCode == objectCode) {
							attributes = this._buildAttributes(ma.metaAttributes, attributeType);
							break;
						}
					}
				} else if (objectType == 'MetaStaticAttributeCollection') {
					var existed = false;
					for ( var p in metaAccountMap) {
						var ma = metaAccountMap[p];
						var sacs = ma.metaSACs;
						if (sacs) {
							for ( var i in sacs) {
								var sac = sacs[i];
								if (sac.objectCode == objectCode) {
									attributes = this._buildAttributes(sac.metaAttributes, attributeType);
									existed = true;
									break;
								}
							}
						}
						if (existed) {
							break;
						}
					}
				} else if (objectType == 'MetaBehavior') {
					var existed = false;
					for ( var p in metaAccountMap) {
						var ma = metaAccountMap[p];
						var behaviors = ma.metaBehaviors;
						if (behaviors) {
							for ( var i in behaviors) {
								var behavior = behaviors[i];
								if (behavior.objectCode == objectCode) {
									attributes = this._buildAttributes(behavior.metaAttributes, attributeType);
									existed = true;
									break;
								}
							}
						}
						if (existed) {
							break;
						}
					}
				}
			}

			return attributes;
		},

		getLogTime : function(accountIdType, behaviorCode) {
			var behaviors = this.getBehaviorTables(accountIdType);
			for (var i = 0; i < behaviors.length; i++) {
				if (behaviorCode == behaviors[i].id && behaviors[i].logTime) {
					return behaviors[i].logTime.attributeCode;
				}
			}
			return null;
		},

		/**
		 * 根据是否可枚举 值类型获取操作符
		 * 
		 */
		getOperators : function(enumerable, valueType) {
			valueType = this._buildValueType(valueType);
			var operatorModel = this.model.operatorModel;
			var ep = enumerable ? 'enumerable' : 'non_enumerable';
			return operatorModel[ep]['operatorMap'][valueType];
		},
		
		getAttributeGroupMap : function(){
			return this.model.crowdModel.metaAttributeGroupMap;
		},
		
		findByAttributeGroupsType : function(/*String*/ accountIdType, /*String*/ attributeGroupType){
			var groupMap = this.getAttributeGroupMap();
			var groups = [];
			for(var p in groupMap){
				var group = groupMap[p];
				if(group.accountIdType == accountIdType && group.attributeGroupType == attributeGroupType){
					groups.push(group);
				}
			}
			return groups;
		},
		
		findByAttributeGroupTypeAndCode : function(/*String*/ accountIdType, /*String*/ attributeGroupType, /*String*/ attributeGroupCode){
			var key = accountIdType + "," + attributeGroupType + "," + attributeGroupCode;
			var groupMap = this.getAttributeGroupMap();
			return groupMap[key];
		},
		
		getAttributesWithObject : function(/*MetaAttributeGroup*/ attributeGroup){
			var metaAttributes = [];
			if(attributeGroup && attributeGroup.metaAttributeGroupRelationships){
				var metaAttributeGroupRelationships = attributeGroup.metaAttributeGroupRelationships;
				for(var i=0; i<metaAttributeGroupRelationships.length; i++){
					var attribute = metaAttributeGroupRelationships[i].metaAttribute;		
					if(attribute){
						metaAttributes.push({
							id : attribute.attributeCode,
							attributeId:attribute.attributeId,
							attributeCode:attribute.attributeCode,
							label : attribute.attributeName,
							enumerable : attribute.metaAttributeType.enumerable,
							valueType : this._buildValueType(attribute.metaAttributeType.type),
							metaAttributeViewType:attribute.metaAttributeViewType,
							objectType : metaAttributeGroupRelationships[i].objectType,
							objectCode : metaAttributeGroupRelationships[i].objectCode,
							attributeGroupCode:attributeGroup.attributeGroupCode
						});
					}
				}
			}
			return metaAttributes;
		},
		
		getAttributesByObject : function(/*MetaAttributeGroup*/ attributeGroup, /*String*/ objectCode){
			var mas = this.getAttributesWithObject(attributeGroup);
			var metaAttributes = [];
			for(var i=0; i<mas.length; i++){
				if(mas[i].objectCode == objectCode){
					metaAttributes.push(mas[i]);
				}
			}
			return metaAttributes;
		},

		_buildValueType : function(valueType) {
			var valueTypeUpper = "";
			if(valueType){
				valueTypeUpper = valueType.toUpperCase();
			}
			if (valueTypeUpper == 'INT' || valueTypeUpper == 'DOUBLE' || valueTypeUpper == 'LONG' || valueTypeUpper == 'BIGINT') {
				valueType = 'Number';
			} else if (valueTypeUpper == 'TIMESTAMP') {
				valueType = 'Time';
			} else if (valueTypeUpper == 'BOOLEAN' || valueTypeUpper == 'STRING') {
				valueType = 'String';
			}else if(valueTypeUpper == 'MAP'){
				valueType = 'Map';
			}else if(valueTypeUpper == 'ARRAY'){
				valueType = 'Array';
			}
			return valueType;
		},

		/**
		 * 重新生成ui需要的属性值
		 * 
		 */
		_buildAttributes : function(attributes, attributeType) {
			var _attrubites = [];
			for (i in attributes) {
				var attribute = attributes[i];
				if (attributeType == 'tagUsed') {
					if (attribute.metaAttributeType.tagUsed) {
						_attrubites.push({
							id : attribute.attributeCode,
							label : attribute.attributeName,
							enumerable : attribute.metaAttributeType.enumerable,
							valueType : this._buildValueType(attribute.metaAttributeType.type)
						});
					}
				} else if (attributeType == 'exportUsed') {
					if (attribute.metaAttributeType.exportUsed) {
						_attrubites.push({
							id : attribute.attributeCode,
							label : attribute.attributeName,
							enumerable : attribute.metaAttributeType.enumerable,
							valueType : this._buildValueType(attribute.metaAttributeType.type)
						});
					}
				} else if (attributeType == 'accountId') {
					if (attribute.metaAttributeType.accountId) {
						_attrubites.push({
							id : attribute.attributeCode,
							label : attribute.attributeName,
							enumerable : attribute.metaAttributeType.enumerable,
							valueType : this._buildValueType(attribute.metaAttributeType.type)
						});
					}
				} else {
					_attrubites.push({
						id : attribute.attributeCode,
						label : attribute.attributeName,
						enumerable : attribute.metaAttributeType.enumerable,
						valueType : this._buildValueType(attribute.metaAttributeType.type)
					});
				}

			}
			return _attrubites;
		},

		_isOffsetTable : function(table) {
			var attributes = table.metaAttributes;
			for (var i = 0; i < attributes.length; i++) {
				if (attributes[i].metaAttributeType.offsetId) {
					return true;
				}
			}
			return false;
		},
		
		
	};

	return TagBuilder;
});
