define(function (require, module, exports) {
    return "{{each renderData as value}}<ul><li>{{value.orderNum}}</li><li title=\"{{value.accountName}}\"><a href=\"#/accountdetail/{{value.accountId}}/{{value.appList[0].appKey}}\">{{value.accountName}}</a></li><li title=\"{{value.contacts}}\">{{value.contacts}}</li><li title=\"{{value.compName}}\">{{value.compName}}</li><li>{{value.tel}}</li><li>{{value.createDate | timeStamp}}</li><li>{{value.serviceNum}}&nbsp;<a href=\"#/accountdetail/{{value.accountId}}/{{value.appList[0].appKey}}\">详细</a></li></ul>{{/each}}"
})