
define(function(require,exports,module){
    var CommonData = {};
    var tpl = require("../../tpl/AdminIndexUl");
    var Util = {
        init:function(){
            var self = this;
            var index = 0;
            $('.data-time-list').children('li').bind('click',function(){
                console.log($(this));
                var html = $(this).html();//获取文字信息
                console.log(html);
                switch (html){
                    case '最近一周':
                        pastWeek();
                }

                function pastWeek(){
                    var myDate = new Date();
                    var month = myDate.toLocaleDateString();//获取当前日期
                    console.log(month);

                }

            });
        }
    }
});