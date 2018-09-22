define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('ReportDataManagerService', function (Restangular) {
	var baseConnect = Restangular.all('/report/connect');
	var baseQuery = Restangular.all('/report/queryTableData');
    return {
	    query : function(params) {
	    	return baseConnect.customGETLIST("",params);			
		},
		edit : function(version) {
			return baseVersion.post(version,{}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one("/TenddataversionServlet", productId).get();
		},	
		connect: function(params) {
			return baseConnect.post(params,{}, {'Content-Type' : 'application/json'});
		},
		getByParams : function(params) {
			return baseQuery.post(params, {}, {'Content-Type' : 'application/json'});
		},
    };
  });
});

