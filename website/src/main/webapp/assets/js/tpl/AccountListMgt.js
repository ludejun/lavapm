define(function(require,module,exports){return "{{each renderData as value}}<ul><li>{{value.orderNum}}</li><li><a href=\"javascript:void(0)\" class='accountUserName'>{{value.accountName}}</a></li><li>{{value.contacts}}</li><li>{{value.compName}}</li><li>{{value.tel}}</li><li>{{value.createDate | timeStamp}}</li><li>--</li><li><a href=\"javascript:void(0)\" class='adminAddUserEdit'>编辑</a></li></ul>{{/each}}"})