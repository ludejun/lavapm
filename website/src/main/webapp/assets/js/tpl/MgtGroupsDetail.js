define(function(require,module,exports){return "<div id='mask'></div><div class=\"particular\"><div class=\"particular-head\"><span class=\"particular-title\">标题</span> <i class=\"particular-close\"></i></div><ul class=\"particular-nav\"><li>序号</li><li>用户名</li><li>联系人</li><li>联系电话</li><li>注册时间</li><li>用户分组</li></ul><ul class=\"particular-list\"><li>{{orderNum}}</li><li>{{accountName}}</li><li>{{contacts}}</li><li>{{tel}}</li>{{if created}}<li>{{timeStamp(created)}}</li>{{else}}<li>- -</li>{{/if}}<li>{{groupName}}</li></ul></div>"})