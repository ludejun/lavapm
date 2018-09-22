define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('WarnNoticeService', function (Restangular) {
	var basePost = Restangular.all('/TenddataWarningItemsServlet');
	var baseNotice = Restangular.all('/TenddataWarningNoticeMainServlet');
	var basePartner = Restangular.all('/TenddataChosePartnerServlet');
	var baseEvent = Restangular.all('/TenddataCustomDetailServlet');
	
    return {
	    query : function(params) {
	    	return basePost.customGETLIST("",params);			
		},
		edit : function(params) {
			return basePost.post(params,{}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one("/TenddataWarningItemsServlet", productId).get();
		},	
		
		getByParams : function(params) {
			return basePost.post(params, {}, {'Content-Type' : 'application/json'});
		},
		
		getPartner:function(params){
			return basePartner.post(params, {}, {'Content-Type' : 'application/json'});
		},
		
		getEvent:function(params){
			return baseEvent.post(params, {}, {'Content-Type' : 'application/json'});
		},
		save : function(params){
			return baseNotice.post(params, {}, {'Content-Type' : 'application/json'});
		},
		deleteWarnNotice : function(params) {
			return baseNotice.post(params, {}, {'Content-Type' : 'application/json'});
		},
		update : function(params) {
			return params.put();
		},
		remove : function(params) {
			return basePost.post(params, {}, {'Content-Type' : 'application/json'});
		},
		setExceptionState : function(params) {
			return basePost.post(params, {}, {'Content-Type' : 'application/json'});
		}
    };
  });
});

