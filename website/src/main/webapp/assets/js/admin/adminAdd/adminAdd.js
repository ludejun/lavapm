define(function( require,exports,module ){
    var serverAdd2 = require("../adminIndex/serverAdd");
    var serverAdd3 = require('../../tpl/serverAdd');
    // var serverWrite = require('../adminIndex/serverAdd');
    var Util = {
        init : function( id ){
            var self = this;
            if( id === "new" ){
                console.log('this is create');
                // $('#AdminAdd').append(serverAdd2);
                // console.log(1);
                serverAdd2.init();

            }else{
                console.log( 'this is edit' );
                console.log(id);
                $.ajax({
                    type:'GET',
                    url: window.TD.vHosts + '/admin/getService/'+id+'/',
                    data:{
                        token: window.TD.token,//util.Cookie.get("tdppt"),
                        from: window.TD.vFrom,
                        serviceId:id
                    }
                }).done(function(data){
                    console.log(data);
                    // console.log(data.data.request);

                    //删除文件后返回数据可能为空格情况
                    var data2 = {
                        dataResponse:JSON.parse(data.data.response),
                        // dataStatusDesc:JSON.parse(data.data.statusDesc),
                        data:data.data
                    }

                    if(data.data.hasOwnProperty('request')){
                        data.data.request =  data.data.request.trim() || "";
                    }else{
                        data.data.request = '';
                    }

                    if(data.data.request){
                        console.log(2222);
                        data2.dataRequest =JSON.parse(data.data.request);
                    }else{
                        data2.dataRequest= '';
                    }


                    if(data.data.hasOwnProperty('statusDesc')){
                        data.data.statusDesc =  data.data.statusDesc.trim() || "";
                    }else{
                        data.data.statusDesc = '';
                    }

                    if(data.data.statusDesc){
                        data2.dataStatusDesc =JSON.parse(data.data.statusDesc);
                    }else{
                        data2.dataStatusDesc= '';
                    }

                    //
                    // var data2 = {
                    //     dataRequest:JSON.parse(data.data.request.trim()||"{}"),
                    //     dataResponse:JSON.parse(data.data.response),
                    //     dataStatusDesc:JSON.parse(data.data.statusDesc.trim()||"{}"),
                    //     data:data.data
                    // }



                    var html = window.template(serverAdd3,data2);
                    $("#AdminAdd").html(html);

                    // $('.serverStatusDesc').val(JSON.parse(data.statusDesc));
                    // console.log(data.data.statusDesc);
                    // var val2 = self.syntaxJson(data.data.statusDesc);
                    // console.log(val2);
                    // $('.serverStatusDesc').html(val2);
                    // $('.serverStatusDesc').val(val2);


                    serverAdd2.addLine();//添加一行
                    var address = "/admin/modifyService/"+ id+"/";
                    serverAdd2.upload(address);//上传文件

                    //判断南北向参数是否有值
                    if ($("input[name='northParam']").val() != '' && $("input[name='southParam']").val() != '') {
                        $('.add').css("backgroundColor", "#5f93e1").css('pointer-events', "auto");
                    }

                    if ($("input[name='northStatus']").val() != '' && $("input[name='southStatus']").val() != '') {
                        $('.addCode').css("backgroundColor", "#5f93e1").css('pointer-events', "auto");
                    }
                    //失去焦点填写南北向参数
                    serverAdd2.blurAlert();

                    //失去焦点提示某些参数未填写
                    serverAdd2.blurPrompt($("input[name='name']"));
                    serverAdd2.blurPrompt($("input[name='pricing']"));
                    serverAdd2.blurPrompt($("input[name='northUrl']"));
                    serverAdd2.blurPrompt($("input[name='southUrl']"));
                    serverAdd2.blurPrompt($("input[name='businessNo']"));



                    var result = document.getElementById("result");
                    var input = document.getElementById("logoUrl");

                    if(typeof FileReader==='undefined'){
                        result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
                        input.setAttribute('disabled','disabled');
                    }else{
                        input.addEventListener('change',serverAdd2.readFile,false);
                    }

                }).fail(function(res){
                    console.log(res);
                });


            }
        }
    };
    module.exports = Util;
})