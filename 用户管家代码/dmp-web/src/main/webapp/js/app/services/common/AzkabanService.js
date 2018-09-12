define([ 'app', 'ngload!restangular', 'app/services/common/CommonService' ],
function(app) {
	'use strict';
	app.factory('AzkabanService', ['Restangular', 'CommonService', function(Restangular, CommonService) {
		return {
			getAzkabanRecordsByExecId : function(execId){
				return Restangular.one('/admin/execFlow', execId).get();
			}

		};
	}]);
});
