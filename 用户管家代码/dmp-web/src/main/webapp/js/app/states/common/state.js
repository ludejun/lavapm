define(['app/states/tag/TagState',
        'app/states/tag/BusinessTagState',
        'app/states/tag/TagCategoryState',
        'app/states/tag/SystemTagState',
        'app/states/crowd/CrowdState',
        'app/states/crowd/LookalikeCrowdState',
        'app/states/crowd/PotentialCrowdState',
        'app/states/admin/ScriptCalcRecordState',
        'app/states/user/UserProfilesState',
        
        "app/states/monitor/SchedulerTaskState",
        "app/states/monitor/SchedulerTaskLogState",
        "app/states/monitor/CalcObjectLogState",
        "app/states/common/ExternPagesState"
        ], function (TagState) {
  'use strict';
  var state = [];
  for(var i=0;i<arguments.length;i++) {
	  state = state.concat(arguments[i]);
  }
  return state;
});

