define(['app','ngload!restangular'], function (app,Restangular) {
  'use strict';
  app.factory('UserHabitService', function (Restangular) {
	var baseUserHabit = Restangular.all('/userHabit/userHabits');
	var updateUserHabit = Restangular.all('/userHabit/userHabits/update');
	var deleteUserHabit = Restangular.all('/userHabit/userHabits/delete');
    return {
		create : function(person) {
			return baseUserHabit.post(person, {}, {'Content-Type' : 'application/json'});
		},
		getById : function(productId_platcategory) {
			return Restangular.one("/userHabit/userHabits", productId_platcategory).get();
		},	
		
		update : function(userHabit) {
			return updateUserHabit.post(userHabit, {}, {'Content-Type' : 'application/json'});
		},
		remove : function(userHabit) {
			return deleteUserHabit.post(userHabit, {}, {'Content-Type' : 'application/json'});
		}
    };
  });
});

