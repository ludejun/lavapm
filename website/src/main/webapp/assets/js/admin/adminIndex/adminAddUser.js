define(function (require, exports, module) {
    // var CommonData = {};
    // var tpl = require( "../../tpl/AccountList" );
    // var adminAddusers = require("./adminAddUser");
    var adminAdduser = require('../../tpl/adminAdduser');
    // var confirmAdminAddUser = require('./confirmForm');
    var Util = {

        init: function () {
            var self = this;

            // self.confirmAdminAddUser();
            $(document).ready(function () {

                $('body').off('click').on('click', "#addUserConfirm", function () {
                    var data2 = $('#adminAddUserContainer').serialize();
                    console.log(data2);
                    var token = "token=" + window.TD.token + "&" + "from=" + window.TD.vFrom + "&";
                    // console.log(token);
                    var data3 = token + data2.toString();
                    console.log(data3);
                    // if(){
                    //
                    // }else{
                        $.ajax({
                            type: "GET",
                            url: window.TD.vHosts + '/admin/regist',
                            data: data3,// 要提交的表单数据
                            success: function (msg) {
                                console.log(msg);
                                if(msg.status == 200){
                                    // alert("添加账户成功");
                                    $('#appAlert').show();
                                    $('#appAlertContent').html("添加账户成功");
                                    var timer = setTimeout(function(){
                                        $('#appAlert').hide();
                                    },3000)
                                    $('#adminAddUserContainer2').remove();//关闭弹层
                                    window.location.reload();
                                }

                                return false;
                            },
                            error: function (error) {
                                console.log(error);
                            }
                        });
                    // }


                });
            });

            $("body").on('click', "#addUserCancel", function () {
                // console.log(1);
                $('#adminAddUserContainer2').remove();//关闭弹层
                console.log(1);
                return false;
            });

        }
    };
    module.exports = Util;
});