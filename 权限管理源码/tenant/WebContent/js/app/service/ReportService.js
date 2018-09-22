define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('ReportService', function (Restangular) {
		var baseEvent = Restangular.all('/ProductManageServlet');
		var baseResource = Restangular.all('/resource/treeList');
		var baseUserResource = Restangular.all('/resource/usetreeList');
		var baseRolelist = Restangular.all('/resource/list');
		var basesaveRolelist = Restangular.all('/resource/save');
		var basedeleteRolelist = Restangular.all('/resource/delete');
		var baseUserlist = Restangular.all('/user/list');
		var baseUserlistByDeptRid = Restangular.all('/user/listUser');
		var baseSaveUserlist = Restangular.all('/user/save');
		var basechangeStatusUserlist = Restangular.all('/user/changeStatus');
		var baseResetPwdUserlist = Restangular.all('/user/resetPwd');
		var baseRoleUserlist = Restangular.all('/user/saveData');
		var getRoleUserList = Restangular.all('/user/getRoleUserList');
		var deleteUserList = Restangular.all('/user/deleteUser');
		var deleteUserRole = Restangular.all('/user/deleteUserRole');
		var treeDepartmentList = Restangular.all('/umDepartment/treeDepartmentList');
		
		var insertDepartmentList = Restangular.all('/umDepartment/insertDepartment');
		var updateDepartmentByPrimaryKeyList = Restangular.all('/umDepartment/updateDepartmentByPrimaryKey');
		var deleteDepartmentList = Restangular.all('/umDepartment/deleteDepartment');
		var editUsersPrimary = Restangular.all('/umDepartment/editUsers');
		
	    return {
		    query : function(params) {
		    	return baseEvent.customGETLIST("",params);			
			},
			edit : function(event) {
				return baseEvent.post(event,{}, {'Content-Type' : 'application/json'});
			},
			getById : function(id) {
				return Restangular.one("/CustomEventDictionaryServlet", id).get();
			},	
			
			getByParams : function(params) {
				return baseEvent.post(params, {}, {'Content-Type' : 'application/json'});
			},
			deleteUser : function(params) {
				return deleteUserList.post(params, {}, {'Content-Type' : 'application/json'});
			},
			editUsers : function(params) {
				return editUsersPrimary.post(params, {}, {'Content-Type' : 'application/json'});
			},
			insertDepartment : function(params) {
				return insertDepartmentList.post(params, {}, {'Content-Type' : 'application/json'});
			},
			updateDepartmentByPrimaryKey : function(params) {
				return updateDepartmentByPrimaryKeyList.post(params, {}, {'Content-Type' : 'application/json'});
			},
			deleteDepartment : function(params) {
				return deleteDepartmentList.post(params, {}, {'Content-Type' : 'application/json'});
			},
			deleteUserRole : function(params) {
				return deleteUserRole.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getRoleUserListByParams : function(params) {
				return getRoleUserList.post(params, {}, {'Content-Type' : 'application/json'});
			},
			treeDepartmentList : function(params) {
				return treeDepartmentList.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getRoleUserByParams : function(params) {
				return baseRoleUserlist.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getResetPwdByParams : function(params) {
				return baseResetPwdUserlist.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getByUserParams : function(params) {
				return baseUserlist.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getByDeptRidUserParams : function(params) {
				return baseUserlistByDeptRid.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getChangeStatusByUserParams : function(params) {
				return basechangeStatusUserlist.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getSaveByUserParams : function(params) {
				return baseSaveUserlist.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getSaveRoleByParams : function(params) {
				return basesaveRolelist.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getSaveDeleByParams : function(params) {
				return basedeleteRolelist.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getRoleByParams : function(params) {
				return baseRolelist.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getResourceByParams : function(params) {
				return baseResource.post(params, {}, {'Content-Type' : 'application/json'});
			},
			getUserResourceByParams : function(params) {
				return baseUserResource.post(params, {}, {'Content-Type' : 'application/json'});
			},
			update : function(params) {
				return baseEvent.post(params, {}, {'Content-Type' : 'application/json'});
			},
			remove : function(event) {
				return event.remove();
			},
			setExceptionState : function(params) {
				return baseEvent.post(params, {}, {'Content-Type' : 'application/json'});
			}
	    };
	  });
});

