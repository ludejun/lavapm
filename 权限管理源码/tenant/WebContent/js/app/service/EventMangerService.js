define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('EventMangerService', function (Restangular) {
	var baseEvent = Restangular.all('/ProductManageServlet');
	var baseResource = Restangular.all('/resource/treeList');
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
		getResourceByParams : function(params) {
			return baseResource.post(params, {}, {'Content-Type' : 'application/json'});
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

