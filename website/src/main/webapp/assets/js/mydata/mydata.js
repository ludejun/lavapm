define(function( require,exports,module ){
    require("../lib/FileSaver");
    var MyDataTpl = require( '../tpl/PageMyDataTpl' );
    var headerTpl = require( '../tpl/HeaderMydataTpl' );
    var tableTpl = require('../tpl/ListMydataTpl');
    var date = "";
    var $App = $("#app");
    var $AppLoading = $(".app-loading");
    var iNum = 10;
    var AjaxData = {};
    var Util = {
        init : function(){
            date = "";
            var html = window.template( MyDataTpl,{} );
            $App.html( html );
            this.$MydataHeaderDown = $("#MydataHeaderDown");
            this.$APic = $(".arrow-pic");
            this.$MyTableDown = $(".mydata-table-down");
            this.$MyTableList = $(".mydata-table-list");
            this.$DataDate = $("#DataDate");
            //取数据
            this.getAjaxDone();
            this.renderDown();
            this.downloadData();
            $AppLoading.show();
        },
        getAjaxDone : function(){
           var self = this;
            var CommonData ="";
            this.getAjax({}).promise().done(function(data){
                AjaxData = data;
                if( data.status === 200 ){
                    $AppLoading.hide();
                    CommonData = data.data;
                    self.renderHeader(CommonData);
                    self.renderListView(CommonData);
                    var pageInit = null;
                    if(!pageInit){
                        pageInit = new window.TD.ui.CreateTablePage("#MydataTablePage",{
                            num : iNum,//一页显示多少条数据
                            all : CommonData.table.data.length,//全部数据
                            current : 'current',
                            pageNumbers : false,//是否显示分页数量
                            prevNextBtn : true,//是否显示上一页下一页
                            splitNum : 3,//默认显示多少条
                            trigger : "eachchange"//回调事件调用方法 
                        })
                        $("#MydataTablePage").off("eachchange").on("eachchange",function(event,pages){
                            var pages = pages.page;
                            CommonData.table.renderData = CommonData.table.data.slice( (pages - 1) * 10,pages*10 );
                            $("#MydataTableList").html( self.getHTML( CommonData.table.renderData ) );
                        })
                    }
                }
            }).fail(function(err){
                console.warn( err );
                self.renderHeader(CommonData);
                self.renderListView(CommonData);
            }) 
        },
        splitNumber : function( str ){         //科学技术法
            str=str.toString();
            var reg = /\B(?=((\d|\.){3})+$)/g
            return str.replace(reg,',');
        },
        toCent : function( num ){
             num = num.toFixed(4).slice(3,4)+"."+num.toFixed(4).slice(4,7)+"%";
             return num;
        },
        getHTML : function( list ){
            var html = '';
            var circle= '';
            var self = this;
            var mydate = new Date();
            for( var i = 0; i < list.length;i++ ){
                var value = list[i];
                if(value.status==1){
                    circle = '<i class="circle circle-green"></i> 正常';
                }
                if(value.status==20){
                    circle = '<i class="circle circle-orange"></i> 调试';
                }
                if(value.status==30){
                    circle = '<i class="circle circle-gray"></i> 下线';
                }
                var createdate = new Date(value.createtime*1000);
                var time = window.TD.util.timeStamp(value.createtime);
                var valueRate = 0;
                if(value.accessRequest == 0){
                    valueRate = '--';
                }else{
                    valueRate = value.validRequest/value.accessRequest;
                }
                html += '<ul>'
                    +'<li>'+circle+'</li>'
                    +'<li titlt="'+ value.name +'">'+ value.name +'</li>'
                    +'<li>'+self.getDataTime(mydate,createdate)+'<span class="mydata-point">开通时间:' + time + '</span></li>'
                    +'<li>'+window.TD.util.timeStamp(value.timeallow)+'</li>'
                    +'<li>'+ value.requests_rest +"/"+  value.requests +'</li>'
                    +'<li>'+ value.validRequest +"/"+ value.accessRequest +'</li>'
                    +'<li>'+ window.TD.util.toCent(valueRate) +'</li>'
                    +'<li>'+ value.inputCount +"/"+ value.oututCount +'</li>'
                    +'<li><a href="#/detail/'+value.serviceid+'">查看</a></li></ul>';
            }
            return html;
        },
        getAjax : function( options ){
            return $.ajax({
                url : window.TD.vHosts + '/datamarket/myData',
                type : "get",
                data : {
                    token : window.TD.util.Cookie.get("tdppt"),
                    // token : window.TD.token,
                    keyWord : '',
                    type : '',
                    historyType : date,
                    from : window.TD.vFrom
                }

            })
        },
        renderHeader : function(CommonData){
            var html = window.template( headerTpl, CommonData);
            $("#MydataHeader").html( html );
        }
        ,
        renderListView : function(CommonData){
            CommonData.table.renderData = CommonData.table.data.slice( 0,iNum );
            var html = window.template(tableTpl, CommonData);
            $("#MydataTableList").html( html );
        },
        renderDown :function(){
            var self = this;
            this.$APic.mouseenter(function(){
                self.$MyTableDown.show()
            });
            this.$APic.mouseleave(function(){
                self.$MyTableDown.hide()
            });
            this.$MyTableDown.on("click",".mydata-table-list",function(){
                self.$MyTableDown.hide();
                $AppLoading.show();
                self.$DataDate.html(this.innerHTML);
                date = this.id;
                self.getAjaxDone();
            });
        },
        timeStamp : function( time ){
             return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        },
        getDataTime : function(time,createtime){
            var day = 0;
            var diff = "";
            var days = (time.getTime()-createtime.getTime())/(24*3600*1000);
            if (days<1){
                day = Math.floor(days*24);
                diff = (day+"")+"小时前";
                return diff;
            }
            if(1<Math.floor(days)<6){
                days = Math.floor(days);
                day = Math.ceil(days);
                diff = (day+"")+"天前";
                return diff;
            }
            if(6<Math.floor(days)<30){
                days = Math.floor(days);
                day = Math.floor(days/7);
                diff = (day+"")+"周前";
                return diff;
            }
            if(30<Math.floor(days)<365){
                days = Math.floor(days);
                day = Math.floor(days/30);
                diff = (day+"")+"月前";
                return diff;
            }
            if(365<Math.floor(days)){
                days = Math.floor(days);
                day = Math.floor(days/365);
                diff = (day+"")+"年前"; 
                return diff;
            }
        },
        downloadData : function(){
            $(".mydata-table").on("click","#mydataDownload",function(){
                var content = JSON.stringify(AjaxData);
                var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "file.txt");//SaveAs(blob,filename)
            })
        }
   
    };
    module.exports = Util;

})
