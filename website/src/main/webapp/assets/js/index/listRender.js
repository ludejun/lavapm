define(function (require, exports, module) {
    //请求渲染模板
    var TypesIndex = require('../tpl/TypesIndex');
    var OwnerIndex = require('../tpl/OwnerIndex');
    var ListIndex = require('../tpl/ListIndex');
    var $AppLoading = $(".app-loading");
    //获取ajax取得数据
    var getData = require('./pageAjax');
    //过滤数据
    var FilterData = require('./FilterData');
    var GetNewProduct = require('./getNew');
    var $loading = $("#app-loading");
    var storeList = {};
    //下拉加载fn|data
    var pushDropdown = {};
        var IsSearched = false;
    var ListRender = {
        clear: function () {
            storeList = {
                types: [],
                owners: [],
                baseLists: [],
                lists: [],
                pagedata : []
            };
        },
        //获取下拉菜单类型html
        renderTypes: function () {
            var html = window.template(TypesIndex, storeList);
            return html;
        },
        renderOwner: function () {
            var html = window.template(OwnerIndex, storeList);
            return html;
        },
        //获取列表html
        renderLists: function () {
            //根据设备分辨率过滤storeList
            storeList.table.data = pushDropdown.init(storeList.table.data);
            //end
            var html = window.template(ListIndex, storeList);
            return html;
        },
        //渲染两个菜单
        renderDOM: function () {
            this.$OwnerElem.html(this.renderOwner());
            this.$ListElem.html(this.renderLists());
            this.$TypesElem.html(this.renderTypes());
        },
        //渲染列表
        renderListDom: function () {
            var html = this.renderLists();
            this.$ListElem.html(html);
        },
        //鼠标经过事件
        mouseEvent: function () {
            $(".header-list").on("mouseenter", ".header-list-li", function () {
                var $me = $(this),
                    child = $me.find(".header-down");
                if (child.length > 0) {
                    child.show();
                }
            }).on("mouseleave", ".header-list-li", function () {
                var $me = $(this),
                    child = $me.find(".header-down");
                if (child.length > 0) {
                    child.hide();
                }
            })
        },
        //搜索事件
        searchEvent: function () {
            var $search = $("#header-search-box");
            var $searchInput = $(".header-search");
            var self = this;
            var type = "";
            $search.on("submit", function (e) {
                IsSearched = true;
                e.preventDefault(); 
                var val = $searchInput.val();
                self.SelectProdution(val,type,storeList.pagedata);
            })
        },
        searchButton : function(){
            var self = this;
            var $button = $(".search-button");
            $("#PageIndex").on("click",".search-button",function(){
                self.searchEvent();
            })
        },
        typesEvent: function () {
            var $headerList = $(".header-list");
            var self = this;
            //类别供应商列表
            $headerList.on("click", ".header-down-li", function () {
                IsSearched = false;
                var $me = $(this);
                var val = "";
                id = $me.attr("data-id");
                if (id == "all") {
                    storeList.table.data = storeList.baseLists.concat([]);
                    self.renderListDom();
                } else {
                    self.SelectProdution(val,id,storeList.baseLists);
                }
                $me.parent().hide();
                //选中下拉class
                $me.parents(".header-list-li")
                    .addClass("header-list-selected")
                    .siblings().removeClass("header-list-selected");
                return false;
            })
            $headerList.on("click", ".header-list-li", function () {
                IsSearched = false;
                var $me = $(this);
                var val = "";
                id = $me.attr("data-id");
                $me.addClass("header-list-selected").siblings().removeClass("header-list-selected");
                if(id == "new"){
                    $loading.show();
                    GetNewProduct().promise().done(function(data){
                        if(data.status == 200){
                            $loading.hide();
                            self.ByOrder(data.data);
                            self.SelectProdution(val,id,data.data.table.data);
                        }else{
                            $loading.hide();
                            self.SelectProdution(val,id,{});
                        }
                    });
                }else{
                    self.SelectProdution(val,id,storeList.baseLists);
                }
            })
        },
        //下拉加载
        pushDropdown: function () {
            //初始化一屏显示多少数据
            var container = this.$ListElem;
            var box = 218, row = 3, screenHeight = window.innerHeight, ptop = container.offset().top + parseInt(container.css('paddingTop'));
            var containerHeight = screenHeight - ptop;
            var viewRow = Math.ceil(containerHeight / box);
            //fn
            return {
                options: {
                    container: container,
                    row: viewRow,//默认一屏行数
                    count: 9,//下拉加载条数
                    source: [],//数据源
                    data: []//当前加载数据
                },
                init: function (data) {
                    var self = this;
                    document.body.scrollTop = 0;
                    self.options.source = data;
                    self.options.data = data.slice(0, self.options.row * 3);
                    return self.options.data;
                },
                render: function (data) {
                    var self = this, options = self.options;
                    var datas = options.data.concat(data);
                    options.data = datas;
                    storeList.table.data = data;
                    var html = window.template(ListIndex, storeList);
                    options.container.append(html);
                    $('#loading').remove();
                    self.scroll();
                },
                scroll: function () {
                    var self = this, options = self.options, timer, flag = true;
                    var handler = function () {
                        //console.log('dropdown loading:'+flag);
                        //console.log(options.data, options.source)
                        if (flag) {
                            timer = setTimeout(function () {
                                if (options.data.length >= options.source.length) {
                                    flag = true;
                                    return;
                                }
                                var screenHeight = window.innerHeight;
                                var scrollTop = document.body.scrollTop, scrollHeight = document.body.scrollHeight;
                                //console.log(scrollHeight - scrollTop - screenHeight)
                                if ((scrollHeight - scrollTop - screenHeight) === 0) {
                                    clearTimeout(timer);
                                    $(".con-box").off('scroll', handler);
                                    //console.log('distance to bottom=0');
                                    var loader = window.template(loading);
                                    options.container.append(loader);
                                    setTimeout(function () {
                                        var start = options.data.length;
                                        var data = options.source.slice(start, options.count + start);
                                        self.render(data);
                                    }, 1000)
                                }
                                flag = true;
                            }, 800)
                            //800毫秒只执行一次handler,防止重复执行
                            flag = false;
                        }
                    };
                    $(".con-box").on('scroll', handler);
                }
            }
        },
        init: function (options) {
            $AppLoading.show();
            this.$OwnerElem = $("#HeaderOwners");
            this.$TypesElem = $("#HeaderTypes");
            this.$ListElem = $("#appsList");
            //初始化原始数据
            //this.clear();
            this.typesEvent();
            this.searchEvent();
            this.searchButton();
            this.mouseEvent();
            //如果不是对象直接返回
            if ($.type(options) !== "object") {
                console.warn('options is not object');
                return;
            }
            //初始化请求所有数据
            var self = this;
            var postRequest = getData(options).promise();
            postRequest.done(function (data) {
                $AppLoading.hide();
                if (data.status === 200) {
                    $.extend(storeList, data.data);
                    self.ByOrder(data.data);
                    storeList.baseLists = data.data.table.data;
                    storeList.pagedata = data.data.table.data;
                    //-下拉加载初始化 fn
                    pushDropdown = self.pushDropdown();
                    //初始化下拉加载事件
                    $(window).off('scroll', '**');
                    pushDropdown.scroll();
                    self.renderDOM();
                    //-end
                }      
            }).fail(function (err) {
                console.warn('request is wrong,please check it', JSON.stringify(err));
            })
        },
        ByOrder : function(object){
            var arryBuy = [],arryRecommend = [],arryNew = [],arrNoBuy = [];
            for(var i = 0;i < object.table.data.length; i++){
                if(object.table.data[i].buy == 1){
                    arryBuy.push(object.table.data[i]);    
                }
                if(object.table.data[i].buy == 0 && object.table.data[i].recommend){
                    arryRecommend.push(object.table.data[i]);    
                }
                if(object.table.data[i].buy == 0 && object.table.data[i].isnew){
                    arryNew.push(object.table.data[i]);    
                }
                if(object.table.data[i].buy == 0 && !object.table.data[i].isnew && !object.table.data[i].recommend){
                    arrNoBuy.push(object.table.data[i]);    
                }
            }  
            var array = $.merge( $.merge(arryBuy,arryRecommend),$.merge(arryNew,arrNoBuy) );
            object.table.data = array;
        },
         SelectProdution : function(val,type,typedata){
            var self = this;
            var data = FilterData({
                keywords : val,
                type : type,
                data : typedata
            });
            storeList.table.data = data;
            self.renderListDom();         
            if(!IsSearched){
                storeList.pagedata = data;
            }
        }      
    };
    module.exports = ListRender;
})