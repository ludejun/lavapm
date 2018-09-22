define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('ChannelMangerService', function (Restangular) {
	var baseChannel = Restangular.all('/PartnerServlet');
    return {
	    query : function(params) {
	    	return baseChannel.customGETLIST("",params);			
		},
		edit : function(event) {
			return baseChannel.post(event,{}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one("/PartnerServlet", id).get();
		},	
		
		getByParams : function(params) {
			return baseChannel.post(params, {}, {'Content-Type' : 'application/json'});
		},
		update : function(params) {
			return baseChannel.post(params, {}, {'Content-Type' : 'application/json'});
		},
		remove : function(params) {
			return params.remove();
		},
		setExceptionState : function(params) {
			return baseChannel.post(params, {}, {'Content-Type' : 'application/json'});
		}
    };
  });
});

