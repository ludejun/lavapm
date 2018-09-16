define(function (require, exports, module) {
    var CommonData = {};//从后台获取的数据
    var serverAdd = require("../../tpl/serverAdd2");
    var flag = false;
    var fileDeleteType = 0;
    var Util = {
        init: function (CommonData) {
            var self = this;
            this.getAjax({}).promise().done(function (data) {
                if (data.status === 200) {
                    CommonData = data.data;//从后台获取到的数据
                    console.log(CommonData);
                    // console.log(CommonData.table);
                    self.renderListView(CommonData);

                    self.addLine();//添加一行
                    var address = '/admin/addService';
                    self.upload(address);//上传文件
                    //失去焦点填写南北向参数
                    self.blurAlert();


                    //表单数据未填写时提示
                    self.blurPrompt($("input[name='name']"));
                    self.blurPrompt($("input[name='pricing']"));
                    self.blurPrompt($("input[name='northUrl']"));
                    self.blurPrompt($("input[name='southUrl']"));
                    self.blurPrompt($("input[name='businessNo']"));
                    self.blurPrompt($("textarea[name='summary']"));
                    self.blurPrompt($("textarea[name='description']"));

                    $("select[name='types']").on('change', function () {
                        console.log(19);
                        if ($("select[name='types']").val() == '') {
                            $("select[name='types']").css('border', '1px solid red');
                        } else {
                            $("select[name='types']").css('border', '1px solid #dce1e7');
                        }
                    });
                    $("select[name='owner']").on('change', function () {
                        if ($("select[name='owner']").val() == '') {
                            $("select[name='owner']").css('border', '1px solid red');
                        } else {
                            $("select[name='owner']").css('border', '1px solid #dce1e7');
                        }
                    });

                    $('.file-prew').off('click').on('click', function () {
                        $('.report-file3>span').css('color', '#ffffff');

                    })


                    //显示图片缩略图
                    var result = document.getElementById("result");
                    var input = document.getElementById("logoUrl");

                    if (typeof FileReader === 'undefined') {
                        result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
                        input.setAttribute('disabled', 'disabled');
                    } else {
                        console.log(1);
                        input.addEventListener('change', self.readFile, false);
                    }

                }
            }).fail(function (err) {
                console.warn(err);
                // self.renderListView();

            });
            self.renderListView();
            self.addLine();//添加一行
            var address = '/admin/addService';
            self.upload(address);//上传文件
            // //显示图片缩略图
            //失去焦点南北向参数
            // self.blurAlert();

        },
        getAjax: function () {
            return $.ajax({
                url: window.TD.vHosts + '/admin/getAddService/',
                type: "GET",
                data: {
                    token: window.TD.token,//util.Cookie.get("tdppt"),
                    from: window.TD.vFrom
                }

            })
        },
        renderListView: function (CommonData) {//显示服务列表
            var html = window.template(serverAdd, CommonData);
            // console.log(html);
            $("#AdminAdd").html(html);
        },
        upload: function (address) {//获取要上传表单数据
            var self = this;
            $(document).ready(function () {

                self.getData();//获取表单数据
                $("body").on("submit", "#serverAddNum", function () {
                    return false;
                });

                // $('body').on("click", '.btn-blue', function () {
                //     console.log(222);
                //     if (flag) {
                //         $('.btn-sure').css("backgroundColor", "#5f93e1");
                //         $('.btn-blue').css("backgroundColor", "#f5f6f8").css('pointer-events', "auto");
                //     }
                //     // console.log($(this).siblings("button"));
                //     return false;
                // });
                $('.btn-cancel').off('click').on("click", function () {
                    flag = false;
                    // window.location.reload();
                    console.log(2);
                    window.location.href = '#/index';
                    return false;
                });

                $('#serve-manage-update').off('click').on('click', ".btn-sure", function () {//点击更新，更新数据

                    console.log(1111);
                    //判断状态然后发送请求
                    var formData = self.getData();
                    console.log(formData);

                    self.confirmData();
                    console.log(self.confirmData());

                    if(self.confirmData()){
                        // alert('参数填写不完整');
                        $('#appAlert').show();
                        $('#appAlertContent').html('参数填写不完整!')
                        var timer = setTimeout(function(){
                            $('#appAlert').hide();
                        },3000)
                    } else{
                        //上传文件
                        $.ajax({
                            url: window.TD.vHosts + address,
                            type: 'POST',
                            cache: false,
                            data: formData,
                            processData: false,
                            contentType: false
                        }).done(function (res) {
                            console.log(res);
                            if (res.status == 200) {
                                // alert("更新数据成功");
                                $('#appAlert').show();
                                $('#appAlertContent').html('更新数据成功!')
                                var timer = setTimeout(function(){
                                    $('#appAlert').hide();
                                },3000)
                                $('.btn-sure').css("backgroundColor", "#5f93e1");
                                // $('.btn-blue').css("backgroundColor", "#f5f6f8").css('pointer-events', "auto");
                                // window.location.reload();
                                window.location.href = '#/index';
                                return false;
                            }else{
                                // alert("更新数据失败："+res.msg);
                                $('#appAlert').show();
                                $('#appAlertContent').html("更新数据失败："+res.msg)
                                var timer = setTimeout(function(){
                                    $('#appAlert').hide();
                                },3000)
                                return false;
                            }
                        }).fail(function (res) {
                            console.log(res);
                            // alert("更新数据失败");
                            $('#appAlert').show();
                            $('#appAlertContent').html("更新数据失败!")
                            var timer = setTimeout(function(){
                                $('#appAlert').hide();
                            },3000)
                            return false;
                        });
                    }



                })

                $('body').off('click').on('click', '.btn-save', function () {//点击确认添加数据
                    //判断状态然后发送请求
                    var formData = self.getData();
                    console.log(formData);
                    self.confirmData();
                    console.log(self.confirmData());

                    if(self.confirmData()){
                        // alert('参数填写不完整');
                        $('#appAlert').show();
                        $('#appAlertContent').html('参数填写不完整');
                        var timer = setTimeout(function(){
                            $('#appAlert').hide();
                        },3000)
                    } else{
                        //上传文件
                        $.ajax({
                            url: window.TD.vHosts + "/admin/addService",
                            type: 'POST',
                            cache: false,
                            data: formData,
                            processData: false,
                            contentType: false
                        }).done(function (res) {
                            console.log(res);
                            if (res.status == 200) {
                                // alert("添加数据成功");
                                $('#appAlert').show();
                                $('#appAlertContent').html("添加数据成功");
                                var timer = setTimeout(function(){
                                    $('#appAlert').hide();
                                },3000)
                                $('.btn-sure').css("backgroundColor", "#5f93e1");
                                // $('.btn-blue').css("backgroundColor", "#f5f6f8").css('pointer-events', "auto");
                                window.location.href = '#/index';
                                return false;
                            } else {
                                console.log(res);
                                // alert("添加数据失败:"+res.msg);
                                $('#appAlert').show();
                                $('#appAlertContent').html("添加数据失败:"+res.msg);
                                var timer = setTimeout(function(){
                                    $('#appAlert').hide();
                                },3000)

                                return false;
                            }
                        }).fail(function (res) {
                            console.log(res);
                            // alert("添加数据失败");
                            $('#appAlert').show();
                            $('#appAlertContent').html("添加数据失败");
                            var timer = setTimeout(function(){
                                $('#appAlert').hide();
                            },3000)

                            return false;
                        });
                    }

                })


            })

        },
        addLine: function () {//添加一行参数（增加参数）
            console.log(22);
            $(".addCode").off('click').on("click", function () {
                console.log(33);
                var newRow = "<input type='text' name='northStatus' value='' class='intro-margin'> <input type='text' name='southStatus' value='' class='intro-margin'>";
                $('.addParaCode').append(newRow);
                return false;
            })

            $(".add").off("click").on("click", function () {
                console.log(39);
                var newRow = "<input type='text' name='northParam' value='' class='intro-margin'> <input type='text' name='southParam' value='' class='intro-margin'> <select name='position' value=''> <option value='' style='color:#EEF0F2' disabled selected>参数位置</option> <option value='0'>query</option> <option value='1'>path</option> </select>";
                $('.addParas').append(newRow);
                return false;
            })
        },
        readFile: function () {//判断上传图片格式及显示缩略图
            var file = this.files[0];
            if (!/image\/\w+/.test(file.type)) {

                // alert("文件必须为图片！");
                $('#appAlert').show();
                $('#appAlertContent').html("文件必须为图片！");
                var timer = setTimeout(function(){
                    $('#appAlert').hide();
                },3000)
                $('#logoUrl').val('');
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                result.innerHTML = '<img src="' + this.result + '" alt=""/>'
            }
        },
        blurAlert: function () {//南北向参数输入框失去焦点时提示
            $('body').off('blur').on("blur", "#introParam", function () {
                console.log(11);
                if ($("input[name='northParam']").val() != '' && $("input[name='southParam']").val() == '') {
                    // alert('请输入南向参数');
                    $('#appAlert').show();
                    $('#appAlertContent').html('请输入南向参数');
                    var timer = setTimeout(function(){
                        $('#appAlert').hide();
                    },3000)
                } else if ($("input[name='northParam']").val() != '' && $("input[name='southParam']").val() != '') {
                    $('.add').css("backgroundColor", "#43A3FB").css('pointer-events', "auto");
                }
                return false;
            })

            $('body').off('blur').on("blur", "#introStatus", function () {
                console.log(13);
                if ($("input[name='northStatus']").val() != '' && $("input[name='southStatus']").val() == '') {
                    // alert('请输入南向参数');
                    $('#appAlert').show();
                    $('#appAlertContent').html('请输入南向参数');
                    var timer = setTimeout(function(){
                        $('#appAlert').hide();
                    },3000)
                } else if ($("input[name='northStatus']").val() != '' && $("input[name='southStatus']").val() != '') {
                    $('.addCode').css("backgroundColor", "#43A3FB").css('pointer-events', "auto");
                }
                return false;
            })
        },
        blurPrompt:function (id) {//表单未填写时提示
            id.on('blur',function(){
                console.log(10);
                if($(id).val() == ''){
                    $(id).css('border','1px solid red');
                }else{
                    $(id).css('border','1px solid #dce1e7');
                }
            });
        },
        getData:function () {//获取需要上传的表单数据
            var self = this;
            {
                console.log($(".addParas").children().length);
                // console.log($("select[name='owner'] option:selected").text());

                var paramMap = [],
                    statusMap = [];

                var obj = {
                        "northParam": " ",
                        "southPar am": " ",
                        "position": " "
                    },
                    obj2 = {
                        "northStatus": " ",
                        "southStatus": " "
                    };
                var value2 = [],
                    value3 = [];//用于存放填入的值
                var input = $('.addParas').children()[0];
                // console.log($("input[name='northParam']").attr("name")) ;
                //遍历获取子元素值
                for (var i = 0; i < $(".addParas").children().length; i++) {

                    var input = $('.addParas').children()[i];
                    // var key = $(input).attr("name");
                    value2.push($(input).val());

                }

                console.log(value2);

                // if (value2[0] == '' || value2[1] == '') {
                //     delete(data.data.paramMap);
                //
                //     console.log(1111);
                // } else {
                for (var i = 0; i < value2.length; i++) {

                    if (i % 3 == 0) {
                        console.log(" i " + i + "value : " + value2[i]);
                        // obj.northParam = value2[i];
                        // obj.southParam = value2[i + 1];
                        // obj.position = value2[i + 2];
                        paramMap.push({
                            northParam: value2[i],
                            southParam: value2[i + 1],
                            position: value2[i + 2]
                        });
                        i += 2;
                    }
                    console.log(obj);

                    // }
                }


                for (var i = 0; i < $(".addParaCode").children().length; i++) {
                    var input = $('.addParaCode').children()[i];
                    // var key = $(input).attr("name");
                    // console.log(key);
                    // var value = $(input).val();
                    value3.push($(input).val());
                }
                console.log(value3);
                // if (value3[0] == '' || value3[1] == '') {
                //     delete(data.data.statusMap);
                //     console.log(222);
                // } else {
                for (var i = 0; i < value3.length; i++) {
                    if (i % 2 == 0) {
                        // console.log(" i " + i + "value : " + value3[i]);
                        statusMap.push({
                            northStatus: value3[i],
                            southStatus: value3[i + 1]
                        });
                        i += 1;
                    }
                    console.log(obj2);
                    console.log(statusMap);
                    // }
                }

                self.deleteUploadFile();
                console.log(fileDeleteType);

                var data = {
                    "token": window.TD.token,
                    "from": window.TD.vFrom,
                    "fileDeleteType":1,
                    data: {
                        "name": $("input[name='name']").val(),
                        // "logoUrl": $("input[name='logoUrl']").val(),
                        "owner": $("select[name='owner'] option:selected").val(),
                        "pricing": $("input[name='pricing']").val(),
                        "businessNo": $("input[name='businessNo']").val(),
                        "types": $("select[name='types'] option:selected").val(),
                        "summary": $("textarea[name='summary']").val(),
                        "description": $("textarea[name='description']").val(),
                        "example": $("textarea[name='example']").val(),
                        "northUrl": $("input[name='northUrl']").val(),
                        "southUrl": $("input[name='southUrl']").val(),
                        "statusPosition": $("select[name='statusPosition'] option:selected").val(),
                        "recommend": $("input[name='recommend']").val(),
                        "method": $("select[name='method'] option:selected").val(),
                        "comment": $("textarea[name='comment']").val(),
                        "paramMap": paramMap,
                        "statusMap": statusMap
                    }
                };

                // if(fileDeleteType == 1){
                //     data.fileDeleteType = 1;
                // }else if(fileDeleteType == 2){
                //     data.fileDeleteType = 2;
                // }else if(fileDeleteType == 3){
                //     data.fileDeleteType = 3;
                // }else{
                //     delete(data.fileDeleteType);
                // }

                console.log(data);

                if(data.data.paramMap[0].northParam == ''&&data.data.paramMap[0].southParam == ''){
                    delete(data.data.paramMap);
                }
                if(data.data.statusMap[0].northStatus == ''&&data.data.statusMap[0].southStatus == ''){
                    delete(data.data.statusMap);
                }
                // console.log(paramMap);
                //上传文件
                var formData = new FormData(document.forms.namedItem("fileinfo"));
                formData.append('request', $("#select-file-request")[0].files[0]);
                formData.append('response', $("#select-file-response")[0].files[0]);
                formData.append('status', $("#select-file-status")[0].files[0]);
                formData.append('logoUrl', $("#logoUrl")[0].files[0]);
                formData.append('data', JSON.stringify(data.data));

                if(fileDeleteType == 1){
                    formData.append('fileDeleteType', 1);
                }else if(fileDeleteType == 2){
                    formData.append('fileDeleteType', 2);
                }else if(fileDeleteType == 3){
                    formData.append('fileDeleteType', 3);
                }

                // formData.append('data', data.data);
                // console.log(JSON.stringify(data.data));
                // formData.append('data', data);
                // console.log(formData);

                // var data2 = JSON.stringify($('#serverAddNum').serializeArray());
                formData.append('token', window.TD.token);
                formData.append('from', window.TD.vFrom);
                // console.log($("#select-file-response")[0].files[0]);
                console.log($("#select-file-request")[0].files[0]);

                console.log(formData);
                return formData;
            }
        },
        confirmData:function(){//校验表单数据是否填写完整
            var flag2 = false;
            if($("input[name='name']").val()==''){
                flag2 = true;
                $("input[name='name']").css('border','1px solid red');
            }

            if($("input[name='businessNo']").val()==''){
                flag2 = true;
                $("input[name='businessNo']").css('border','1px solid red');
            }

            if($("select[name='types'] option:selected").val()==''){
                console.log(3);
                flag2 = true;
                $("select[name='types']").css('border','1px solid red');
            }

            if($("select[name='owner'] option:selected").val()==''){
                console.log(3);
                flag2 = true;
                $("select[name='owner']").css('border','1px solid red');
            }


            if($("input[name='pricing']").val()==''){
                flag2 = true;
                $("input[name='pricing']").css('border','1px solid red');
            }

            if($("textarea[name='summary']").val()==''){//简介描述
                flag2 = true;
                $("textarea[name='summary']").css('border','1px solid red');
            }

            if($("textarea[name='description']").val()==''){//详情描述
                flag2 = true;
                $("textarea[name='description']").css('border','1px solid red');
            }

            if($("input[name='businessNo']") ==''){
                flag2 = true;
                $("input[name='businessNo']").css('border','1px solid red');
            }
            if($("input[name='northUrl']").val() == ''){
                flag2 = true;
                $("input[name='northUrl']").css('border','1px solid red');
            }
            if($("input[name='southUrl']").val() == ''){
                flag2 = true;
                $("input[name='southUrl']").css('border','1px solid red');
            }
            if($("select[name='method'] option:selected").val() == ''){
                flag2 = true;
                $("select[name='method']").css('border','1px solid red');
            }
            if ($("textarea[name='comment3']").val() == '' && $("#textName2").val() == '') {
                flag2 = true;
                $('.report-file3>span').css('color', 'red');
            }

            return flag2;
        },
        deleteUploadFile:function(){//清空已经上传的文件内容（请求参数、状态码）
            var self = this;

            $('.deleteBeforeFile').on("click",function(){
                console.log(22);
                $(this).siblings('textarea').val('');

                console.log($("textarea[name='comment2']").val());
                console.log($('#select-file-request').val());

                if($("textarea[name='comment2']").val()==''&&$('#select-file-request').val() == ''&&($("textarea[name='comment4']").val()!==''||$('#select-file-status').val() !== '')){
                    fileDeleteType = 1;
                }
                else if($("textarea[name='comment4']").val()==''&&$('#select-file-status').val() == ''&&($("textarea[name='comment2']").val() !==''||$('#select-file-request').val() !== '')){
                    fileDeleteType = 2;
                }
                else if($("textarea[name='comment2']").val()==''&&$('#select-file-request').val() == ''&&$("textarea[name='comment4']").val()==''&&$('#select-file-status').val() == ''){
                    fileDeleteType = 3;
                }

            })

        }

    }

    module.exports = Util;

})