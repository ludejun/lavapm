define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('MilePostService', function (Restangular) {
	var baseMilePost = Restangular.all('/TenddataMilePostServlet');
    return {
	    query : function(params) {
	    	return baseMilePost.customGETLIST("",params);			
		},
		edit : function(milePost) {
			return baseMilePost.post(milePost,{}, {'Content-Type' : 'application/json'});
		},
		getById : function(id) {
			return Restangular.one("/TenddataMilePostServlet", productId).get();
		},	
		
		getByParams : function(params) {
			return baseMilePost.post(params, {}, {'Content-Type' : 'application/json'});
		},
		update : function(milePost) {
			return milePost.put();
		},
		remove : function(milePost) {
			return baseMilePost.post(milePost, {}, {'Content-Type' : 'application/json'});
		},
		setExceptionState : function(params) {
			return baseMilePost.post(params, {}, {'Content-Type' : 'application/json'});
		}
    };
  });
});

