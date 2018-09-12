
define(function(require,exports,module){
    var Util = {
        init:function(){
            var inpEmail = $("#adminAddUserIp1");
            var inpMobile = $("#adminAddUserIp4");
            var inpQQ = $("#adminAddUserIp5");

            //QQ 规律 4,10位 数字 不能以0开头的数字
            //
            var regQQ = /^[1-9]\d{3,9}$/;
            //手机号的规律 11位
            //号段 13[0-9] 14[57] 15[0-9] 17[078] 18[0-9]
            //var regMobile = /^\d{11}$/;
            var regMobile = /^(13[0-9]|14[57]|15[0-9]|17[078]|18[0-9])\d{8}$/;
            //邮箱 duan@aa.com
            //barack.hussin-obama@white-house.gov.us.aa.vbbb
            //^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
            //barack@aa.com
            var regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            check(inpQQ, regQQ);
            check(inpMobile, regMobile);
            check(inpEmail, regEmail);



            function check(inp, regEx) {
                inp.onblur = function () {
                    if (regEx.test(this.value)) {
                        this.nextSibling.innerHTML = "输入正确";
                        this.nextSibling.className = "right";
                    } else {
                        this.nextSibling.innerHTML = "输入错误";
                        this.nextSibling.className = "wrong";
                    }
                }
            }
        }
    }
    module.exports = Util;
})