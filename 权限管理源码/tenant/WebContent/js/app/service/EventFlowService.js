define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('EventFlowService', function (Restangular) {
	var baseEventFlow = Restangular.all('/eventFlow/eventFlows');
    return {
	    query : function(params) {
	    	return baseEventFlow.customGETLIST("",params);			
		},
		create : function(person) {
			baseEventFlow.post(person, {}, {'Content-Type' : 'application/json'});
		},
		getCustomEventFlows : function(person) {
			return Restangular.all('/eventFlow/getCustomEventFlows').post(person, {}, {'Content-Type' : 'application/json'});
		},
		getByProductId : function(id) {
			return Restangular.one("/eventFlow/eventFlows", id).get();
		},	
		getByProductIdAndEventId : function(id) {
			return Restangular.one("/eventFlow/eventFlowList", id).get();
		},	
		getById : function(id) {
			return Restangular.one("/eventFlow/eventFlow", id).get();
		},	
		getByParams : function(params) {
			return baseEventFlow.post(params, {}, {'Content-Type' : 'application/json'});
		},
		update : function(eventFlow) {
			return eventFlow.put();
		},
		remove : function(id) {
			Restangular.one("/eventFlow/eventFlows", id).remove();
//			return eventFlow.remove();
		},
		setExceptionState : function(params) {
			return baseException.post(params, {}, {'Content-Type' : 'application/json'});
		}
    };
  });
});

