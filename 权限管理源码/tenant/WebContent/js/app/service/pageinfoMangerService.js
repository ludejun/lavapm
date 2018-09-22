define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('pageinfoMangerService', function (Restangular) {
	var basepagename = Restangular.all('/PageNameServlet');
    return {
	    query : function(params) {
	    	return basepagename.customGETLIST("",params);			
		},
		edit : function(page) {
			return basepagename.post(page,{}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one("/pageinfoMangerService.js", id).get();
		},	
		
		getByParams : function(params) {
			return basepagename.post(params, {}, {'Content-Type' : 'application/json'});
		},
		update : function(params) {
			return basepagename.post(params, {}, {'Content-Type' : 'application/json'});
		},
		remove : function(page) {
			return event.remove();
		},
		setExceptionState : function(params) {
			return basepagename.post(params, {}, {'Content-Type' : 'application/json'});
		}
    };
  });
});

