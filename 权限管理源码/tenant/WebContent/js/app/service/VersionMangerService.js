define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('VersionMangerService', function (Restangular) {
	var baseVersion = Restangular.all('/VersionServlet');
	var baseUpdateVersion = Restangular.all('/UpdateHideVersionServlet');
    return {
	    query : function(params) {
	    	return baseVersion.customGETLIST("",params);			
		},
		edit : function(version) {
			return baseVersion.post(version,{}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one("/TenddataversionServlet", productId).get();
		},	
		
		getByParams : function(params) {
			return baseVersion.post(params, {}, {'Content-Type' : 'application/json'});
		},
		update : function(version) {
			return baseUpdateVersion.post(version,{}, {'Content-Type' : 'application/json'});
		},
		remove : function(version) {
			return baseVersion.post(version, {}, {'Content-Type' : 'application/json'});
		},
		setExceptionState : function(params) {
			return baseVersion.post(params, {}, {'Content-Type' : 'application/json'});
		}
    };
  });
});

