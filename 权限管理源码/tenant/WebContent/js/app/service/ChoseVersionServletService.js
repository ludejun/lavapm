define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('ChoseVersionServletService', function (Restangular) {
	  var basePersons = Restangular.all('/report/data');
	var basePersons2 = Restangular.all('/report/data/page/flow');
    return {
	    query : function(params) {
	    	return basePersons.getList(params);			
		},
		create : function(person) {
			basePersons.post(person, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one("/report/data", id).get();
		},		
		getDataByParams : function(params) {
			return basePersons2.post(params, {}, {'Content-Type' : 'application/json'});
		},
		getByParams : function(params) {
			return basePersons.post(params, {}, {'Content-Type' : 'application/json'});
		},
		update : function(person) {
			return person.put();
		},
		remove : function(person) {
			return person.remove();
		}
    };
  });
});

