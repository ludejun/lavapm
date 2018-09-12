define(function (require, exports, module) {

    var defaults = {
        num: 10,//一页显示多少条数据
        all: 100,//全部数据
        current: 'current',
        pageArrChoose: [20, 30, 40],//数组
        pageNumbers: true,//是否显示分页数量
        prevNextBtn: true,//是否显示上一页下一页
        createSpot: '<span>...</span>',//创建..的html
        trigger: "pagechange",//分页异步调用事件
        splitNum: 2,//默认显示多少条
        _PageStatus: 1//储存分页对象私有方法
    };
    var Util = {
        addCurrentClass: function (i, o) {
            var current = '';
            if (i == o._PageStatus) {
                current = o.current;
            }
            return current;
        },
        //返回显示数量选择
        renderSelect: function (o) {
            var html = '';
            var arr = o.pageArrChoose;
            var index = $.inArray(parseInt(o.num), arr);
            if (index >= 0) {
                arr.splice(index, 1);
            }
            arr = arr.sort(function (a, b) {
                return a - b;
            })
            arr.unshift(o.num);
            html += '<select>';
            html += '<option value="' + o.num + '">' + o.num + '</option>';
            for (var i = 0; i < arr.length; i++) {
                var d = arr[i];
                html += '<option value="' + d + '">' + d + '</option>';
            }
            html += '</select>';
            return html;
        },
        //渲染上一页下一页
        renderPagePrevNext: function (type) {
            var html = '';
            html = type === "next" ? '<a page-id="next">下一页 &gt;</a>' : '<a page-id="prev">&lt; 上一页</a>';
            return html;
        },
        initPageList: function (o) {
            //计算分页一共有多少页
            var max = Math.ceil(o.all / o.num);
            var pagesNow = o._PageStatus;
            var html = '';
            //出现省略号开始目标点
            var iStart = pagesNow - o.splitNum;
            //出现省略号结束目标点
            var iEnd = Number(pagesNow) + Number(o.splitNum);
            //上一页
            if (o.prevNextBtn) {
                html += this.renderPagePrevNext('prev');
            }
            html += '<a page-id="1" class="' + this.addCurrentClass(1, o) + '">1</a>';
            //开始省略号，当前分页大于分割数+基础数字2 且 最大值 必须大于切割数
            if (pagesNow > o.splitNum + 2 && max > o.splitNum * 2 + 3) {
                html += o.createSpot;
            }
            //开始显示省略号
            if (iStart < o.splitNum) {
                iStart = 2;
                iEnd = o.splitNum * 2 + iStart;
            }
            //分页到最后呈现的条件
            if (pagesNow >= max - o.splitNum) {
                iStart = max - o.splitNum * 2 - 1;
                //兼容小数处理
                iStart = iStart >= 2 ? iStart : 2;
                iEnd = max - 1;
            }
            //不能超过最大界限
            if (max < iEnd) {
                iEnd = max - 1;
            }
            //循环分页数据
            for (var i = iStart; i <= iEnd; i++) {
                html += '<a page-id="' + i + '" class="' + this.addCurrentClass(i, o) + '">' + i + '</a>';
            }
            //结束省略号
            if (pagesNow < max - o.splitNum - 1 && iEnd < max - 1) {
                html += o.createSpot;
            }
            //最后一页,防止异常数据处理
            //console.log( iStart,iEnd )
            if (iStart - 1 <= iEnd) {
                html += '<a page-id="' + max + '" class="' + this.addCurrentClass(max, o) + '">' + max + '</a>';
            }
            //上一页
            if (o.prevNextBtn) {
                html += this.renderPagePrevNext('next');
            }
            //显示分页数量选择
            if (o.pageNumbers) {
                html += this.renderSelect(o);
            }
            o.target.html(html);
        },
        //事件派发，每次点击page产生调回
        goPageTrigger: function (o) {
            o.target.trigger(o.trigger, [{page: o._PageStatus}]);
        },
        goPagesChange: function (o) {
            var self = this;
            o.target.off('change').on("change", "select", function () {
                var me = $(this),
                    val = me.val();
                //初始化分页最大数
                o.num = parseInt(val);
                //初始化分页首页
                o._PageStatus = 1;
                self.initPageList(o);
                self.goPageTrigger(o);
            })
        },
        init: function (o) {
            var self = this;
            //总条数大于1就显示
            if (o.all <= o.num) {
                o.target.html('');
                return;
            }
            //初始化遍历显示分页
            this.initPageList(o);
            //显示分页数量
            if (o.pageNumbers) {
                this.goPagesChange(o);
            }
            //点击分页筛选条件
            o.target.off('click').on("click", "a", function () {
                var me = $(this),
                    max = Math.ceil(o.all / o.num),
                    index = me.attr("page-id");
                //如果点击已经生效的分页不产生任何行为
                if (me.hasClass("current")) {
                    return;
                }
                //如果是上一页下一页
                if (!isFinite(index)) {
                    if (index === "next") {
                        o._PageStatus++;
                    } else {
                        o._PageStatus--;
                    }
                } else {
                    o._PageStatus = parseInt(index);
                }
                //如果点击最大数的时候停止
                if (o._PageStatus > max) {
                    o._PageStatus = max;
                    return;
                }
                //如果点击到最小值的时候停止
                if (o._PageStatus < 1) {
                    o._PageStatus = 1;
                    return;
                }
                //执行异步回调
                self.goPageTrigger(o);
                self.initPageList(o);
            })
        }
    };
    var CreateTablePage = function (target, options) {
        var $target = $(target);
        this._o_ = $.extend({}, defaults, options);
        $.extend(this._o_, {target: $target});
        Util.init(this._o_);
    };
    CreateTablePage.prototype = {
        on: function (type, fn) {
            if (this._o_) {
                var self = this;
                this._o_.target.on(type, function (e, pages) {
                    fn.call(this, pages);
                    e.stopPropagation();
                })
            }
        },
        off: function (type) {
            if (this._o_) {
                this._o_.target.off(type);
            }
        },
        update: function (options) {
            if ($.type(options) === "object") {
                $.extend(this._o_, options);
                Util.init(this._o_);
            }
        },
        destroy: function () {
            var o = this._o_;
            if (o) {
                this._o_.target.off(o.trigger);
                this._o_ = o = null;
                delete this._o_;
            }
        }
    };

    window.TD = window.TD || {};
    window.TD.ui = window.TD.ui || {};
    window.TD.ui.CreateTablePage = CreateTablePage;

})
