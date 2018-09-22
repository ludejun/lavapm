define(['app/states/native/nativeState'
        ], function (TagState) {
  'use strict';
  var state = [];
  for(var i=0;i<arguments.length;i++) {
	  state = state.concat(arguments[i]);
  }
  return state;
});

